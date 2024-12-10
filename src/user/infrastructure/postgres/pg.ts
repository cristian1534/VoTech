import "dotenv/config";
import { Pool } from "pg";

const pgConfig =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.POSTGRES_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: 5432,
      };

export const pool = new Pool(pgConfig); 
