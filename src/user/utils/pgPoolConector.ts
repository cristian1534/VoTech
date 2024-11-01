import { pool } from "../infrastructure/postgres/pg";

export const clientGenerator = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (e: any) {
    console.error(e);
    throw new Error("An error occurred while creating a new client.");
  }
};
