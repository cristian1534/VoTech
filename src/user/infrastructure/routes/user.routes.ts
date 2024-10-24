import { Router } from "express";
import { PGRepository } from "../repository/pg.repository";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controllers/user.ctrl";

const routes = Router();

const userRepository = new PGRepository();
const userUseCase = new UserUseCase(userRepository);
const userCtrl = new UserController(userUseCase);

routes.post("/", userCtrl.addUser);
routes.post("/auth", userCtrl.logUser);
routes.get("/", userCtrl.getUsers);

export default routes;