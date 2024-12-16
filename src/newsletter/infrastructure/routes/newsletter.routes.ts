import { Router } from "express";
import { PGRepository } from "../repository/pg.repository";
import { NewsLetterUseCase } from "../../../newsletter/application/newsletterUseCase";
import { NewsLetterController } from "../controllers/newsletter.ctrl";

const routes = Router();

const newsletterRepository = new PGRepository();
const newsletterUseCase = new NewsLetterUseCase(newsletterRepository);
const newsletterCtrl = new NewsLetterController(newsletterUseCase);


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
 *     NewsLetter:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: USER's email
 *       example:
 *         email: "cristian@gmail.com"
 * 
 * /newsletter:
 *   post:
 *     summary: Create a new NEWSLETTER account
 *     tags: [NEWSLETTER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsLetter'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NewsLetter'
 *       500:
 *         description: An error occurred while adding a newsletter account.
 */
routes.post("/", newsletterCtrl.addNewsletter);

/**
 * @swagger
 * /newsletter:
 *   get:
 *     summary: Get all NEWSLETTER accounts
 *     tags: [NEWSLETTER]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: An error occurred while getting newsletter accounts.
 */
routes.get("/", newsletterCtrl.getNewsletters);

/**
 * @swagger
 * /newsletter/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete the NEWSLETTER selected if created.
 *     tags: [NEWSLETTER]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The NEWSLETTER's id.
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: An error occurred while deleting a newsletter account.
 */
routes.delete("/:id", newsletterCtrl.deleteNewsletter);

export default routes;
