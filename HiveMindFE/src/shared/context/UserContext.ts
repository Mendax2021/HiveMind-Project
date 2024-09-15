import { createContext } from "react";
import { User } from "../models/User.model";

export const UserContext = createContext<User | null>(null);
