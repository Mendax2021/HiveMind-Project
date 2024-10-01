import { Vote } from "../models/HiveMindDB.js";
import { generateHttpError } from "../utils/common.utils.js";

export class VoteController {
  static async saveVote(ideaId, voteData, userId) {
    let existingVote = await Vote.findOne({
      where: {
        userId: userId,
        ideaId: ideaId,
      },
    });
    if (!existingVote) {
      let newVote = Vote.build(voteData);
      newVote.userId = userId;
      newVote.ideaId = +ideaId;
      newVote.voteType = voteData.voteType;
      return newVote.save();
    } else throw generateHttpError(400, "You can have at most one vote for this idea");
  }

  static async updateVote(modifiedVote, voteId) {
    let existingVote = await Vote.findOne({
      where: {
        id: voteId,
      },
    });
    if (existingVote) {
      console.log("existingVote", existingVote);
      console.log("modifiedVote", modifiedVote);
      existingVote.voteType = modifiedVote.voteType;
      return existingVote.save();
    } else throw generateHttpError(400, "You haven't voted on this idea yet");
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
    const allVotes = await Vote.findAll({
      where: {
        ideaId: ideaId,
        ...(voteType ? { voteType: voteType } : {}),
      },
    });

    return {
      votes: allVotes,
      count: allVotes.length,
    };
  }
}
