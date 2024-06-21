import { DataTypes } from "sequelize";

export function createModel(database) {
  database.define("Idea", {
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
          msg: "La descrizione deve essere lunga al massimo 400 caratteri!",
        },
      },
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}
