import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUsersModifyOnlyOwnIdeas } from "../middleware/authorization.js";

export const ideaRouter = express.Router();

/**
 * Questa route restituisce tutte le idee presenti nel database se non
 * viene passato il parametro userId. Se userId è presente, restituisce
 * solo le idee dell'utente corrispondente.
 * Se un utente prova a vedere le idee di un altro utente, la richiesta viene rifiutata.
 */
ideaRouter.get("/ideas", (req, res, next) => {
  //se l'utente è loggato, può vedere solo le proprie idee
  if (!req.query?.userId || req.userId == req.query.userId) {
    //se ho parametri, li passo alla funzione, altrimenti passo undefined (nullish coalescing operator)
    IdeaController.getAllIdeas(req.query ?? undefined)
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

//aggiunta del metodo per modificare solo alcune proprietà dell'idea
// ideaRouter.patch("/ideas/:id", ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
//   IdeaController.update(req.params.id, req.body)
//     .then((item) => {
//       if (item) res.json(item);
//       else next({ status: 404, message: "Idea not found" });
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
