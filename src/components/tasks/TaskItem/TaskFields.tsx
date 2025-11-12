"use client";

import { TextInput, TextArea } from "@carbon/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TaskFormData } from "@/lib/validations/taskSchema";

type TaskFieldName = keyof TaskFormData; // "title" | "description"

type TaskFieldsProps = {
  title?: string;
  description?: string;
  register?: UseFormRegister<TaskFormData>;
  errors?: FieldErrors<TaskFormData>;
  handleChange?: (field: TaskFieldName, value: string) => void;
  idPrefix?: string;
  isEditing?: boolean;
};

export default function TaskFields({
  title = "",
  description = "",
  register,
  errors,
  handleChange,
  idPrefix = "",
  isEditing = false,
}: Readonly<TaskFieldsProps>) {
  const inputStyle = {
    borderRadius: "0.5rem",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  } as const;

  return (
    <>
      {/* === Campo Titulo === */}
      <TextInput
        id={`${idPrefix}-title`}
        labelText="Título"
        placeholder="Ej. Llamar al cliente"
        {...(isEditing
          ? {
              value: title,
              onChange: (e) => handleChange?.("title", e.currentTarget.value),
            }
          : register
          ? register("title")
          : {})}
        invalid={!!errors?.title}
        invalidText={errors?.title?.message}
        style={inputStyle}
      />

      {/* === Campo Descripcion === */}
      <TextArea
        id={`${idPrefix}-description`}
        labelText="Descripción"
        placeholder={
          isEditing ? "Agrega o edita los detalles de la tarea..." : "Agrega detalles o notas adicionales..."
        }
        rows={4}
        style={{
          ...inputStyle,
          resize: "none",
        }}
        {...(isEditing
          ? {
              value: description,
              onChange: (e) => handleChange?.("description", e.currentTarget.value),
            }
          : register
          ? register("description")
          : {})}
        invalid={!!errors?.description}
        invalidText={errors?.description?.message}
      />
    </>
  );
}
