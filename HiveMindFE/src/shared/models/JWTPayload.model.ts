import { User } from "./User.model";

export interface JWTPayload {
  user: User;
  iat: number;
  exp: number;
}
