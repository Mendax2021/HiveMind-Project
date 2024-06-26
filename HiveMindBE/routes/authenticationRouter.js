import express from "express";
import { AuthController } from "../controllers/AuthController.js";

export const authenticationRouter = express.Router();

authenticationRouter.post("/auth", async (req, res) => {
  //oggetto contente username e password
  let userFound = await AuthController.checkCredentials(req, res);
  if (userFound) {
    res.json(AuthController.issueToken(userFound));
  } else {
    res.status(401);
    res.json({ message: "Credenziali invalide, riprova" });
  }
});

authenticationRouter.post("/signup", (req, res, next) => {
  AuthController.saveUser(req, res)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      next({ status: 500, messsage: "Impossibile salvare l`utente" });
    });
});
