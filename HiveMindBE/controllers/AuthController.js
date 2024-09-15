import { User, Idea, Vote, Comment } from "../models/HiveMindDB.js";
import { generateHttpError } from "../utils/common.utils.js";
import Jwt from "jsonwebtoken";

export class AuthController {
  /**
   * Gestisce le richieste post al path /auth.
   * Controlla le credenziali dell'utente
   */
  static async checkCredentials(userData) {
    let user = new User({ userName: userData.usr, password: userData.pwd });

    let found = await User.findOne({
      where: {
        userName: user.userName,
        password: user.password,
      },
    });
    if (!found) {
      throw generateHttpError(401, "Invalid credentials, please try again");
    }
    //ritorna l'utente trovato o null
    return found;
  }

  //Tenta di salvare un nuovo utente nel database
  static async saveUser(userData) {
    let userToAdd = new User({ userName: userData.usr, password: userData.pwd });
    let found = await User.findOne({ where: { userName: userToAdd.userName } });
    if (found) {
      throw generateHttpError(409, "Username already in use");
    }
    return userToAdd.save();
  }

  static issueToken(user) {
    // delete user.dataValues.updatedAt;
    // genera un token JWT con l'id e il nome utente
    const createdToken = Jwt.sign(
      {
        user: {
          id: user.id,
          username: user.userName,
          registrationDate: user.registrationDate,
          profileImage: user.profileImage,
        },
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: `${24 * 60 * 60}s`,
      }
    );

    return { token: createdToken };
  }

  static isTokenValid(token, callback) {
    Jwt.verify(token, process.env.TOKEN_SECRET, callback);
  }

  static async canUserModifyIdea(userId, ideaId) {
    const idea = await Idea.findByPk(ideaId);
    console.log("Idea", idea);
    // l`idea deve esistere ed essere associata all`utente
    return idea && idea.userId === userId;
  }

  static async canUserModifyVote(userId, voteId) {
    const vote = await Vote.findByPk(voteId);
    // il voto deve esistere ed essere associata all`utente
    return vote && vote.userId === userId;
  }

  static async canUserModifyComment(userId, commentId) {
    const comment = await Comment.findByPk(commentId);
    // il voto deve esistere ed essere associata all`utente
    return comment && comment.userId === userId;
  }

  static async canUserModifyProfileImage(userId) {
    console.log("User id", userId);
    const user = await User.findByPk(userId);
    console.log("User", user);
    // l`utente deve esistere ed essere associata all`utente
    return user && user.id === userId;
  }
}
