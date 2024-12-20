import { IProjectEntity } from "./project.entity";

export class ProjectValue {
  uuid: string;
  name: string;
  description: string;
  technologies: string;
  image: string;

  constructor(project: IProjectEntity) {
    this.uuid = project.uuid;
    this.name = project.name;
    this.description = project.description;
    this.technologies = project.technologies;
    this.image = project.image;
  }
}
