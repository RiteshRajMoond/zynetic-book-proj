const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const authSwagger = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../docs/auth-swagger.json"), "utf-8")
);
const bookSwagger = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../docs/book-swagger.json"), "utf-8")
);

const swaggerSpecs = {
  openapi: "3.0.0",
  info: authSwagger.info,
  servers: [{ url: process.env.BACKEND_URI }],
  paths: {
    ...authSwagger.paths,
    ...bookSwagger.paths,
  },
  tags: [...authSwagger.tags, ...bookSwagger.tags],
  components: {
    ...authSwagger.components,
    ...bookSwagger.components,
  },
};

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};

module.exports = setupSwagger;
