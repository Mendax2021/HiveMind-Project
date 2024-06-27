import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import jsYaml from "js-yaml";
import * as OpenApiValidator from "express-openapi-validator";

import { authenticationRouter } from "./routes/authenticationRouter.js";
import { enforceAuthentication } from "./middleware/authorization.js";
import { ideaRouter } from "./routes/ideaRouter.js";

const app = express();
const PORT = 3000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));

app.use(express.json());

const apiSpec = jsYaml.load(fs.readFileSync("spec.yaml", "utf8"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiSpec));

//middleware per la validazione delle richieste
app.use(
  OpenApiValidator.middleware({
    apiSpec: "../spec.yaml",
    validateRequests: true,
    validateResponses: false,
  })
);

// Routes
app.use(authenticationRouter);
app.use(enforceAuthentication);
app.use(ideaRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred",
  });
});

app.listen(PORT);
