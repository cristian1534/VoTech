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
        url: "http://localhost:4000",
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
  apis: ["./src/user/infrastructure/routes/user.routes.ts"],
};
