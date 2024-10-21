import { IUserEntity } from "../../domain/user.entity";
import { UserRepository } from "user/domain/user.repository";
import { Pool } from "pg";
import { pgConfig } from "../postgres/pg";

export class PGRepository implements UserRepository {
  async addUser(user: IUserEntity): Promise<any> {
    try {
      const pool = new Pool(pgConfig);
      const client = await pool.connect();
      const query = `INSERT INTO users (uuid, name, email, password) VALUES ($1, $2, $3, $4)`;
      const values = [user.uuid, user.name, user.email, user.password];
      await client.query(query, values);
      client.release();
      return user;
    } catch (err: any) {
      console.error(err);
      throw new Error("An error occurred while adding user to the database.");
    }
  }
}
