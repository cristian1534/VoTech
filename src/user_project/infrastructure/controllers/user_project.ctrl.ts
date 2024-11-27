import { Request, Response } from "express";
import { HttpResponse } from "../../../user/infrastructure/helpers/error.handler";
import { UserProjectUseCase } from "../../../user_project/application/user_projectUseCase";

export class UserProjectController {
  constructor(
    private userProjectUseCase: UserProjectUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public addUserProject = async (req: Request, res: Response): Promise<any> => {
    try {
      const { userEmail, projectId } = req.body;
      await this.userProjectUseCase.addUserProject(userEmail, projectId);
      return this.httpResponse.Ok(res, "User added to Project successfully.");
    } catch (err: any) {
      console.error(err);
      this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };

  public getUserProjects = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const projects = await this.userProjectUseCase.getUserProjects();
      return this.httpResponse.Ok(res, projects);
    } catch (err: any) {
      console.error(err);
      this.httpResponse.InternalServerError(res, "An error occurred.");
    }
  };
}
