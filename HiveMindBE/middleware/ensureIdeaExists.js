import { IdeaController } from "../controllers/IdeaController.js";

export async function ensureIdeaExists(req, res, next) {
  const ideaId = req.params.ideaId;
  const idea = await IdeaController.findById(ideaId);
  if (idea) {
    next();
  } else {
    next({ status: 404, message: "this idea doesn`t exist" });
  }
}
