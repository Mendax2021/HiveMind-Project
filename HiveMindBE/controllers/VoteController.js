import { Vote, Idea } from "../models/HiveMindDB.js";

export class VoteController {
  static async saveVote(ideaId, voteData, userId) {
    // //? NON SO SE È CORRETTO INCLUDERE IN VOTECONTROLLER, L`IDEA

    // let idea = await Idea.findOne({
    //   where: {
    //     id: ideaId,
    //   },
    // });

    // if (idea.user_id === userId) throw { status: 400, message: "Non puoi votare la tua idea" };

    let existingVote = await Vote.findOne({
      where: {
        user_id: userId,
        idea_id: ideaId,
      },
    });
    if (!existingVote) {
      let newVote = Vote.build(voteData);
      newVote.user_id = userId;
      newVote.idea_id = ideaId;
      newVote.vote_type = voteData.type;
      return newVote.save();
    } else throw { status: 400, message: "Puoi avere al più un voto per questa idea" };
  }

  static async updateVote(modifiedVote, voteId) {
    let existingVote = await Vote.findOne({
      where: {
        id: voteId,
      },
    });
    if (existingVote) {
      existingVote.vote_type = modifiedVote.type;
      return existingVote.save();
    } else throw { status: 400, message: "Non hai ancora votato questa idea" };
  }

  static async findById(voteId) {
    return Vote.findByPk(voteId);
  }

  static async delete(voteId) {
    return new Promise((resolve, reject) => {
      this.findById(voteId).then((item) => {
        item.destroy().then(() => {
          resolve(item);
        });
      });
    });
  }
  //mi restituisce la lista di voti in base alla loro tipologia settata nel query param ed il numero di voti
  //TODO: al momento è una normale getAll. Implementare la ricerca per una DATA IDEA A SECONDA DI CIÒ CHE DICE IL PROFESSORE
  static async getAllVotes(ideaId, type) {
    const voteType = type === "upvote" ? 1 : type === "downvote" ? -1 : null;
    const allVotes = await Vote.findAll(voteType ? { where: { vote_type: voteType, idea_id: ideaId } } : {});

    return {
      votes: allVotes,
      count: allVotes.length,
    };
  }
}
