import { literal } from "sequelize";
import { Idea } from "../models/HiveMindDB.js";

export class IdeaController {
  /**
   * Metodo che restituisce tutte le idee presenti nel DB dell'utente corrispondente.
   */
  static async getAllIdeas(userId) {
    return Idea.findAll({ where: { user_id: userId } });
  }

  static async saveIdea(req) {
    let idea = Idea.build(req.body);
    idea.user_id = req.userId; // imposto l'id dell'utente loggato come proprietario dell'idea
    return idea.save();
  }

  static async findById(req) {
    return Idea.findByPk(req.params.id);
  }

  static async delete(req) {
    return new Promise((resolve, reject) => {
      this.findById(req).then((item) => {
        item.destroy().then(() => {
          resolve(item);
        });
      });
    });
  }

  static async update(id, updatedIdea) {
    let idea = await Idea.findByPk(id);
    idea.set(updatedIdea);
    return idea.save();
  }

  static async getIdeasBySearch(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const type = query.type;

    const offset = (page - 1) * limit;

    /**
     * array di array utilizzato da sequelize per specificare
     * l'ordinamento dei risultati della query. Ogni elemento
     * dell'array è un array di due elementi: il primo è l`espressione
     * di ordinamento. Il secondo è la direzione dell'ordinamento
     */
    let order;
    switch (type) {
      case "unpopular": // ordina per numero di voti negativi
        order = [
          [literal("(SELECT COUNT(*) FROM Votes WHERE Votes.idea_id = Idea.id AND Votes.vote_type = -1)"), "DESC"],
        ];
        break;
      case "mainstram": // ordina per numero di voti positivi
        order = [
          [literal("(SELECT COUNT(*) FROM Votes WHERE Votes.idea_id = Idea.id AND Votes.vote_type = 1)"), "DESC"],
        ];
        break;
      case "controversial": // calcola il valore assoluto della differenza tra il numero di voti positivi e negativi
        order = [
          [
            literal(
              "ABS((SELECT COUNT(*) FROM Votes WHERE Votes.idea_id = Idea.id AND Votes.vote_type = 1) - (SELECT COUNT(*) FROM Votes WHERE Votes.idea_id = Idea.id AND Votes.vote_type = -1))"
            ),
            "ASC",
          ],
        ];
        break;
      default:
        throw { status: 400, message: "parametri della query non validi" };
    }

    const ideas = await Idea.findAll({
      //specifico che modelli associati includere nella query
      include: [
        {
          model: Vote,
          attributes: [], //non voglio includere i dati dei voti
        },
      ],
      /**
       * specifico quali attributi di Idea includere nella query, oltre a quelli di default.
       * In questo caso includo il numero di voti positivi e negativi.
       */

      attributes: {
        include: [
          [literal("(SELECT COUNT(*) FROM Votes WHERE Votes.idea_id = Idea.id AND Votes.vote_type = 1)"), "upvotes"],
          [literal("(SELECT COUNT(*) FROM Votes WHERE Votes.idea_id = Idea.id AND Votes.vote_type = -1)"), "downvotes"],
        ],
      },
      order, //specifico l'ordinamento
      limit: +limit, //specifico il numero massimo di risultati da restituire
      offset: +offset, //specifico l'offset dei risultati da restituire
    });

    const totalIdeas = await Idea.count();
    const totalPages = Math.ceil(totalIdeas / limit);

    return {
      data: ideas,
      pagination: {
        page: +page,
        limit: +limit,
        totalPages,
      },
    };
  }
}
