import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define(
    "Vote",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      voteType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: {
            args: [[1, -1]],
            msg: "Il tipo di voto deve essere 1 (upvote) o -1 (downvote).",
          },
        },
      },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["userId", "ideaId"],
          msg: "Un utente può votare un'idea una sola volta.",
        },
      ],
      createdAt: false,
    }
  );
}
