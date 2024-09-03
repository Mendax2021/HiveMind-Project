import { InputField } from "./InputField.model";

export interface AuthRequest {
  usr: string;
  pwd: string;
}

export interface SignupData {
  usr: InputField<string>;
  pwd: InputField<string>;
  confirmPassword: InputField<string>;
}
