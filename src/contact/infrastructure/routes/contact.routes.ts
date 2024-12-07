import { Router } from "express";
import { PGRepository } from "../../../contact/infrastructure/repository/pg.repository";
import { ContactUseCase } from "../../../contact/application/contactUseCase";
import { ContactController } from "../../../contact/infrastructure/controllers/contact.ctrl";
import { requireAuth } from "../../../user/infrastructure/middleware/auth";

const routes = Router();

const contactRepository = new PGRepository();
const contactUseCase = new ContactUseCase(contactRepository);
const contactCtrl = new ContactController(contactUseCase);

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
 *     Contact:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           description: USER's name
 *         email:
 *           type: string
 *           description: USER's email
 *         message:
 *           type: string
 *           description: Message from the User
 *       example:
 *         name: "Cristian"
 *         email: "cristian@gmail.com"
 *         message: "Hello, I need technical support for the project applying"
 *
 * /contacts:
 *   post:
 *     summary: Create a new CONTACT
 *     tags: [CONTACT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       500:
 *         description: An error occurred while adding a message.
 */
routes.post("/", contactCtrl.addContact);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all MESSAGES
 *     tags: [CONTACT]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: An error occurred while getting messages.
 */
routes.get("/", contactCtrl.getContacts);
/**
 * @swagger
 * /contacts/{uuid}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete the MESSAGE selected if created.
 *     tags: [CONTACT]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The MESSAGE's uuid.
 *     responses:
 *       200:
 *         description: Success
 *
 *       500:
 *         description: An error occurred while deleting a message.
 */
routes.delete("/:uuid", requireAuth, contactCtrl.deleteContactByUuid);

export default routes;
