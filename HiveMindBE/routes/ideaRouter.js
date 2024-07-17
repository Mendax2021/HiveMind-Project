import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersModifyOnlyOwnIdeas } from "../middleware/authorization.js";
import { ensureIdeaExists } from "../middleware/ensureIdeaExists.js";
export const ideaRouter = express.Router();

ideaRouter.get("/ideas/search", (req, res, next) => {
  IdeaController.getIdeasBySearch(req.query)
    .then((ideas) => {
      res.json(ideas);
    })
    .catch((err) => {
      next(err);
    });
});

ideaRouter.post("/ideas", (req, res, next) => {
  IdeaController.saveIdea(req.userId, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

ideaRouter.get("/ideas/:ideaId", ensureIdeaExists, ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  console.log("userId", req.params.userId);
  IdeaController.findById(req.params.ideaId)
    .then((item) => {
      if (item) res.json(item);
      else next({ status: 404, message: "Idea not found" });
    })
    .catch((err) => {
      next(err);
    });
});

ideaRouter.delete("/ideas/:ideaId", ensureIdeaExists, ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.delete(req.params.ideaId)
    .then((item) => {
      if (item) res.json(item);
      else next({ status: 404, message: "Idea not found" });
    })
    .catch((err) => {
      next(err);
    });
});

ideaRouter.put("/ideas/:ideaId", ensureIdeaExists, ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.update(req.params.ideaId, req.body)
    .then((item) => {
      if (item) res.json(item);
      else next({ status: 404, message: "Idea not found" });
    })
    .catch((err) => {
      next(err);
    });
});
