import { IProjectEntity } from "../../domain/project.entity";
import { ProjectRepository } from "project/domain/project.respository";
import { clientGenerator } from "../../../user/utils/pgPoolConector";

export class PGRepository implements ProjectRepository {
  async addProject(project: IProjectEntity): Promise<any> {
    try {
      const client = await clientGenerator();
      const query = `INSERT INTO projects (uuid, name, description, technologies) VALUES ($1, $2, $3, $4)`;
      const values = [
        project.uuid,
        project.name,
        project.description,
        project.technologies,
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
}
