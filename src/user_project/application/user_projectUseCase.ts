import { UserProjectValue } from "../../user_project/domain/user_project.value";
import { UserProjectRepository } from "../../user_project/domain/user_project.repository";

export class UserProjectUseCase {
  constructor(private readonly useProjectUseCase: UserProjectRepository) {}

  public async addUserProject(userId: number, projectId: number) {
    const userProjectValue = new UserProjectValue({
      userId,
      projectId,
      appliedAt: new Date(),
    });
    const userProjectCreated = await this.useProjectUseCase.addUserProject(
      userProjectValue
    );

    return userProjectCreated;
  }

  public async getUserProjects() {
    const userProjects = await this.useProjectUseCase.getUserProjects();
    return userProjects;
  }
}
