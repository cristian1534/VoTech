import { PortfolioEntity } from "./portfolio.entity";

export class PortfolioValue implements PortfolioEntity {
  uuid: string;
  title: string;
  description: string;
  technologies: string[];
  members: string[];
  deployment: string;
  github: string;
  image: string;

  constructor(portfolio: PortfolioEntity) {
    this.uuid = portfolio.uuid;
    this.title = portfolio.title;
    this.description = portfolio.description;
    this.technologies = portfolio.technologies;
    this.members = portfolio.members;
    this.deployment = portfolio.deployment;
    this.github = portfolio.github;
    this.image = portfolio.image;
  }
}
