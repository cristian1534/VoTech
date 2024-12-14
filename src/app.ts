import express from "express";
import cors from "cors";
import userRoutes from "./user/infrastructure/routes/user.routes";
import projectRoutes from "./project/infrastructure/routes/projects.routes";
import userProjectRoutes from "./user_project/infrastructure/routes/user_project.routes";
import contactRoutes from "./contact/infrastructure/routes/contact.routes";
import portfolioRoutes from "./portfolio/infrastructure/routes/portfolio.routes";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./user/infrastructure/documentation/swagger.documentation";
import { connectRedis } from "./user/infrastructure/redis/redis";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import morgan from "morgan";
import portfinder from "portfinder";  // Importa portfinder

const app = express();
const swaggerUiOptions = {
  explorer: true,
  customCss: new SwaggerTheme().getBuffer(SwaggerThemeNameEnum.ONE_DARK),
};

(async () => {
  await connectRedis();
})();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "user/infrastructure/postgres")));

const specs = swaggerJSDoc(options);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs, swaggerUiOptions));

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/user-project", userProjectRoutes);
app.use("/contacts", contactRoutes);
app.use("/portfolio", portfolioRoutes);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const DEFAULT_PORT =  4000;

const port = Number(process.env.PORT) || DEFAULT_PORT;

portfinder.getPortPromise({ port })
  .then((port) => {
    app.listen(port, () => {
      process.env.NODE_ENV === "development"
        ? console.log(`Server running at http://localhost:${port} in Development mode`)
        : console.log(`Server running at http://localhost:${port} in Production mode`);
    });
  })
  .catch((err) => {
    console.error("Error finding available port:", err);
  });
