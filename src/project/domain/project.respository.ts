import { IProjectEntity } from "./project.entity";

export interface ProjectRepository {
  addProject(project: IProjectEntity): Promise<IProjectEntity | null>;
}
