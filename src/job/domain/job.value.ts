import { IJobEntity } from "./job.entity";

export class JobValue implements IJobEntity {
  uuid: string;
  title: string;
  description: string;
  contact: string;
  posted_at?: Date;

  constructor(job: IJobEntity) {
    this.uuid = job.uuid;
    this.title = job.title;
    this.description = job.description;
    this.contact = job.contact;
    this.posted_at = job.posted_at;
  }
}
