import { IJobEntity } from "../../job/domain/job.entity";
import { JobValue } from "../../job/domain/job.value";
import { JobRepository } from "../../job/domain/job.repository";
import { v4 as uuidGenerator } from "uuid";

export class JobUseCase {
  constructor(private readonly jobRepository: JobRepository) {}
  public async addJob(job: IJobEntity) {
    const uuid = uuidGenerator();
    const jobValue = new JobValue({ ...job, uuid });
    const jobCreated = await this.jobRepository.addJob(jobValue);
    return jobCreated;
  }

  public async getJobs() {
    const jobs = await this.jobRepository.getJobs();
    return jobs;
  }

  public async deleteJobByUuid(uuid: string) {
    await this.jobRepository.deleteJobByUuid(uuid);
  }
}
