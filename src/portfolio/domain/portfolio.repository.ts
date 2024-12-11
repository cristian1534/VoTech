import { PortfolioEntity } from "./portfolio.entity";

export interface PortfolioRepository {
  addPortfolio(portfolio: PortfolioEntity): Promise<PortfolioEntity | null>;
  getPortfolios(): Promise<PortfolioEntity[] | null>;
}
