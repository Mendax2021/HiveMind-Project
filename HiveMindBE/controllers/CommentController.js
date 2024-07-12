import { Comment } from "../models/HiveMindDB.js";

export class CommentController {
  static async saveComment(ideaId, commentData, userId) {
    let comment = Comment.build(commentData);
    comment.user_id = userId;
    comment.idea_id = ideaId;
    return comment.save();
  }
}
