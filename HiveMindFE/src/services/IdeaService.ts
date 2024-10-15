import { AxiosResponse } from "axios";
import { API } from "../axios/Interceptors";
import { endpoints } from "../shared/constants/api";
import { IdeaStateData } from "../shared/models/IdeaStateData.model";
import { IdeaSearchRequest } from "../shared/models/IdeaSearchRequest.model";
import { IdeaRequest } from "../shared/models/IdeaRequest.model";
import { IdeaResponse } from "../shared/models/IdeaResponse.model";

export function getIdeas(ideaSearchRequest: IdeaSearchRequest): Promise<AxiosResponse<IdeaStateData>> {
  return API.get(`${endpoints.idea}/search`, { params: ideaSearchRequest });
}

export function createIdea(idea: IdeaRequest): Promise<AxiosResponse<IdeaResponse>> {
  return API.post(endpoints.idea, idea);
}

export function updateIdea(idea: IdeaRequest): Promise<AxiosResponse<IdeaRequest>> {
  return API.put(endpoints.idea, idea);
}
