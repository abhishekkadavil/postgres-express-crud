import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Employee CRUD APIs",
    description: "Postgres + Node Express CRUD",
  },
  host: "localhost:5001",
};

const outputFile = "./swagger-output.json";
const routes = ["./index.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
