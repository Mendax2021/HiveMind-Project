import { AxiosResponse } from "axios";
import { User } from "../shared/models/User.model";
import { API } from "../axios/ApiErrorInterceptor";
import { endpoints } from "../shared/constants/api";
import { UserRequest } from "../shared/models/UserRequest.model";

export function getUserData(userRequest: UserRequest): Promise<AxiosResponse<User>> {
  return API.get(`${endpoints.user}/${userRequest.id}`);
}
