import { PortfolioEntity } from "../../../portfolio/domain/portfolio.entity";
import { clientGenerator } from "../../../user/utils/pgPoolConector";
import { PortfolioRepository } from "../../../portfolio/domain/portfolio.repository";


export class PGRepository implements PortfolioRepository {
    async addPortfolio(portfolio: PortfolioEntity): Promise<PortfolioEntity | null> {
        try {
            const client = await clientGenerator();
            const query = `INSERT INTO portfolio (uuid, title, description, technologies, members, deployment, github, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
            const values = [
                portfolio.uuid,
                portfolio.title,
                portfolio.description,
                portfolio.technologies.join(', '),
                portfolio.members.join(', '),
                portfolio.deployment,
                portfolio.github,
                portfolio.image,
            ];
            const res = await client.query(query, values);
            return res.rows[0];
        } catch (error) {
            console.error("Error adding portfolio:", error);
            return null;
        }
    }

    async getPortfolios(): Promise<PortfolioEntity[] | null> {
        try {
            const client = await clientGenerator();
            const query = "SELECT * FROM portfolio";
            const res = await client.query(query);
            return res.rows;
        } catch (error) {
            console.error("Error retrieving portfolios:", error);
            return null;
        }
    }
}