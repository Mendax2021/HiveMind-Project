import { createContext } from "react";
import { ModalContentData } from "../models/ModalContentData";

export const IdeaModalContext = createContext<ModalContentData | null>(null);
