import express from "express";
import cors from "cors";
import userRoutes from "./user/infrastructure/routes/user.routes";
import projectRoutes from "./project/infrastructure/routes/projects.routes";
import userProjectRoutes from "./user_project/infrastructure/routes/user_project.routes";
import contactRoutes from "./contact/infrastructure/routes/contact.routes";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./user/infrastructure/documentation/swagger.documentation";
import { connectRedis } from "./user/infrastructure/redis/redis";
import morgan from "morgan";
import axios from "axios";

const app = express();
(async () => {
  await connectRedis();
})();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "user/infrastructure/postgres")));
app.use(express.raw({ type: 'application/x-www-form-urlencoded' })); // Para manejar datos en formato x-www-form-urlencoded

const specs = swaggerJSDoc(options);

app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/user-project", userProjectRoutes);
app.use("/contacts", contactRoutes);

app.post("/api/paypal/ipn", async (req, res) => {
  const ipnData = req.body.toString(); 

  const validationParams = new URLSearchParams(ipnData);
  validationParams.append('cmd', '_notify-validate');

  try {
    const response = await axios.post('https://ipnpb.sandbox.paypal.com/cgi-bin/webscr', validationParams);

    if (response.data === 'VERIFIED') {
      console.log('IPN válida:', ipnData);
      res.status(200).send('IPN procesada');
    } else {
      console.log('IPN no verificada');
      res.status(400).send('IPN no verificada');
    }
  } catch (error) {
    console.error('Error al validar la IPN', error);
    res.status(500).send('Error al validar la IPN');
  }
});

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
