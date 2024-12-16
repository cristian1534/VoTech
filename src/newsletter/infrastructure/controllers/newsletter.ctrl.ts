import { Request, Response } from "express";
import { NewsLetterUseCase } from "../../../newsletter/application/newsletterUseCase";
import { HttpResponse } from "../../../user/infrastructure/helpers/error.handler";
import { newsLetterSchema } from "../../../user/infrastructure/helpers/schema.validator";

export class NewsLetterController {
  constructor(
    private newsLetterUseCase: NewsLetterUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public addNewsletter = async (
    { body }: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { error, value } = newsLetterSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, error.details[0].message);
      }

      const existingAccount = await this.newsLetterUseCase.getAccountByEmail(
        value.email
      );
      if (existingAccount) {
        return this.httpResponse.BadRequest(
          res,
          "An account with this email already exists."
        );
      }
      const newsletter = await this.newsLetterUseCase.addNewsletter(value);
      return this.httpResponse.Ok(res, newsletter);
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while processing your request."
      );
    }
  };

  public deleteNewsletter = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { id } = req.params;
    try {
      await this.newsLetterUseCase.deleteNewsletter(Number(id));
      return this.httpResponse.Ok(res, "Newsletter deleted");
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while deleting the newsletter."
      );
    }
  };

  public getNewsletters = async (req: Request, res: Response): Promise<any> => {
    try {
      const newsletters = await this.newsLetterUseCase.getNewsletters();
      if (newsletters?.length === 0) {
        return this.httpResponse.NotFound(res, "No newsletters found.");
      }
      return this.httpResponse.Ok(res, newsletters);
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while retrieving the newsletters."
      );
    }
  };
  public getAccountByEmail = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { email } = req.params;
    try {
      const account = await this.newsLetterUseCase.getAccountByEmail(email);
      return this.httpResponse.Ok(res, account);
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while retrieving the account."
      );
    }
  };
}
