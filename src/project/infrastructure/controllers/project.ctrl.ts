import { Request, Response } from "express";
import { projectSchema } from "../../../user/infrastructure/helpers/schema.validator";
import { HttpResponse } from "../../../user/infrastructure/helpers/error.handler";
import { ProjectUseCase } from "../../../project/application/projectUseCase";

export class ProjectController {
  constructor(
    private projectUseCase: ProjectUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public addProject = async (
    { body }: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { error, value } = projectSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, error.details[0].message);
      }

      const project = await this.projectUseCase.addProject(value);

      return this.httpResponse.Ok(res, project);
    } catch (err: any) {
      console.log(err.message);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while adding a project."
      );
    }
  };

  public getProjects = async (req: Request, res: Response): Promise<any> => {
    try {
      const projects = await this.projectUseCase.getProjects();

      return this.httpResponse.Ok(res, projects);
    } catch (err: any) {
      console.log(err.message);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while getting projects."
      );
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<any> => {
    const { uuid } = req.params;

    try {
      const deletedProject = await this.projectUseCase.deleteProject(uuid);

      return this.httpResponse.Ok(res, deletedProject);
    } catch (err: any) {
      console.log(err.message);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while deleting a project."
      );
    }
  };

  public getProjectByUuid = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { uuid } = req.params;

    try {
      const project = await this.projectUseCase.getProjectByUuid(uuid);

      if (!project)
        return this.httpResponse.NotFound(
          res,
          "Project not found with the given UUID"
        );

      return this.httpResponse.Ok(res, project);
    } catch (err: any) {
      console.log(err.message);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while getting project by UUID."
      );
    }
  };

  public updateProject = async (req: Request, res: Response): Promise<any> => {
    const { uuid } = req.params;
    const body = req.body;
    try {
      const updatedProject = await this.projectUseCase.updateProject(
        uuid,
        body
      );

      return this.httpResponse.Ok(res, updatedProject);
    } catch (err: any) {
      console.log(err.message);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while updating a project."
      );
    }
  };
}
