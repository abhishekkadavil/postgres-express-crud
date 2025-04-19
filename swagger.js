import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Employee CRUD APIs",
    description: "Postgres + Node Express CRUD",
  },
  host: "localhost:5001",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format: **Bearer &lt;token&gt;**",
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger-output.json";
const routes = ["./index.js"];

swaggerAutogen(outputFile, routes, doc);
