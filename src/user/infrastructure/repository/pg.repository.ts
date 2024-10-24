import { IUserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import { clientGenerator } from "../../utils/pgPoolConector";

export class PGRepository implements UserRepository {
  async addUser(user: IUserEntity): Promise<any> {
    try {
      const client = await clientGenerator();
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

  async getUsers(): Promise<any | null> {
    try {
      const client = await clientGenerator();
      const query = "SELECT * FROM users";
      const result = await client.query(query);
      client.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(
        "An error occurred while getting users from the database."
      );
    }
  }
}
