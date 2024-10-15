export type IdeaType = "mainstream" | "unpopular" | "controversial";

export interface IdeaSearchRequest {
  type: IdeaType;
  page: number;
  userId?: number | null;
}
