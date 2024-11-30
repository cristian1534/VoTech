import { IContact } from "../../../contact/domain/contact.entity";
import { clientGenerator } from "../../../user/utils/pgPoolConector";
import { ContactRepository } from "../../../contact/domain/contact.repository";

export class PGRepository implements ContactRepository {
  async addContact(contact: IContact): Promise<IContact | null> {
    try {
      const client = await clientGenerator();
      const query = `INSERT INTO contacts (uuid, name, email, message) VALUES ($1, $2, $3, $4)`;
      const values = [
        contact.uuid,
        contact.name,
        contact.email,
        contact.message,
      ];
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (error) {
      console.error("Error adding contact:", error);
      return null;
    }
  }

  async getContacts(): Promise<IContact[] | null> {
    try {
      const client = await clientGenerator();
      const query = "SELECT * FROM contacts";
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error retrieving contacts:", error);
      return null;
    }
  }

  async deleteContactByUuid(uuid: string): Promise<void> {
    try {
      const client = await clientGenerator();
      const query = "DELETE FROM contacts WHERE uuid = $1";
      const values = [uuid];
      await client.query(query, values);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }
}
