import { Router } from "express";
import { PGRepository } from "../repository/pg.repository";
import { PortfolioUseCase } from "../../application/portfolioUseCase";
import { PortfolioController } from "../controllers/portfolio.ctrl";

const routes = Router();

const portfolioRepository = new PGRepository();
const portfolioUseCase = new PortfolioUseCase(portfolioRepository);
const portfolioCtrl = new PortfolioController(portfolioUseCase);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *   
 *   schemas:
 *     Portfolio:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - technologies
 *         - members
 *         - deployment
 *         - github
 *         - image
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the portfolio.
 *         description:
 *           type: string
 *           description: Detailed description of the portfolio.
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           description: List of technologies used in the portfolio.
 *         members:
 *           type: array
 *           items:
 *             type: string
 *           description: List of team members involved in the portfolio.
 *         deployment:
 *           type: string
 *           description: URL of the deployed portfolio application.
 *         github:
 *           type: string
 *           description: URL of the portfolio's GitHub repository.
 *         image:
 *           type: string
 *           description: URL of an image representing the portfolio.
 *       example:
 *         title: "Crypto Wallet Application"
 *         description: "Crypto payment operations."
 *         technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS"]
 *         members: ["Juan", "Pedro", "Gonzalo"]
 *         deployment: "https://virtualwallet.com"
 *         github: "https://github.com/pedro/wallet"
 *         image: "https://imgs.search.brave.com/UBCNaBF3Mm4gFG7cN8DadYOvXrryB3crW3auf-F-FtA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzg5LzM3Lzgz/LzM2MF9GXzE4OTM3/ODMzNF9jWTNRbUV0/V3dPNFVEbmJPbjNL/eVI5bnJqQnJ1c2R2/Sy5qcGc"
 *
 * /portfolio:
 *   post:
 *     summary: Create a new Portfolio entry
 *     tags: [PORTFOLIO]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Portfolio'
 *     responses:
 *       200:
 *         description: Portfolio created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Portfolio'
 *       500:
 *         description: An error occurred while creating the portfolio.
 */
routes.post("/", portfolioCtrl.addPortfolio);

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: Get all MESSAGES
 *     tags: [PORTFOLIO]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: An error occurred while getting portfolios.
 */
routes.get("/", portfolioCtrl.getPortfolios);

export default routes;
