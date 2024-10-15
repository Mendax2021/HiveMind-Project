import { createContext } from "react";
import { SearchFilterContextData } from "../models/SearchFilterContextData.model";

export const SearchFilterContext = createContext<SearchFilterContextData | null>(null);
