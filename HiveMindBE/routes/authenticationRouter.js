import express from "express";
import { AuthController } from "../controllers/AuthController.js";

export const authenticationRouter = express.Router();

authenticationRouter.post("/auth/signin", (req, res, next) => {
  //oggetto contente username e password
  AuthController.checkCredentials(req.body)
    .then((userFound) => {
      console.log("user:", userFound);
      if (userFound) {
        res.json(AuthController.issueToken(userFound));
      }
    })
    .catch((err) => {
      next(err);
    });
});

authenticationRouter.post("/auth/signup", (req, res, next) => {
  AuthController.saveUser(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
});
