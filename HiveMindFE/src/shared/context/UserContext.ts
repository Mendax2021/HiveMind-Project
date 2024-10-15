import { createContext } from "react";

import { UserContextData } from "../models/UserContextData.model";

export const UserContext = createContext<UserContextData | null>(null);
