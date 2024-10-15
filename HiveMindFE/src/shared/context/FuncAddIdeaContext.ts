import { createContext } from "react";
import { AddIdeasContextData } from "../models/AddIdeasContextData";

export const AddIdeaContext = createContext<AddIdeasContextData | null>(null);
