import { IProjectEntity } from "../../domain/project.entity";
import { ProjectRepository } from "project/domain/project.respository";
import { clientGenerator } from "../../../user/utils/pgPoolConector";

export class PGRepository implements ProjectRepository {
  async addProject(project: IProjectEntity): Promise<any> {
    try {
      const client = await clientGenerator();
      const query = `INSERT INTO projects (uuid, name, description, technologies, image, votes) VALUES ($1, $2, $3, $4, $5, $6)`;
      const values = [
        project.uuid,
        project.name,
        project.description,
        project.technologies,
        project.image,
        project.votes,
      ];
      await client.query(query, values);
      client.release();
      return project;
    } catch (err: any) {
      console.error(err);
      throw new Error(
        "An error occurred while adding project to the database."
      );
    }
  }

  async getProjects(): Promise<any>{
    try {
      const client = await clientGenerator();
      const query = `SELECT * FROM projects`;
      const result = await client.query(query);
      client.release();
      return result.rows;
    }catch(err: any) {
      console.log(err);
      throw new Error(
        "An error occurred while getting projects from the database."
      );
    }
  }

  async deleteProject(uuid: string): Promise<any> {
    try {
      const client = await clientGenerator();
      const query = `DELETE FROM projects WHERE uuid = $1`;
      const values = [uuid];
      await client.query(query, values);
      client.release();
      return await this.getProjects();
    } catch (err: any) {
      console.error(err);
      throw new Error(
        "An error occurred while deleting project from the database."
      );
    }
  }

  async getProjectByUuid(uuid: string): Promise<any> {
    try {
      const client = await clientGenerator();
      const query = `SELECT * FROM projects WHERE uuid = $1`;
      const values = [uuid];
      const result = await client.query(query, values);
      client.release();
      return result.rows[0];
    } catch (err: any) {
      console.error(err);
      throw new Error(
        "An error occurred while getting project by UUID from the database."
      );
    }
  }

  async updateProjectByUuid(
    uuid: string,
    data: Partial<IProjectEntity>
  ): Promise<any> {
    try {
      const client = await clientGenerator();
  
      if (data.votes === undefined) {
        throw new Error("Votes field is required for this update.");
      }
  
      const query = `UPDATE projects SET votes = $1 WHERE uuid = $2`;
      const values = [data.votes, uuid];
  
      await client.query(query, values);
      client.release();
  
      return await this.getProjectByUuid(uuid);
    } catch (err: any) {
      console.error(err);
      throw new Error(
        "An error occurred while updating the votes in the database."
      );
    }
  }
}
