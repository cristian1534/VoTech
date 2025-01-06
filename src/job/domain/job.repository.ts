import { IJobEntity } from "./job.entity";

export interface JobRepository {
  addJob(job: IJobEntity): Promise<IJobEntity | null>;
  getJobs(): Promise<IJobEntity[] | null>;
  deleteJobByUuid(uuid: string): Promise<void>;
}
