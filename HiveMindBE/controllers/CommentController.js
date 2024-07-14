import { Comment } from "../models/HiveMindDB.js";

export class CommentController {
  static async saveComment(ideaId, commentData, userId) {
    let comment = Comment.build(commentData);
    comment.userId = userId;
    comment.ideaId = ideaId;
    return comment.save();
  }
}
