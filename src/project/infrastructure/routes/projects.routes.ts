import { Router } from "express";
import { PGRepository } from "../repository/pg.repository";
import { ProjectUseCase } from "../../application/projectUseCase";
import { ProjectController } from "../controllers/project.ctrl";
import { requireAuth } from "../../../user/infrastructure/middleware/auth";

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
 *         - image
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
 *         image:
 *           type: string
 *           description: PROJECT's image
 *       example:
 *         name: "Wallet"
 *         description: "Fintech awesome project"
 *         technologies: "ReactJS, NodeJS"
 *         image: "https://...."
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
routes.post("/", requireAuth, projectCtrl.addProject);
/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all PROJECTS
 *     tags: [PROJECT]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: An error occurred while getting projects.
 */
routes.get("/", projectCtrl.getProjects);
/**
 * @swagger
 * /projects/{uuid}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete the PROJECT selected if created.
 *     tags: [PROJECT]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The PROJECT's uuid.
 *     responses:
 *       200:
 *         description: Success
 *
 *       500:
 *         description: An error occurred while deleting a project.
 */
routes.delete("/:uuid", requireAuth, projectCtrl.deleteProject);
/**
 * @swagger
 * /projects/{uuid}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get the PROJECT selected if created.
 *     tags: [PROJECT]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: PRODUCT fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: PRODUCT not found
 *       500:
 *         description: Error fetching PRODUCT
 */
routes.get("/:uuid", projectCtrl.getProjectByUuid);
/**
 * @swagger
 * /projects/{uuid}:
 *   patch:
 *     summary: Update the PROJECT selected.
 *     tags: [PROJECT]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The PROJECT's uuid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update for the PROJECT
 *             properties:
 *               votes:
 *                 description: Updated votes for the PROJECT
 *                 type: number
 *             example:
 *               votes: 2
 *     responses:
 *       200:
 *         description: PROJECT updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid input or validation error.
 *       404:
 *         description: PROJECT not found.
 *       500:
 *         description: Error updating the PROJECT.
 */
routes.patch("/:uuid", projectCtrl.updateProject);

export default routes;
