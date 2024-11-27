import { IUserProject } from "../../domain/user_project.entity";
import { UserProjectRepository } from "../../domain/user_project.repository";
import { clientGenerator } from "../../../user/utils/pgPoolConector";

export class PGRepository implements UserProjectRepository {
  async addUserProject(
    userProject: IUserProject
  ): Promise<IUserProject | null> {
    try {
      const client = await clientGenerator();
      const query = `INSERT INTO user_project_applications (user_id, project_id ) VALUES ($1, $2)`;
      const values = [userProject.userId, userProject.projectId];
      await client.query(query, values);
      client.release();
      return userProject;
    } catch (err: any) {
      console.error(err);
      throw new Error(
        "An error occurred while adding user project to the database."
      );
    }
  }
  async getUserProjects(): Promise<any | null> {
    try {
      const client = await clientGenerator();
      const query = `
        SELECT 
          upa.user_id, 
          upa.project_id, 
          upa.applied_at, 
          p.name AS project_name,
          u.name AS user_name
        FROM 
          user_project_applications upa
        JOIN 
          projects p ON upa.project_id = p.id
        JOIN 
          users u ON upa.user_id = u.id
      `;
      const result = await client.query(query);
      client.release();
      return result.rows;
    } catch (err: any) {
      console.error(err);
      throw new Error(
        "An error occurred while getting user projects from the database."
      );
    }
  }
}