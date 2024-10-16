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
    let order, whereClause;

    // tramite lo spread operator espando l`oggetto contenente lo userId se è presente
    whereClause = {
      creationDate: { [Op.gte]: oneWeekAgo },
      ...(userId ? { userId } : {}),
    };

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
        order = [
          [Sequelize.literal("totalvotes"), "DESC"],
          [Sequelize.literal("ABS(upvotes - downvotes)"), "ASC"],
        ];
        break;

      default:
        return [];
    }
    /**
     * per evitare che ci siano errori con la join tra idee e commenti,
     * eseguo una query per ottenere solo le idee e successivamente una query
     * per ottenere i commenti che mappo alle idee
     */
    const ideas = await Idea.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "creationDate",
        [Sequelize.literal(`SUM(CASE WHEN Votes.voteType = 1 THEN 1 ELSE 0 END)`), "upvotes"], //assegnazione dell`alias alla somma
        [Sequelize.literal(`SUM(CASE WHEN Votes.voteType = -1 THEN 1 ELSE 0 END)`), "downvotes"],
        [Sequelize.literal(`COUNT(Votes.id)`), "totalVotes"],
      ],
      include: [
        { model: User, attributes: ["userName", "id", "profileImage"] },
        { model: Vote, attributes: ["id", "userId", "voteType"] },
      ],
      where: whereClause,
      group: ["Idea.id", "User.id"],
      order,
      limit,
      offset,
      subQuery: false,
    });

    const ideaIds = ideas.map((idea) => idea.id);
    const comments = await Comment.findAll({
      where: { ideaId: { [Op.in]: ideaIds } },
      include: {
        model: User,
        attributes: ["userName", "profileImage"],
      },
    });

    const votes = await Vote.findAll({
      where: { ideaId: { [Op.in]: ideaIds } },
    });

    // mappo i commenti alle idee corrispondenti
    const ideasWithComments = ideas.map((idea) => {
      const ideaComments = comments.filter((comment) => comment.ideaId === idea.id);
      return {
        ...idea.toJSON(), //rimuovo i metadati aggiunti da sequelize
        Comments: ideaComments,
      };
    });

    const ideaWithVotes = ideasWithComments.map((idea) => {
      const ideaVotes = votes.filter((vote) => vote.ideaId === idea.id);
      return {
        ...idea,
        Votes: ideaVotes,
      };
    });

    // se non ci sono idee che soddisfano i criteri di controversia, esegui una query di fallback
    if (ideaWithVotes.length === 0 && type === "controversial") {
      const fallbackIdeas = await Idea.findAll({
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
          { model: User, attributes: ["userName", "id", "profileImage"] },
          { model: Vote, attributes: ["id", "userId", "voteType"] },
        ],
        where: whereClause,
        group: ["Idea.id", "User.id"],
        order: [["creationDate", "DESC"]],
        limit,
        offset,
        subQuery: false,
      });

      return {
        content: fallbackIdeas,
        page,
        limit,
        totalPages: Math.ceil(fallbackIdeas.length / limit),
        type,
      };
    }
    // calcolo del numero totale di idee che soddisfano i criteri di ricerca
    const totalIdeas = await Idea.count({
      where: { creationDate: { [Op.gte]: oneWeekAgo }, ...(userId ? { userId } : {}) },
      include: [
        {
          model: Vote,
          attributes: [],
        },
      ],
    });

    const totalPages = Math.ceil(totalIdeas / limit);

    return {
      content: ideaWithVotes,
      page,
      limit,
      totalPages,
      type,
    };
  }
}
