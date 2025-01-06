import { Router } from "express";
import { PGRepository } from "../repository/pg.repository";
import { JobUseCase } from "../../../job/application/jobUseCase";
import { JobController } from "../controllers/job.ctrl";

const routes = Router();

const jobRepository = new PGRepository();
const jobUseCase = new JobUseCase(jobRepository);
const jobCtrl = new JobController(jobUseCase);


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
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - contact
 *       properties:
 *         title:
 *           type: string
 *           description: Job's title
 *         description:
 *           type: string
 *           description: Job's description
 *         contact:
 *           type: string
 *           description: Employer's email address
 *       example:
 *         title: "Landing Page"
 *         description: "Need to be done before end of the month."
 *         contact: "cristian@gmail.com"
 *
 * /jobs:
 *   post:
 *     summary: Create a new JOB
 *     tags: [JOB]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       500:
 *         description: An error occurred while adding a message.
 */
routes.post("/", jobCtrl.addJob);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all JOBS
 *     tags: [JOB]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: An error occurred while getting jobs.
 */
routes.get("/", jobCtrl.getJobs);

/**
 * @swagger
 * /jobs/{uuid}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete the JOB selected if created.
 *     tags: [JOB]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The JOB's uuid.
 *     responses:
 *       200:
 *         description: Success
 *
 *       500:
 *         description: An error occurred while deleting a message.
 */
routes.delete("/:uuid", jobCtrl.deleteJobByUuid);

export default routes;
