import { Comment } from "../models/HiveMindDB.js";

export class CommentController {
  static async saveComment(ideaId, commentData, userId) {
    let comment = Comment.build(commentData);
    comment.userId = userId;
    comment.ideaId = +ideaId;
    return comment.save();
  }

  static async findById(commentId) {
    return Comment.findByPk(commentId);
  }

  static async update(id, updatedComment) {
    let idea = await Comment.findByPk(id);

    const threshold = 15;

    const creationTime = new Date(idea.creationDate);
    const currentTime = new Date();
    const timeDifference = (currentTime - creationTime) / (1000 * 60);

    if (timeDifference > threshold) {
      throw generateHttpError(400, `Cannot modify comment after ${threshold} minutes of creation`);
    }

    idea.set(updatedComment);
    return idea.save();
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
}
