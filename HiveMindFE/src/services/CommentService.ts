import { AxiosResponse } from "axios";
import { API } from "../axios/Interceptors";
import { endpoints } from "../shared/constants/api";
import { Comment } from "../shared/models/Comment.model";

export function addComment(content: string, ideaId: number): Promise<AxiosResponse<Comment>> {
  return API.post(`${endpoints.idea}/${ideaId}/comments`, { content });
}
