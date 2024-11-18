import { Router } from "express";
import { PGRepository } from "../repository/pg.repository";
import { ProjectUseCase } from "../../application/projectUseCase";
import { ProjectController } from "../controllers/project.ctrl";
import { requireAuth } from '../../../user/infrastructure/middleware/auth';

const routes = Router();

const projectRepository = new PGRepository();
const projectUseCase = new ProjectUseCase(projectRepository);
const projectCtrl = new ProjectController(projectUseCase);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       required:
 *         - JWT Token
 *
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - technologies
 *       properties:
 *         name:
 *           type: string
 *           description: PROJECT's name
 *         description: 
 *           type: string
 *           description: PROJECT's email
 *         technologies: 
 *           type: string
 *           description: Information about the project
 *       example:
 *         name: "Wallet"
 *         description: "Fintech awesome project"
 *         technologies: "ReactJS, NodeJS"
 * 
 * /projects:
 *   post:
 *     summary: Create a new PROJECT
 *     tags: [PROJECT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: An error occurred while adding a project.
 */
routes.post("/",requireAuth, projectCtrl.addProject);

export default routes;