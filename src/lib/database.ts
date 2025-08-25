// Database connection with fallback to mock for local development
const USE_MOCK = !process.env.AZURE_SQL_SERVER || 
                 !process.env.AZURE_SQL_DATABASE || 
                 !process.env.AZURE_SQL_USERNAME || 
                 !process.env.AZURE_SQL_PASSWORD;

// Import mock functions
import * as mockDb from './database-mock';

// Real SQL implementation
let realSql: any;
if (!USE_MOCK) {
  realSql = require('mssql');
}

const isLocalDevelopment = process.env.AZURE_SQL_SERVER === 'localhost';

const dbConfig = {
  server: process.env.AZURE_SQL_SERVER || '',
  database: process.env.AZURE_SQL_DATABASE || '',
  user: process.env.AZURE_SQL_USERNAME || '',
  password: process.env.AZURE_SQL_PASSWORD || '',
  options: {
    encrypt: true, // Use encryption for Azure SQL
    enableArithAbort: true,
    // For local development with Azure SQL Edge, trust server certificate
    trustServerCertificate: isLocalDevelopment,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  requestTimeout: 30000,
};

let pool: any = null;

export async function getDatabase(): Promise<any> {
  if (USE_MOCK) {
    return mockDb.getDatabase();
  }
  
  if (!pool) {
    pool = new realSql.ConnectionPool(dbConfig);
    await pool.connect();
  }
  return pool;
}

export async function closeDatabase(): Promise<void> {
  if (USE_MOCK) {
    return mockDb.closeDatabase();
  }
  
  if (pool) {
    await pool.close();
    pool = null;
  }
}

// Database query helpers
export async function executeQuery(query: string, inputs?: Record<string, unknown>): Promise<any> {
  if (USE_MOCK) {
    console.log('🔧 Using mock database for local development. Set Azure SQL environment variables to use real database.');
    return mockDb.executeQuery(query, inputs);
  }
  
  const db = await getDatabase();
  const request = db.request();
  
  if (inputs) {
    Object.entries(inputs).forEach(([key, value]) => {
      request.input(key, value);
    });
  }
  
  return request.query(query);
}

export async function executeProcedure(procedureName: string, inputs?: Record<string, unknown>): Promise<any> {
  if (USE_MOCK) {
    return mockDb.executeProcedure(procedureName, inputs);
  }
  
  const db = await getDatabase();
  const request = db.request();
  
  if (inputs) {
    Object.entries(inputs).forEach(([key, value]) => {
      request.input(key, value);
    });
  }
  
  return request.execute(procedureName);
}