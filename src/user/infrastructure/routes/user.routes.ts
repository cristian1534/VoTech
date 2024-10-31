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
 *         password: "cuatrocincoseis"
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
routes.get("/" ,userCtrl.getUsers);
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
 * /users/{id}:
 *   delete:
 *     security: 
 *      - bearerAuth: []
 *     summary: Delete the USER selected if registered.
 *     tags: [USER]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The USER's id.
 *     responses:
 *       200:
 *         description: Success
 *        
 *       500:
 *         description: Error when deleting USER
 */
routes.delete("/:uuid",requireAuth ,userCtrl.deleteUser);

export default routes;