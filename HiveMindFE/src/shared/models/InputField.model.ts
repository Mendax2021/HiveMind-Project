export interface InputField<T> {
  value: T;
  isDirty: boolean;
  validateCriteria: (value: T) => string;
}
