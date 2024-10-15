import { Comment } from "./Comment.model";
import { Vote } from "./Vote.model";

export interface IdeaResponse {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  userId: number;
  Comments: Comment[];
  Votes: Vote[];
}
