import { Vote, Idea } from "../models/HiveMindDB.js";

export class VoteController {
  static async saveVote(ideaId, voteData, userId) {
    // const idea = await Idea.findByPk(ideaId);
    // if (!idea) throw { status: 404, message: "This idea does not exist" };
    let existingVote = await Vote.findOne({
      where: {
        userId: userId,
        ideaId: ideaId,
      },
    });
    if (!existingVote) {
      let newVote = Vote.build(voteData);
      newVote.userId = userId;
      newVote.ideaId = ideaId;
      newVote.voteType = voteData.type;
      return newVote.save();
    } else throw { status: 400, message: "You can have at most one vote for this idea" };
  }

  static async updateVote(modifiedVote, voteId) {
    let existingVote = await Vote.findOne({
      where: {
        id: voteId,
      },
    });
    if (existingVote) {
      existingVote.voteType = modifiedVote.type;
      return existingVote.save();
    } else throw { status: 400, message: "You haven't voted on this idea yet" };
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

  static async getAllVotes(ideaId, type) {
    const voteType = type === "upvote" ? 1 : type === "downvote" ? -1 : null;
    const allVotes = await Vote.findAll(voteType ? { where: { voteType: voteType, ideaId: ideaId } } : {});

    return {
      votes: allVotes,
      count: allVotes.length,
    };
  }
}
