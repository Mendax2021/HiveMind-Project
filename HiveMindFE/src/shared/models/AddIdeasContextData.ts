import { Idea } from "./Idea.model";

export interface AddIdeasContextData {
  addIdea?: (idea: Idea) => void;
  setAddIdea: (addIdea: (idea: Idea) => void) => void;
}
