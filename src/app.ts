import express from "express";
import cors from "cors";
import userRoutes from "./user/infrastructure/routes/user.routes";
import projectRoutes from "./project/infrastructure/routes/projects.routes";
import userProjectRoutes from "./user_project/infrastructure/routes/user_project.routes";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./user/infrastructure/documentation/swagger.documentation";
import { connectRedis } from "./user/infrastructure/redis/redis";

const app = express();
(async () => {
  await connectRedis();
})();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "user/infrastructure/postgres")));
const specs = swaggerJSDoc(options);

app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/user-project", userProjectRoutes);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  process.env.NODE_ENV === "development"
    ? console.log(`Server running at ${PORT} Development`)
    : console.log(`Server running at ${PORT} Production`);
});

export default app;
