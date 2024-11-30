import { IAuthEntity, IUserEntity } from "../../domain/user.entity";
import { UserRepository } from "../../domain/user.repository";
import { clientGenerator } from "../../utils/pgPoolConector";

export class PGRepository implements UserRepository {
  async addUser(user: IUserEntity): Promise<any> {
    try {
      const client = await clientGenerator();

      const query = `INSERT INTO users (uuid, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id`;
      const values = [user.uuid, user.name, user.email, user.password];
      const res = await client.query(query, values);
      const userId = res.rows[0].id;

      const subscriptionQuery = `
        INSERT INTO subscriptions (user_id, plan, price, start_date)
        VALUES ($1, $2, $3, CURRENT_DATE)
      `;
      const subscriptionValues = [userId, "Basic Plan", 5.0];
      await client.query(subscriptionQuery, subscriptionValues);

      client.release();

      return { ...user, subscription: { plan: "Basic Plan", price: 5.0 } };
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

  async getUserByUuid(uuid: string): Promise<any | null> {
    try {
      const client = await clientGenerator();
      const query = "SELECT * FROM users WHERE uuid = $1";
      const values = [uuid];
      const result = await client.query(query, values);
      const user = result.rows.length > 0 ? result.rows[0] : null;

      client.release();
      return user;
    } catch (err: any) {
      console.error(err);
      throw new Error("An error occurred while getting user by UUID.");
    }
  }

  async logUser(credentials: IAuthEntity): Promise<any | null> {
    try {
      const client = await clientGenerator();
      const query = "SELECT * FROM users WHERE email = $1";
      const values = [credentials.email];
      const result = await client.query(query, values);
      const user = result.rows.length > 0 ? result.rows[0] : null;

      client.release();
      return user;
    } catch (err: any) {
      console.error(err);
      throw new Error("An error occurred while logging in the user.");
    }
  }

  async deleteUsers(uuid: string): Promise<any | null> {
    try {
      const client = await clientGenerator();
      const query = "DELETE FROM users WHERE uuid = $1";
      const values = [uuid];
      const result = await client.query(query, values);
      client.release();

      if (result.rowCount === 0) {
        return null;
      }
      return true;
    } catch (err) {
      console.error(err);
      throw new Error(
        "An error occurred while deleting user from the database."
      );
    }
  }

  async getUserByEmail(email: string): Promise<any | null> {
    try {
      const client = await clientGenerator();
      const query = "SELECT * FROM users WHERE email = $1";
      const values = [email];
      const result = await client.query(query, values);
      const user = result.rows.length > 0 ? result.rows[0] : null;

      client.release();
      return user;
    } catch (err: any) {
      console.error(err);
      throw new Error("An error occurred while getting user by email.");
    }
  }

  async getSubscriptions(): Promise<any | null> {
    try {
      const client = await clientGenerator();
      const query = `
        SELECT 
          DATE(start_date) AS date,
          COUNT(user_id) AS total_users,
          SUM(price) AS total_revenue,
          COUNT(user_id) - LAG(COUNT(user_id), 1, 0) OVER (ORDER BY DATE(start_date)) AS user_change
        FROM 
          subscriptions
        GROUP BY 
          DATE(start_date)
        ORDER BY 
          DATE(start_date);
      `;

      const result = await client.query(query);
      client.release();

      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error(
        "An error occurred while retrieving subscription trends with changes from the database."
      );
    }
  }
}
