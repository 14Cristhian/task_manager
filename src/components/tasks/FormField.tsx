"use client";

import { TextInput } from "@carbon/react";
import { JSX } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string;
}

export function FormField({ id, label, placeholder, register, error }: FormFieldProps): JSX.Element {
  return (
    <div className="form-field">
      <TextInput
        id={id}
        labelText={label}
        placeholder={placeholder}
        {...register}
        invalid={Boolean(error)}
        invalidText={error}
        size="lg"
      />
    </div>
  );
}
