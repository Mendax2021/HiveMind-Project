import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define("Vote", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vote_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: {
          args: [[1, -1]],
          msg: "Il tipo di voto deve essere 1 (upvote) o -1 (downvote).",
        },
      },
    },
    vote_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
