import React, { ChangeEvent, useState, FocusEvent, FormEvent } from "react";
import { ErrorsType, ValidationType } from "./types";

type UseFormParams<T> = {
  intialValues: T;
  validations?: Partial<Record<keyof T, ValidationType>>;
};

type UseFormReturnType<T> = {
  fields: T;
  errors: ErrorsType<T> | undefined;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>, onSubmit: () => void) => void;
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
    const typedName = name as keyof T;
    const currentValidation = validations && validations[typedName];

    const newErrors: ErrorsType<T> = {};

    if (currentValidation?.custom && !currentValidation.custom?.isValid(value)) {
      newErrors[typedName] = currentValidation.custom.message;
    }

    if (
      currentValidation?.pattern?.value &&
      !RegExp(currentValidation?.pattern.value).test(value)
    ) {
      newErrors[typedName] = currentValidation?.pattern.message;
    }

    if (currentValidation?.required?.value && !value) {
      newErrors[typedName] = currentValidation.required.message;
    }

    const valid = Object.keys(newErrors).length === 0;

    setFields({ ...fields, [name]: value });

    const errorExists = errors ? !!errors[typedName] : false;

    // in order to validate the input after blur, only setErrors if there is alredy an error
    if (errorExists) {
      setErrors((errors) => ({
        ...errors,
        [name]: valid ? undefined : newErrors[typedName],
      }));
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name as keyof T;
    const value = fields[name];
    const currentValidation = validations && validations[name];

    const newErrors: ErrorsType<T> = {};

    if (currentValidation?.custom && !currentValidation.custom?.isValid(value)) {
      newErrors[name] = currentValidation.custom.message;
    }

    if (
      currentValidation?.pattern?.value &&
      !RegExp(currentValidation?.pattern.value).test(value)
    ) {
      newErrors[name] = currentValidation?.pattern.message;
    }

    if (currentValidation?.required?.value && !value) {
      newErrors[name] = currentValidation.required.message;
    }

    const valid = Object.keys(newErrors).length === 0;

    setErrors((errors) => ({
      ...errors,
      [name]: valid ? undefined : newErrors[name],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, onSubmit: () => void) => {
    e.preventDefault();

    const newErrors: ErrorsType<T> = {};
    if (validations) {
      for (const key in validations) {
        const value = fields[key];
        const currentValidation = validations[key];

        if (currentValidation?.custom && !currentValidation.custom?.isValid(value)) {
          newErrors[key] = currentValidation.custom.message;
        }

        if (
          currentValidation?.pattern?.value &&
          !RegExp(currentValidation?.pattern.value).test(value)
        ) {
          newErrors[key] = currentValidation?.pattern.message;
        }

        if (currentValidation?.required?.value && !value) {
          newErrors[key] = currentValidation.required.message;
        }
      }
    }

    const valid = Object.keys(newErrors).length === 0;

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    setErrors(undefined);
    onSubmit();
  };

  const resetFields = () => setFields(intialValues);

  return {
    fields,
    errors,
    handleInputChange,
    handleBlur,
    handleSubmit,
    resetFields,
  };
};
