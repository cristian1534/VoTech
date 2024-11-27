import { IUserProject } from "./user_project.entity";

export class UserProjectValue implements IUserProject {
  userId: number;
  projectId: number;
  appliedAt?: Date;

  constructor(userProject: IUserProject) {
    this.userId = userProject.userId;
    this.projectId = userProject.projectId;
    this.appliedAt = userProject.appliedAt;
  }
}
