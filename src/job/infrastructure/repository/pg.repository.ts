import { IJobEntity } from "../../../job/domain/job.entity";
import { clientGenerator } from "../../../user/utils/pgPoolConector";
import { JobRepository } from "../../../job/domain/job.repository";

export class PGRepository implements JobRepository {
  async addJob(job: IJobEntity): Promise<any> {
    try {
      const client = await clientGenerator();
      const query = `INSERT INTO jobs (uuid, title, description, contact) VALUES ($1, $2, $3, $4) RETURNING *`;
      const values = [
        job.uuid,
        job.title,
        job.description,
        job.contact,
      ];
      const res = await client.query(query, values);
      return res.rows[0];
    } catch (error) {
      console.error("Error adding job:", error);
      return null;
    }
  }

  async getJobs(): Promise<any> {
    try {
      const client = await clientGenerator();
      const query = "SELECT * FROM jobs";
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error retrieving jobs:", error);
      return null;
    }
  }

  async deleteJobByUuid(uuid: string): Promise<void> {
    try {
      const client = await clientGenerator();
      const query = "DELETE FROM jobs WHERE uuid = $1";
      const values = [uuid];
      await client.query(query, values);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  }
}
