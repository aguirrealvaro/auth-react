export type ErrorsType<T> = Partial<Record<keyof T, string>>;

export type ValidationType = {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
};
