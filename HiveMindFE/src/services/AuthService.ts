import { AxiosResponse } from "axios";
import { AuthRequest } from "../shared/models/AuthRequest.model";
import { endpoints } from "../shared/constants/api";
import { User } from "../shared/models/User.model";
import { API } from "../axios/ApiErrorInterceptor";

export function signup(authRequest: AuthRequest): Promise<AxiosResponse<User>> {
  return API.post(`${endpoints.auth}/signup`, authRequest);
}
