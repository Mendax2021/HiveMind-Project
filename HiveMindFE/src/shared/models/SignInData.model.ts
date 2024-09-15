import { InputField } from "./InputField.model";

export interface SignInData {
  usr: InputField<string>;
  pwd: InputField<string>;
}
