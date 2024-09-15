import { InputField } from "./InputField.model";

export interface SignUpData {
  usr: InputField<string>;
  pwd: InputField<string>;
  confirmPassword: InputField<string>;
}
