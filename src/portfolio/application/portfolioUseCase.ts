import { PortfolioEntity } from "../../portfolio/domain/portfolio.entity";
import { PortfolioRepository } from "../../portfolio/domain/portfolio.repository";
import { PortfolioValue } from "../../portfolio/domain/portfolio.value";
import { v4 as uuidGenerator } from "uuid";

export class PortfolioUseCase {
  constructor(private readonly portfolioRepository: PortfolioRepository) {}

  public async addPortfolio(portfolio: PortfolioEntity) {
    const uuid = uuidGenerator();
    const portfolioValue = new PortfolioValue({ ...portfolio, uuid });
    const portfolioCreated = await this.portfolioRepository.addPortfolio(
      portfolioValue
    );
    return portfolioCreated;
  }

  public async getPortfolios() {
    const portfolios = await this.portfolioRepository.getPortfolios();
    return portfolios;
  }
}
