import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersModifyOnlyOwnIdeas } from "../middleware/authorization.js";

export const ideaRouter = express.Router();

/**
 * Questa route restituisce tutte le idee presenti nel DB dell'utente corrispondente
 * in base al query param required passato.
 * Se un utente prova a vedere le idee di un altro utente, la richiesta viene rifiutata.
 */
//TODO: Forse da cancellare se non la utilizzo, al suo posto si userà la search (anche per fare questa cosa)
ideaRouter.get("/ideas", (req, res, next) => {
  //se l'utente è loggato, può vedere solo le proprie idee
  if (req.query?.userId && req.userId == req.query?.userId) {
    IdeaController.getAllIdeas(req.query.userId)
      .then((IdeaItems) => {
        res.json(IdeaItems);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next({ status: 403, message: "Forbidden! You are not allowed to see other users' ideas " });
  }
});

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

ideaRouter.get("/ideas/:ideaId", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
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

ideaRouter.delete("/ideas/:ideaId", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.delete(req.params.ideaId)
    .then((item) => {
      if (item) res.json(item);
      else next({ status: 404, message: "Idea not found" });
    })
    .catch((err) => {
      next(err);
    });
});

ideaRouter.put("/ideas/:ideaId", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.update(req.params.ideaId, req.body)
    .then((item) => {
      if (item) res.json(item);
      else next({ status: 404, message: "Idea not found" });
    })
    .catch((err) => {
      next(err);
    });
});
