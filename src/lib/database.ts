// Database connection with fallback to mock for local development
const USE_MOCK = !process.env.AZURE_SQL_SERVER ||
  !process.env.AZURE_SQL_DATABASE ||
  !process.env.AZURE_SQL_USERNAME ||
  !process.env.AZURE_SQL_PASSWORD;

// Import mock functions
import * as mockDb from './database-mock';
import type { ConnectionPool, config as SqlConfig, IResult } from 'mssql';
import type { DbResult, QueryInputs } from './db-types';

// Real SQL implementation (loaded only when needed to keep client bundles lean)
let realSql: typeof import('mssql') | null = null;
async function ensureSqlModule(): Promise<typeof import('mssql')> {
  if (!realSql) {
    realSql = await import('mssql');
  }
  return realSql;
}

const isLocalDevelopment = process.env.AZURE_SQL_SERVER === 'localhost';

const dbConfig: SqlConfig = {
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

let pool: ConnectionPool | null = null;

export async function getDatabase(): Promise<ConnectionPool> {
  if (USE_MOCK) {
  // @ts-expect-error mock returns empty object that's not a ConnectionPool
  return mockDb.getDatabase();
  }
  
  if (!pool) {
  const sql = await ensureSqlModule();
  pool = new sql.ConnectionPool(dbConfig);
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
export async function executeQuery(query: string, inputs?: QueryInputs): Promise<IResult<unknown> | DbResult> {
  if (USE_MOCK) {
    console.log('🔧 Using mock database for local development. Set Azure SQL environment variables to use real database.');
    return mockDb.executeQuery(query, inputs);
  }
  
  const db = await getDatabase();
  const request = db.request();
  
  if (inputs) {
    Object.entries(inputs).forEach(([key, value]) => {
  request.input(key, value as never);
    });
  }
  
  return request.query(query);
}

export async function executeProcedure(procedureName: string, inputs?: QueryInputs): Promise<IResult<unknown> | DbResult> {
  if (USE_MOCK) {
    return mockDb.executeProcedure(procedureName, inputs);
  }
  
  const db = await getDatabase();
  const request = db.request();
  
  if (inputs) {
    Object.entries(inputs).forEach(([key, value]) => {
  request.input(key, value as never);
    });
  }
  
  return request.execute(procedureName);
}