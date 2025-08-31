// Database connection with fallback to mock for local development
const FORCE_REAL = ['1', 'true', 'yes'].includes(String(process.env.DB_FORCE_REAL || '').toLowerCase());
let USE_MOCK = (!process.env.AZURE_SQL_SERVER ||
  !process.env.AZURE_SQL_DATABASE ||
  !process.env.AZURE_SQL_USERNAME ||
  !process.env.AZURE_SQL_PASSWORD) && !FORCE_REAL;

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
  port: process.env.AZURE_SQL_PORT ? Number(process.env.AZURE_SQL_PORT) : 1433,
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
    try {
      await pool.connect();
    } catch (err) {
      if (FORCE_REAL) {
        console.error('Azure SQL connection failed and DB_FORCE_REAL is set. Not falling back to mock.', err);
        throw err;
      }
      console.warn('Azure SQL connection failed. Falling back to mock DB for local development. Set valid Azure SQL env vars to use real DB.', err);
      // Reset and switch to mock
      try {
        await pool.close();
      } catch {}
      pool = null;
      USE_MOCK = true;
      // @ts-expect-error mock returns empty object that's not a ConnectionPool
      return mockDb.getDatabase();
    }
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
  // If fallback switched to mock (or db lacks request), use mock executor
  const hasRequest = typeof (db as unknown as { request?: unknown }).request === 'function';
  if (USE_MOCK || !hasRequest) {
    return mockDb.executeQuery(query, inputs);
  }
  const request = (db as ConnectionPool).request();
  const sql = await ensureSqlModule();
  
  if (inputs) {
    const mapType = (k: string, v: unknown) => {
      switch (k) {
        case 'id':
        case 'meeting_id':
        case 'user_id':
        case 'duration_minutes':
        case 'created_by':
          return sql.Int;
        case 'meeting_date':
          return sql.DateTime2;
        case 'title':
          return sql.VarChar(200);
        case 'description':
          return sql.Text; // schema uses TEXT
        case 'location':
          return sql.VarChar(100);
        case 'agenda':
          return sql.Text; // schema uses TEXT
        case 'status':
          return sql.VarChar(20);
        case 'entry_type':
          return sql.VarChar(20);
        case 'content':
          return sql.Text; // schema uses TEXT
        default:
          // Fallback best-effort inference
          if (v instanceof Date) return sql.DateTime2;
          if (typeof v === 'number') return sql.Int;
          if (typeof v === 'string' || v == null) return sql.VarChar(sql.MAX);
          return sql.VarChar(sql.MAX);
      }
    };

    Object.entries(inputs).forEach(([key, value]) => {
      const t = mapType(key, value);
      request.input(key, t as never, (value as unknown) as never);
    });
  }
  
  return request.query(query);
}

export async function executeProcedure(procedureName: string, inputs?: QueryInputs): Promise<IResult<unknown> | DbResult> {
  if (USE_MOCK) {
    return mockDb.executeProcedure(procedureName, inputs);
  }
  
  const db = await getDatabase();
  const hasRequest = typeof (db as unknown as { request?: unknown }).request === 'function';
  if (USE_MOCK || !hasRequest) {
    return mockDb.executeProcedure(procedureName, inputs);
  }
  const request = (db as ConnectionPool).request();
  const sql = await ensureSqlModule();
  
  if (inputs) {
    const mapType = (k: string, v: unknown) => {
      switch (k) {
        case 'id':
        case 'meeting_id':
        case 'user_id':
        case 'duration_minutes':
        case 'created_by':
          return sql.Int;
        case 'meeting_date':
          return sql.DateTime2;
        case 'title':
          return sql.VarChar(200);
        case 'description':
          return sql.Text;
        case 'location':
          return sql.VarChar(100);
        case 'agenda':
          return sql.Text;
        case 'status':
          return sql.VarChar(20);
        case 'entry_type':
          return sql.VarChar(20);
        case 'content':
          return sql.Text;
        default:
          if (v instanceof Date) return sql.DateTime2;
          if (typeof v === 'number') return sql.Int;
          if (typeof v === 'string' || v == null) return sql.VarChar(sql.MAX);
          return sql.VarChar(sql.MAX);
      }
    };

    Object.entries(inputs).forEach(([key, value]) => {
      const t = mapType(key, value);
      request.input(key, t as never, (value as unknown) as never);
    });
  }
  
  return request.execute(procedureName);
}