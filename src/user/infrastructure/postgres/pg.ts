import "dotenv/config";
import { Pool } from "pg";

const pool =
  process.env.NODE_ENV === "development"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        password: process.env.PG_PASSWORD,
        port: 5432,
      };

export const pgConfig = new Pool(pool);
