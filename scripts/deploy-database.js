// Script to initialize the SQL Database (local or Azure)
const sql = require('mssql');
const fs = require('fs');
const path = require('path');

// Load .env.local if present (without adding a dependency on dotenv)
(() => {
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
      const text = fs.readFileSync(envPath, 'utf8');
      for (const rawLine of text.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;
        const idx = line.indexOf('=');
        if (idx === -1) continue;
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim();
        if (!process.env[key]) {
          // remove potential surrounding quotes
          process.env[key] = val.replace(/^['\"]|['\"]$/g, '');
        }
      }
    }
  } catch {
    // ignore .env load errors
  }
})();

function getConfig(dbName) {
  const server = process.env.AZURE_SQL_SERVER;
  const isLocal = server === 'localhost' || server === '127.0.0.1' || server === '::1';
  return {
    server,
    database: dbName || process.env.AZURE_SQL_DATABASE,
    user: process.env.AZURE_SQL_USERNAME,
    password: process.env.AZURE_SQL_PASSWORD,
    port: process.env.AZURE_SQL_PORT ? Number(process.env.AZURE_SQL_PORT) : 1433,
    options: {
      encrypt: true,
      enableArithAbort: true,
      // Local dev needs trustServerCertificate
      trustServerCertificate: isLocal,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    requestTimeout: 30000,
  };
}

function splitBatches(sqlText) {
  // Split on lines that contain only GO (case-insensitive)
  const lines = sqlText.split(/\r?\n/);
  const batches = [];
  let current = [];
  for (const line of lines) {
    if (/^\s*GO\s*$/i.test(line)) {
      if (current.length) batches.push(current.join('\n'));
      current = [];
    } else {
      current.push(line);
    }
  }
  if (current.length) batches.push(current.join('\n'));
  return batches.filter(b => b.trim().length);
}

async function initializeDatabase() {
  try {
    const targetDb = process.env.AZURE_SQL_DATABASE;
    console.log('Connecting to SQL Server (master) ...');
    await sql.connect(getConfig('master'));

    // Execute init script in master (creates DB and switches context inside)
    const initPath = path.join(__dirname, '../database/01-init-database.sql');
    const initScript = fs.readFileSync(initPath, 'utf8');
    console.log('Executing database initialization script (with GO batching)...');
    for (const batch of splitBatches(initScript)) {
      await sql.query(batch);
    }

    // Reconnect to target DB for data population
    await sql.close();
    console.log(`Reconnecting to target DB: ${targetDb} ...`);
    await sql.connect(getConfig(targetDb));

    const populatePath = path.join(__dirname, '../database/02-populate-meetings.sql');
    const populateScript = fs.readFileSync(populatePath, 'utf8');
    console.log('Executing database population script (with GO batching if any)...');
    for (const batch of splitBatches(populateScript)) {
      await sql.query(batch);
    }
    
    console.log('Database initialization completed successfully!');
  } catch (err) {
    console.error('Database initialization failed:', err);
    process.exit(1);
  } finally {
    await sql.close();
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };