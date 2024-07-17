import { IdeaController } from "../controllers/IdeaController.js";
import { generateHttpError } from "../utils/common.utils.js";

export async function ensureIdeaExists(req, res, next) {
  const ideaId = req.params.ideaId;
  const idea = await IdeaController.findById(ideaId);
  if (idea) {
    next();
  } else {
    next(generateHttpError(404, "this idea doesn`t exist"));
  }
}
