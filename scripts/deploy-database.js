// Script to initialize the Azure SQL Database after deployment
const sql = require('mssql');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  const config = {
    server: process.env.AZURE_SQL_SERVER,
    database: process.env.AZURE_SQL_DATABASE,
    user: process.env.AZURE_SQL_USERNAME,
    password: process.env.AZURE_SQL_PASSWORD,
    options: {
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: false,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    requestTimeout: 30000,
  };

  try {
    console.log('Connecting to Azure SQL Database...');
    await sql.connect(config);
    
    // Read and execute the initialization script
    const initScript = fs.readFileSync(path.join(__dirname, '../database/01-init-database.sql'), 'utf8');
    console.log('Executing database initialization script...');
    await sql.query(initScript);
    
    // Read and execute the population script
    const populateScript = fs.readFileSync(path.join(__dirname, '../database/02-populate-meetings.sql'), 'utf8');
    console.log('Executing database population script...');
    await sql.query(populateScript);
    
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