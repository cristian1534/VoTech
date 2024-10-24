import { Pool } from "pg";
import { pgConfig } from "../infrastructure/postgres/pg";

const pool = new Pool(pgConfig);

export const clientGenerator = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (e: any) {
    console.error(e);
    throw new Error("An error occurred while creating a new client.");
  }
};
