import { Request, Response } from "express";
import { HttpResponse } from "../../../user/infrastructure/helpers/error.handler";
import { jobSchema } from "../../../user/infrastructure/helpers/schema.validator";
import { JobUseCase } from "../../../job/application/jobUseCase";

export class JobController {
  constructor(
    private jobUseCase: JobUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public addJob = async ({ body }: Request, res: Response): Promise<any> => {
    try {
      const { error, value } = jobSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, error.details[0].message);
      }
      const job = await this.jobUseCase.addJob(value);
      return this.httpResponse.Ok(res, job);
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while processing your request"
      );
    }
  };

  public getJobs = async (_req: Request, res: Response): Promise<any> => {
    try {
      const jobs = await this.jobUseCase.getJobs();
      return this.httpResponse.Ok(res, jobs);
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while processing your request"
      );
    }
  };

  public deleteJobByUuid = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { uuid } = req.params;
    try {
      await this.jobUseCase.deleteJobByUuid(uuid);
      return this.httpResponse.Ok(res, "Job deleted");
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while processing your request"
      );
    }
  };
}
