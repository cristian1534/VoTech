import { IUserProject } from "./user_project.entity";

export interface UserProjectRepository {
    addUserProject(userProject:IUserProject): Promise<IUserProject | null>;
    getUserProjects(): Promise<IUserProject | null>;
};