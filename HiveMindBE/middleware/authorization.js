import { AuthController } from "../controllers/AuthController.js";

/**
 * Questo middleware garantisce che l'utente sia attualmente autenticato.
 * Altrimenti, reindirizza all'accesso con un messaggio di errore.
 */
export function enforceAuthentication(req, res, next) {
  /**
   * Estre l'header di autorizzazione della richiesta e ne estrae il token
   * (se presente). Se il token non è presente, reindirizza con un errore.
   * Altrimenti, verifica la validità del token e, se valido, passa al prossimo middleware.
   */
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) {
    next({ status: 401, message: "Unauthorized" });
    return;
  }
  AuthController.isTokenValid(token, (err, decodedToken) => {
    if (err) {
      next({ status: 401, message: "Unauthorized" });
    } else {
      req.username = decodedToken.user.username; //aggiungo una proprietà username all'oggetto req
      req.userId = decodedToken.user.id; //aggiungo una proprietà userId all'oggetto req
      next();
    }
  });
}

export async function ensureUsersModifyOnlyOwnIdeas(req, res, next) {
  const userId = req.userId;
  const ideaId = req.params.id;
  const userHasPermission = await AuthController.canUserModifyIdea(userId, ideaId);
  if (userHasPermission) {
    next();
  } else {
    next({
      status: 403,
      message: "Forbidden! You do not have permissions to view or modify this resource",
    });
  }
}

export async function ensureUsersModifyOnlyOwnVotes(req, res, next) {
  const userId = req.userId;
  const voteId = req.params.id;
  const userHasPermission = await AuthController.canUserModifyVote(userId, voteId);
  if (userHasPermission) {
    next();
  } else {
    next({
      status: 403,
      message: "Forbidden! You do not have permissions to view or modify this resource",
    });
  }
}

export async function ensureUsersModifyOnlyOwnComments(req, res, next) {
  const userId = req.userId;
  const commentId = req.params.id;
  const userHasPermission = await AuthController.canUserModifyComment(userId, commentId);
  if (userHasPermission) {
    next();
  } else {
    next({
      status: 403,
      message: "Forbidden! You do not have permissions to view or modify this resource",
    });
  }
}
