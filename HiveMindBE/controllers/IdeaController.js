import { Idea, Comment, Vote, User } from "../models/HiveMindDB.js";
import { Op, Sequelize } from "sequelize";
import { generateHttpError } from "../utils/common.utils.js";

export class IdeaController {
  static async saveIdea(userId, ideaData) {
    let idea = Idea.build(ideaData);
    idea.userId = userId; // imposto l'id dell'utente loggato come proprietario dell'idea
    return idea.save();
  }

  static async findById(ideaId) {
    return Idea.findByPk(ideaId);
  }

  static async delete(ideaId) {
    return new Promise((resolve, reject) => {
      this.findById(ideaId).then((item) => {
        item.destroy().then(() => {
          resolve(item);
        });
      });
    });
  }

  static async update(id, updatedIdea) {
    let idea = await this.findById(id);

    const threshold = 15;

    const creationTime = new Date(idea.creationDate);
    const currentTime = new Date();
    const timeDifference = (currentTime - creationTime) / (1000 * 60);

    if (timeDifference > threshold) {
      throw generateHttpError(400, `Cannot modify comment after ${threshold} minutes of creation`);
    }

    idea.set(updatedIdea);
    return idea.save();
  }

  static async getIdeasBySearch(query) {
    const { type, page = 1, limit = 10, userId } = query;

    const offset = (page - 1) * limit;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    console.log(userId);
    let order, having;
    // switch per determinare l'ordinamento delle idee
    switch (type) {
      case "unpopular":
        order = [
          ["downvotes", "DESC"],
          ["upvotes", "ASC"],
        ];
        break;

      case "mainstream":
        order = [
          ["upvotes", "DESC"],
          ["downvotes", "ASC"],
        ];
        break;

      case "controversial":
        order = [["totalVotes", "DESC"]];
        /**
         * soglia del 20% di controversia tra upvotes e downvotes così da esser
         * proporzionato in base al numero di voti totali
         */
        const controversyThreshold = 0.2;
        //Il valore assoluto tra upvotes e downvotes diviso per il numero totale di voti deve essere minore o uguale alla soglia
        having = Sequelize.and(
          Sequelize.where(Sequelize.literal("ABS(upvotes - downvotes) / totalVotes"), {
            [Op.lte]: controversyThreshold,
          }),
          Sequelize.where(Sequelize.literal("totalVotes"), { [Op.gt]: 0 }) // evita divisione per 0 in caso di nessun voto
        );
        break;

      default:
        return [];
    }

    // Calcolo del numero totale di idee che soddisfano i criteri di ricerca
    const totalIdeas = await Idea.count({
      where: { creationDate: { [Op.gte]: oneWeekAgo }, ...(userId ? { userId } : {}) },
      include: [
        {
          model: Vote,
          attributes: [], // escludiamo i voti dal conteggio
        },
      ],
    });

    const ideas = await Idea.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "creationDate",
        [Sequelize.literal(`SUM(CASE WHEN Votes.voteType = 1 THEN 1 ELSE 0 END)`), "upvotes"],
        [Sequelize.literal(`SUM(CASE WHEN Votes.voteType = -1 THEN 1 ELSE 0 END)`), "downvotes"],
        [Sequelize.literal(`COUNT(Votes.id)`), "totalVotes"],
      ],
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["userName"],
          },
        },
        { model: User, attributes: ["userName", "id", "profileImage"] },
        { model: Vote, attributes: ["id", "userId", "voteType"] },
      ],
      group: ["Idea.id", "Comments.id", "Comments.User.id", "User.id"],
      //tramite lo spread operator espando l`oggetto contenente lo userId se è presente
      where: { creationDate: { [Op.gte]: oneWeekAgo }, ...(userId ? { userId } : {}) },
      having, // filtro per la controversia
      order,
      limit,
      offset,
      subQuery: false, // necessario per rendere più efficiente la query ed evitare errori con il group by
    });

    const totalPages = Math.ceil(totalIdeas / limit);

    return {
      content: ideas,
      page,
      limit,
      totalPages,
    };
  }
}
