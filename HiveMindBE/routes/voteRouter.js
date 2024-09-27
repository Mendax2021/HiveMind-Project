import express from "express";
import { VoteController } from "../controllers/VoteController.js";
import { ensureUsersModifyOnlyOwnVotes } from "../middleware/authorization.js";
import { ensureIdeaExists } from "../middleware/ensureIdeaExists.js";

export const voteRouter = express.Router();

voteRouter.post("/ideas/:ideaId/votes", ensureIdeaExists, (req, res, next) => {
  VoteController.saveVote(req.params.ideaId, req.body, req.userId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});

// recupero di tutti i voti di un`idea
voteRouter.get("/ideas/:ideaId/votes", ensureIdeaExists, (req, res, next) => {
  VoteController.getAllVotes(req.params.ideaId, req.query.type)
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      next(err);
    });
});

voteRouter.delete("/ideas/votes/:voteId", ensureUsersModifyOnlyOwnVotes, (req, res, next) => {
  VoteController.delete(req.params.voteId)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      next(err);
    });
});

voteRouter.put("/ideas/votes/:voteId", ensureUsersModifyOnlyOwnVotes, (req, res, next) => {
  VoteController.updateVote(req.body, req.params.voteId)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      next(err);
    });
});
