import React, { ChangeEvent, useState } from "react";
import { ErrorsType, ValidationType } from "./types";

type UseFormParams<T> = {
  intialValues: T;
  validations?: Partial<Record<keyof T, ValidationType>>;
};

type UseFormReturnType<T> = {
  fields: T;
  errors: ErrorsType<T> | undefined;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, onSubmit: () => void) => void;
  resetFields: () => void;
};

export const useForm = <T extends Record<keyof T, string>>({
  intialValues,
  validations,
}: UseFormParams<T>): UseFormReturnType<T> => {
  const [fields, setFields] = useState<T>(intialValues);
  const [errors, setErrors] = useState<ErrorsType<T> | undefined>(undefined);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, onSubmit: () => void) => {
    e.preventDefault();

    let valid = true;
    const newErrors: ErrorsType<T> = {};
    if (validations) {
      for (const key in validations) {
        const value = fields[key];
        const currentValidation = validations[key];

        if (currentValidation?.custom && !currentValidation.custom?.isValid(value)) {
          valid = false;
          newErrors[key] = currentValidation.custom.message;
        }

        const pattern = currentValidation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        if (currentValidation?.required?.value && !value) {
          valid = false;
          newErrors[key] = currentValidation.required.message;
        }
      }
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setErrors(undefined);
    onSubmit();
  };

  const resetFields = () => setFields(intialValues);

  return { fields, errors, handleInputChange, handleSubmit, resetFields };
};
