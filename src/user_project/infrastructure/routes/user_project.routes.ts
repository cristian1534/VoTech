import { Router } from "express";
import { PGRepository } from "../repository/pg.repository";
import { UserProjectUseCase } from "../../../user_project/application/user_projectUseCase";
import { UserProjectController } from "../controllers/user_project.ctrl";
const routes = Router();

const userProjectRepository = new PGRepository();
const userProjectUseCase = new UserProjectUseCase(userProjectRepository);
const userProjectCtrl = new UserProjectController(userProjectUseCase);

routes.post("/", userProjectCtrl.addUserProject);
routes.get("/", userProjectCtrl.getUserProjects);

export default routes;
