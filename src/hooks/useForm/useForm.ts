import React, { ChangeEvent, useState, FocusEvent, FormEvent } from "react";
import { ErrorsType, BlurredFieldsType, ValidationType } from "./types";

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

  const [blurredFields, setBlurredFields] = useState<BlurredFieldsType<T>>(() => {
    const intialTouchFields = {} as BlurredFieldsType<T>;
    Object.keys(intialValues).forEach((key) => {
      intialTouchFields[key as keyof T] = false;
    });
    return intialTouchFields;
  });

  const parseValidations = (
    name: keyof T,
    value: string,
    currentValidation: Partial<Record<keyof T, ValidationType>>[keyof T] | undefined
  ) => {
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

    return newErrors;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof T;
    const value = e.target.value;
    const currentValidation = validations && validations[name];

    const newErrors = parseValidations(name, value, currentValidation);

    const valid = Object.keys(newErrors).length === 0;

    setFields({ ...fields, [name]: value });

    const isBlurred = !!blurredFields[name];

    if (isBlurred) {
      setErrors((errors) => ({
        ...errors,
        [name]: valid ? undefined : newErrors[name],
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name as keyof T;
    const value = fields[name];
    const currentValidation = validations && validations[name];

    setBlurredFields((blurredFields) => {
      return {
        ...blurredFields,
        [name]: true,
      };
    });

    const newErrors = parseValidations(name, value, currentValidation);

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
