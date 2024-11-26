export interface IProjectEntity {
  uuid: string;
  name: string;
  description: string;
  technologies: string;
  image: string;
  teamMembers?: string[];
}
