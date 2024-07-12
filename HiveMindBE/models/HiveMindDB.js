import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createIdeaModel } from "./Idea.js";
import { createModel as createCommentModel } from "./Comment.js";
import { createModel as createVoteModel } from "./Vote.js";

//leggo il file .env e lo rendo disponibile come variabile d'ambiente
import "dotenv/config.js";

export const database = new Sequelize({
  storage: process.env.DB_CONNECTION_URI,
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
  foreignKey: { name: "user_id", allowNull: false },
});

Idea.User = Idea.belongsTo(User, {
  foreignKey: { name: "user_id", allowNull: false },
});

//Utente 1 - N Commento
User.Comments = User.hasMany(Comment, {
  foreignKey: { name: "user_id", allowNull: false },
});

Comment.User = Comment.belongsTo(User, {
  foreignKey: { name: "user_id", allowNull: false },
});

//Utente 1 - N Voto
User.Votes = User.hasMany(Vote, {
  foreignKey: { name: "user_id", allowNull: false },
});

Vote.User = Vote.belongsTo(User, {
  foreignKey: { name: "user_id", allowNull: false },
});

//Idea 1 - N Commento
Idea.Comments = Idea.hasMany(Comment, {
  foreignKey: { name: "idea_id", allowNull: false },
});

Comment.Idea = Comment.belongsTo(Idea, {
  foreignKey: { name: "idea_id", allowNull: false },
});

//Idea 1 - N Voto
Idea.Votes = Idea.hasMany(Vote, {
  foreignKey: { name: "idea_id", allowNull: false },
});

Vote.Idea = Vote.belongsTo(Idea, {
  foreignKey: { name: "idea_id", allowNull: false },
});

//sincronizzazione dello scehma del database
database
  .sync()
  .then(() => {
    console.log("Database sincronizzato");
  })
  .catch((err) => {
    console.log("Errore nella sincronizzazione: " + err.message);
  });
