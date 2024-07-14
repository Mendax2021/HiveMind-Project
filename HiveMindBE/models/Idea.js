import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define(
    "Idea",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        //definisco una funzione di validazione per il campo description
        validate: {
          //la funzione di validazione è di tipo len, ovvero verifica la lunghezza della stringa
          len: {
            //definisco gli argomenti della funzione di validazione, ovvero la lunghezza minima e massima della stringa ed il messaggio d`errore
            args: [0, 400],
            msg: "The description must be a maximum of 400 characters long!",
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
      onDelete: "CASCADE",
      createdAt: false,
    }
  );
}
