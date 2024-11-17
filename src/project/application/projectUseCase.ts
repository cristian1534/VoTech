import { ProjectRepository } from "../domain/project.respository";
import { ProjectValue } from "../domain/project.value";
import { IProjectEntity } from "../domain/project.entity";


export class ProjectUseCase {
    constructor(private readonly projectRepository: ProjectRepository)
    {}

    public async addProject(project: IProjectEntity) {
        const projectValue = new ProjectValue(project);
        const projectCreated = await this.projectRepository.addProject(projectValue);
        return projectCreated;
    }
}