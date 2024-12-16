import { NewsLetterEntity } from "../../../newsletter/domain/newsletter.entity";
import { clientGenerator } from "../../../user/utils/pgPoolConector";
import { NewsLetterRepository } from "../../../newsletter/domain/newsletter.repository";

export class PGRepository implements NewsLetterRepository {
  async addNewsLetter(newsletter: NewsLetterEntity): Promise<any> {
    try {
      const client = await clientGenerator();
      const query = `INSERT INTO newsletter (email) VALUES ($1)`;
      const values = [newsletter.email];
      await client.query(query, values);
    } catch (error) {
      console.error("Error adding newsletter:", error);
    }
  }

  async deleteNewsLetter(id: number): Promise<void> {
    try {
      const client = await clientGenerator();
      const query = "DELETE FROM newsletter WHERE id = $1";
      const values = [id];
      await client.query(query, values);
    } catch (error) {
      console.error("Error deleting newsletter:", error);
    }
  }

  async getNewsletters(): Promise<NewsLetterEntity[] | null> {
    try {
      const client = await clientGenerator();
      const query = "SELECT * FROM newsletter";
      const res = await client.query(query);
      return res.rows;
    } catch (error) {
      console.error("Error retrieving newsletters:", error);
      return null;
    }
  }

  async getAccountByEmail(email: string): Promise<NewsLetterEntity | null> {
    try {
      const client = await clientGenerator();
      const query = "SELECT * FROM newsletter WHERE email = $1";
      const values = [email];
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (error) {
      console.error("Error retrieving newsletter by email:", error);
      return null;
    }
  }
}
