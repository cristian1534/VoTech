import { IUserProject } from "./user_project.entity";

export class UserProjectValue implements IUserProject {
  userEmail: string;
  projectId: number;
  appliedAt?: Date;

  constructor(userProject: IUserProject) {
    this.userEmail = userProject.userEmail;
    this.projectId = userProject.projectId;
    this.appliedAt = userProject.appliedAt;
  }
}
