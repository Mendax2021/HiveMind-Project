import { User } from "./User.model";
import { Vote } from "./Vote.model";
import { Comment } from "./Comment.model";

export interface Idea {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  totalVotes: number;
  upvotes: number;
  downvotes: number;
  User: User;
  Comments: Comment[];
  Votes: Vote[];
}
