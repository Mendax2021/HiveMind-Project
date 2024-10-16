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
import { voteRouter } from "./routes/voteRouter.js";
import { checkNonEmptyBodyFields } from "./middleware/checkNonEmptyBodyFields.js";
import { commentRouter } from "./routes/commentRouter.js";
import { userRouter } from "./routes/userRouter.js";

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
    apiSpec: "spec.yaml",
    validateRequests: true,
    validateResponses: false,
  })
);

// Routes
app.use(checkNonEmptyBodyFields);
app.use(authenticationRouter);
app.use(enforceAuthentication);
app.use(ideaRouter);
app.use(voteRouter);
app.use(commentRouter);
app.use(userRouter);

app.use((err, req, res, next) => {
  console.log(err.stack); //se non è presente stack, stamperà undefined
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred",
  });
});

app.listen(PORT);
