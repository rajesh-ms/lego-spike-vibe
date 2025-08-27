import sql from 'mssql';

const dbConfig: sql.config = {
  server: process.env.AZURE_SQL_SERVER || '',
  database: process.env.AZURE_SQL_DATABASE || '',
  user: process.env.AZURE_SQL_USERNAME || '',
  password: process.env.AZURE_SQL_PASSWORD || '',
  options: {
    encrypt: true, // Use encryption for Azure SQL
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  requestTimeout: 30000,
};

let pool: sql.ConnectionPool | null = null;

export async function getDatabase(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = new sql.ConnectionPool(dbConfig);
    await pool.connect();
  }
  return pool;
}

export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}

// Database query helpers
export async function executeQuery(query: string, inputs?: Record<string, unknown>): Promise<sql.IResult<unknown>> {
  const db = await getDatabase();
  const request = db.request();
  
  if (inputs) {
    Object.entries(inputs).forEach(([key, value]) => {
      request.input(key, value);
    });
  }
  
  return request.query(query);
}

export async function executeProcedure(procedureName: string, inputs?: Record<string, unknown>): Promise<sql.IResult<unknown>> {
  const db = await getDatabase();
  const request = db.request();
  
  if (inputs) {
    Object.entries(inputs).forEach(([key, value]) => {
      request.input(key, value);
    });
  }
  
  return request.execute(procedureName);
}