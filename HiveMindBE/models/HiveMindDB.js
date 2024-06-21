import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createIdeaModel } from "./Idea.js";
import { createModel as createCommentModel } from "./Comment.js";
import { createModel as createVoteModel } from "./Vote.js";

//leggo il file .env e lo rendo disponibile come variabile d'ambiente
import "dotenv/config.js";

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DIALECT,
});

createUserModel(database);
createIdeaModel(database);
createCommentModel(database);
createVoteModel(database);

export const { User, Idea, Comment, Vote } = database.models;

//configuro le associazioni:
//Utente 1 - N Idea
User.Ideas = User.hasMany(Idea, {
  foreignKey: "user_id",
});

Idea.User = Idea.belongsTo(User, {
  foreignKey: "user_id",
});

//Utente 1 - N Commento
User.Comments = User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.User = Comment.belongsTo(User, {
  foreignKey: "user_id",
});

//Utente 1 - N Voto
User.Votes = User.hasMany(Vote, {
  foreignKey: "user_id",
});

Vote.User = Vote.belongsTo(User, {
  foreignKey: "user_id",
});

//Idea 1 - N Commento
Idea.Comments = Idea.hasMany(Comment, {
  foreignKey: "idea_id",
});

Comment.Idea = Comment.belongsTo(Idea, {
  foreignKey: "idea_id",
});

//Idea 1 - N Voto
Idea.Votes = Idea.hasMany(Vote, {
  foreignKey: "idea_id",
});

Vote.Idea = Vote.belongsTo(Idea, {
  foreignKey: "idea_id",
});

//sincronizzazione dello scehma del database
database
  .sync()
  .then(() => {
    console.log("Database sincronizzato");
  })
  .catch((err) => {
    console.err("Errore nella sincronizzazione: " + err.message);
  });
