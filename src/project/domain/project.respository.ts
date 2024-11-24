import { IProjectEntity } from "./project.entity";

export interface ProjectRepository {
  addProject(project: IProjectEntity): Promise<IProjectEntity | null>;
  getProjects(): Promise<IProjectEntity[] | null>;
  getProjectByUuid(uuid: string): Promise<IProjectEntity> | null;
  deleteProject(uuid: string): Promise<IProjectEntity | null>;
}
