import express from "express";
import { CommentController } from "../controllers/CommentController.js";
import { ensureUsersModifyOnlyOwnComments } from "../middleware/authorization.js";

export const commentRouter = express.Router();

commentRouter.post("/ideas/:ideaId/comments", (req, res, next) => {
  CommentController.saveComment(req.params.ideaId, req.body, req.userId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});
