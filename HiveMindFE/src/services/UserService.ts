import { AxiosResponse } from "axios";
import { User } from "../shared/models/User.model";
import { API } from "../axios/Interceptors";
import { endpoints } from "../shared/constants/api";

export function getUserData(id: number): Promise<AxiosResponse<User>> {
  return API.get(`${endpoints.user}/${id}`);
}

export function updateProfileImage(id: number, profileImage: File): Promise<AxiosResponse<User>> {
  const formData = new FormData();
  formData.append("profileImage", profileImage);

  return API.put(`${endpoints.user}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
