import { InputField } from "./InputField.model";
import { TextAreaField } from "./TextAreaField.model";

export interface SaveIdeaData {
  title: InputField<string>;
  description: TextAreaField<string>;
}
