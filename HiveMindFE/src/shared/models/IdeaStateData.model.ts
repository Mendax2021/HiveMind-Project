import { Idea } from "./Idea.model";

export interface IdeaStateData {
  content: Idea[];
  totalPages: number;
  page: number;
  limit: number;
  type: string;
}
