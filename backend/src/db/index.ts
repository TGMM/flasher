import { ParameterizedQuery as PQ } from 'pg-promise';
import * as pgPromise from 'pg-promise';
import pg from 'pg-promise/typescript/pg-subset';
import * as dotenv from 'dotenv';

dotenv.config();

const devConfig: pg.IConnectionParameters<pg.IClient> = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT ? Number(process.env.PG_PORT) : undefined,
  database: process.env.PG_DBNAME,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
};

const prodConfig: pg.IConnectionParameters<pg.IClient> = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const pgp = pgPromise();
const db = pgp(process.env.NODE_ENV === 'production' ? prodConfig : devConfig);

export const query = <T>(text: string, values?: any[]) => {
  const pq = new PQ({
    text,
    values,
  });

  return db.manyOrNone<T>(pq);
};
