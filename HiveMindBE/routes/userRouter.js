import express from "express";
import { UserController } from "../controllers/UserController.js";
import { ensureUsersModifyOnlyOwnProfileImage } from "../middleware/authorization.js";

export const userRouter = express.Router();

userRouter.get("/users/:userId", (req, res, next) => {
  UserController.findById(req.params.userId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

userRouter.put("/users/:userId", ensureUsersModifyOnlyOwnProfileImage, (req, res, next) => {
  UserController.saveProfileImage(req.params.userId, req.files[0])

    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});
