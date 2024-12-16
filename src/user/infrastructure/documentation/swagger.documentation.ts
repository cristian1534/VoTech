import "dotenv/config";
const nodeEnv = process.env.NODE_ENV;

const URL =
  nodeEnv === "production"
    ? "https://votech.onrender.com/"
    : "http://localhost:4000";



export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VoTech",
      version: "1.0.0",
      description: "REST API NodeJS - TS Hexagonal Structure.",
      contact: {
        name: "Cristian Machuca",
        url: "https://www.linkedin.com/in/cristian-machuca-dev/",
        email: "cmachuca32@gmail.com",
      },
    },
    servers: [
      {
        url: URL,
        description: "Backend NodeJS - TS Hexagonal Structure.",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    "./src/user/infrastructure/routes/user.routes.ts",
    "./src/project/infrastructure/routes/projects.routes.ts",
    "./src/user_project/infrastructure/routes/user_project.routes.ts",
    "./src/contact/infrastructure/routes/contact.routes.ts",
    "./src/portfolio/infrastructure/routes/portfolio.routes.ts",
    "./src/newsletter/infrastructure/routes/newsletter.routes.ts"
  ],
};
