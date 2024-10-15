// Tipo parametrico per la definizione di un campo di input
export interface InputField<T> {
  value: T;
  isDirty: boolean;
  validateCriteria?: (value: T) => string;
}
