import { Router } from "express";
import { PGRepository } from "../repository/pg.repository";
import { UserProjectUseCase } from "../../../user_project/application/user_projectUseCase";
import { UserProjectController } from "../controllers/user_project.ctrl";
const routes = Router();

const userProjectRepository = new PGRepository();
const userProjectUseCase = new UserProjectUseCase(userProjectRepository);
const userProjectCtrl = new UserProjectController(userProjectUseCase);


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
 *     UserProject:
 *       type: object
 *       required:
 *         - userEmail
 *         - projectId
 *       properties:
 *         userEmail:
 *           type: string
 *           description: USER's email address
 *         projectId: 
 *           type: number
 *           description: PROJECT's id
 *       example:
 *         userEmail: "pepe@gmail.com"
 *         projectId: 3
 * 
 * /user-project:
 *  post:
 *    summary: Create relation between USER and PROJECT
 *    tags: [APPLY]
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/UserProject'
 *    responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProject'
 *       500:
 *         description: An error occurred while adding a project.
 */
routes.post("/", userProjectCtrl.addUserProject);

 /**
 * @swagger
 * /user-project:
 *   get:
 *     summary: Get all RELATIONS between USER and PROJECT
 *     tags: [APPLY]
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *          description: Not Found
 *       500:
 *         description: An error occurred while getting RELATIONS.
 */
routes.get("/", userProjectCtrl.getUserProjects);

export default routes;
