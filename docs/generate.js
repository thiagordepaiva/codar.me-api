const fs = require("fs");
const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: [path.join(__dirname, "./../src/routes.js")],
};

const openapiSpecification = swaggerJsdoc(options);

fs.writeFileSync(
  path.join(__dirname, "swagger.json"),
  JSON.stringify(openapiSpecification)
);
