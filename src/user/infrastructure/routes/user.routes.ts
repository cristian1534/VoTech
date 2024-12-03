import { Router } from "express";
import { PGRepository } from "../repository/pg.repository";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controllers/user.ctrl";
import { requireAuth } from "../middleware/auth";
const routes = Router();

const userRepository = new PGRepository();
const userUseCase = new UserUseCase(userRepository);
const userCtrl = new UserController(userUseCase);

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
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: USER's name
 *         email:
 *           type: string
 *           description: USER's email
 *         password:
 *           type: string
 *           description: Should be 8 characters in length
 *       example:
 *         name: "Pedro"
 *         email: "pedro@gmail.com"
 *         password: "12345678"
 *
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: USER's email.
 *         password:
 *           type: string
 *           description: USER's password.
 *       example:
 *         email: "pedro@gmail.com"
 *         password: "12345678"
 *
 *
 * /users:
 *   post:
 *     summary: Create a new USER
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Register'
 *       500:
 *         description: Error adding new USER
 */
routes.post("/", userCtrl.addUser);
/**
 * @swagger
 * /users/auth:
 *   post:
 *     summary: Login USER
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Error when LOGGING IN USER
 */
routes.post("/auth", userCtrl.logUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all USERS
 *     tags: [USER]
 *     responses:
 *       200:
 *         description: Success
 *
 *       404:
 *          description: Not Found
 *
 *       500:
 *         description: Error when fetching USERS
 */
routes.get("/", userCtrl.getUsers);
/**
 * @swagger
 * /users/{uuid}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get the USER selected if registered.
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: USER fetched.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Register'
 *       404:
 *         description: USER not found
 *       500:
 *         description: Error fetching USER
 */
routes.get("/:uuid", requireAuth, userCtrl.getUserByUuid);
/**
 * @swagger
 * /users/{uuid}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete the USER selected if registered.
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The USER's uuid.
 *     responses:
 *       200:
 *         description: Success
 *
 *       500:
 *         description: Error when deleting USER
 */
routes.delete("/:uuid", requireAuth, userCtrl.deleteUser);
/**
 * @swagger
 * /users/subscriptions:
 *   post:
 *     summary: Get all subscriptions with user details
 *     tags: [USER]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   subscription_id:
 *                     type: integer
 *                     description: Subscription ID.
 *                   plan:
 *                     type: string
 *                     description: The subscription plan.
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: Price of the subscription.
 *                   start_date:
 *                     type: string
 *                     format: date
 *                     description: The start date of the subscription.
 *                   user_id:
 *                     type: integer
 *                     description: ID of the user associated with the subscription.
 *                   user_uuid:
 *                     type: string
 *                     description: UUID of the user.
 *                   user_name:
 *                     type: string
 *                     description: Name of the user.
 *                   user_email:
 *                     type: string
 *                     format: email
 *                     description: Email of the user.
 *                   active:
 *                     type: boolean
 *                     description: Status of the subscription
 *                 example:
 *                   subscription_id: 2
 *                   plan: "Basic Plan"
 *                   price: 5.00
 *                   start_date: "2024-11-30"
 *                   user_id: 38
 *                   user_uuid: "cb110ab3-2065-4ef5-85ad-178b6fb0dc69"
 *                   user_name: "Cristian"
 *                   user_email: "cristian@gmail.com"
 *                   active: true
 *       404:
 *         description: Not Found
 *       500:
 *         description: Error fetching subscription trends
 */
routes.post("/subscriptions", userCtrl.getSubscriptions);
/**
 * @swagger
 * /users/{uuid}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     summary: Update the active status of a USER
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: The USER's UUID to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               active:
 *                 type: boolean
 *                 description: Status of the user
 *             example:
 *               active: true
 *     responses:
 *       200:
 *         description: USER updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   description: UUID of the user
 *                 active:
 *                   type: boolean
 *                   description: Updated status of the user
 *               example:
 *                 uuid: "cb110ab3-2065-4ef5-85ad-178b6fb0dc69"
 *                 active: true
 *       400:
 *         description: Validation error for the input data
 *       404:
 *         description: USER not found
 *       500:
 *         description: Internal server error
 */
routes.patch("/:uuid", userCtrl.patchUser);

export default routes;
