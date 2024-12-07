import { ProjectRepository } from "../domain/project.respository";
import { ProjectValue } from "../domain/project.value";
import { IProjectEntity } from "../domain/project.entity";
import { v4 as uuiGenerator } from "uuid";

export class ProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  public async addProject(project: IProjectEntity) {
    const uuid = uuiGenerator();
    const projectValue = new ProjectValue({ ...project, uuid });
    const projectCreated = await this.projectRepository.addProject(
      projectValue
    );
    return projectCreated;
  }

  public async getProjects() {
    const projects = await this.projectRepository.getProjects();
    return projects;
  }

  public async deleteProject(uuid: string) {
    const deletedProject = await this.projectRepository.deleteProject(uuid);
    return deletedProject;
  }

  public async getProjectByUuid(uuid: string) {
    const project = await this.projectRepository.getProjectByUuid(uuid);
    return project;
  }

  public async updateProject(uuid: string, data: Partial<IProjectEntity>) {
    const updatedProject = await this.projectRepository.updateProjectByUuid(
      uuid,
      data
    );
    return updatedProject;
  }
}
