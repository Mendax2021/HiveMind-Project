import { User, Idea, Vote, Comment } from "../models/HiveMindDB.js";
import Jwt from "jsonwebtoken";

export class AuthController {
  /**
   * Gestisce le richieste post al path /auth.
   * Controlla le credenziali dell'utente
   */
  static async checkCredentials(req, res) {
    let user = new User({
      userName: req.body.usr,
      password: req.body.pwd,
    });

    let found = await User.findOne({
      where: {
        userName: user.userName,
        password: user.password,
      },
    });

    //ritorna l'utente trovato o null
    return found;
  }

  //Tenta di salvare un nuovo utente nel database
  static async saveUser(req, res) {
    let user = new User({ userName: req.body.usr, password: req.body.pwd });
    return user.save();
  }

  static issueToken(user) {
    // genera un token JWT con l'id e il nome utente
    return Jwt.sign({ user: { id: user.id, username: user.userName } }, process.env.TOKEN_SECRET, {
      expiresIn: `${24 * 60 * 60}s`,
    });
  }

  static isTokenValid(token, callback) {
    Jwt.verify(token, process.env.TOKEN_SECRET, callback);
  }

  static async canUserModifyIdea(userId, ideaId) {
    const idea = await Idea.findByPk(ideaId);
    // l`idea deve esistere ed essere associata all`utente
    return idea && idea.user_id === userId;
  }

  static async canUserModifyVote(userId, voteId) {
    const vote = await Vote.findByPk(voteId);
    // il voto deve esistere ed essere associata all`utente
    return vote && vote.user_id === userId;
  }

  static async canUserModifyComment(userId, commentId) {
    const comment = await Comment.findByPk(commentId);
    // il voto deve esistere ed essere associata all`utente
    return comment && comment.user_id === userId;
  }
}
