import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersModifyOnlyOwnIdeas } from "../middleware/authorization.js";

export const ideaRouter = express.Router();

ideaRouter.get("/ideas", (req, res, next) => {
  IdeaController.getIdeasForCurrentUser(req)
    .then((IdeaItems) => {
      res.json(IdeaItems);
    })
    .catch((err) => {
      next(err);
    });
});

ideaRouter.post("/ideas", (req, res, next) => {
  IdeaController.saveIdea(req)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

ideaRouter.get("/ideas/:id", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.findById(req)
    .then((item) => {
      if (item) res.json(item);
      else next({ status: 404, message: "Idea not found" });
    })
    .catch((err) => {
      next(err);
    });
});

ideaRouter.delete("/ideas/:id", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.delete(req)
    .then((item) => {
      if (item) res.json(item);
      else next({ status: 404, message: "Todo not found" });
    })
    .catch((err) => {
      next(err);
    });
});

ideaRouter.put("/ideas/:id", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.update(req.params.id, req.body)
    .then((item) => {
      if (item) res.json(item);
      else next({ status: 404, message: "Idea not found" });
    })
    .catch((err) => {
      next(err);
    });
});
