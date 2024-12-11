import { Request, Response } from "express";
import { HttpResponse } from "../../../user/infrastructure/helpers/error.handler";
import { PortfolioUseCase } from "../../../portfolio/application/portfolioUseCase";
import { portfolioSchema } from "../../../user/infrastructure/helpers/schema.validator";

export class PortfolioController {
  constructor(
    private portfolioUseCase: PortfolioUseCase,
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  public addPortfolio = async (
    { body }: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { error, value } = portfolioSchema.validate(body);
      if (error) {
        return this.httpResponse.BadRequest(res, error.details[0].message);
      }
      const portfolio = await this.portfolioUseCase.addPortfolio(value);
      return this.httpResponse.Ok(res, portfolio);
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while processing your request."
      );
    }
  };

  public getPortfolios = async (_req: Request, res: Response): Promise<any> => {
    try {
      const portfolios = await this.portfolioUseCase.getPortfolios();
      return this.httpResponse.Ok(res, portfolios);
    } catch (error) {
      console.error(error);
      return this.httpResponse.InternalServerError(
        res,
        "An error occurred while retrieving portfolios."
      );
    }
  };
}
