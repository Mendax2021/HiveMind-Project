import { InputField } from "./InputField.model";

export interface TextAreaField<T> extends InputField<T> {
  length: number;
}
