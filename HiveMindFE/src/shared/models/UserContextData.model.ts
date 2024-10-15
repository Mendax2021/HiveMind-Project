import { User } from "./User.model";

export interface UserContextData {
  user: User | null;
  setUser: (user: User) => void;
}
