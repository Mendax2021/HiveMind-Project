import { DataTypes } from "sequelize";
import { createHash } from "crypto";

export function createModel(database) {
  database.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        let hash = createHash("sha256");
        this.setDataValue("password", hash.update(value).digest("hex"));
      },
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
