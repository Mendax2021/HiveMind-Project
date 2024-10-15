import { AxiosResponse } from "axios";
import { API } from "../axios/Interceptors";
import { endpoints } from "../shared/constants/api";
import { Vote } from "../shared/models/Vote.model";

export function saveVote(voteType: number, ideaId: number): Promise<AxiosResponse<Vote>> {
  return API.post(`${endpoints.idea}/${ideaId}/votes`, { voteType });
}

export function deleteVote(voteId: number): Promise<AxiosResponse<Vote>> {
  return API.delete(`${endpoints.idea}/votes/${voteId}`);
}

export function changeVote(voteId: number, voteType: number): Promise<AxiosResponse<Vote>> {
  return API.put(`${endpoints.idea}/votes/${voteId}`, { voteType });
}
