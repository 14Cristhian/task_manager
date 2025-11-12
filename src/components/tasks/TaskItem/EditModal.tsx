"use client";

import { Modal, TextInput } from "@carbon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "@/lib/validations/taskSchema";

type Props = Readonly<{
  id: number;
  title: string;
  description: string;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  loading?: boolean;
}>;

export default function EditModal({
  id,
  title,
  description,
  setTitle,
  setDescription,
  onClose,
  onSave,
  loading,
}: Props) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title, description },
  });

  const handleChange = (field: "title" | "description", value: string) => {
    setValue(field, value);
    field === "title" ? setTitle(value) : setDescription(value);
  };

  const submit = handleSubmit(onSave);

  return (
    <Modal
      open
      modalHeading="Editar tarea"
      modalLabel="Edición"
      primaryButtonText={loading ? "Guardando..." : "Guardar"}
      secondaryButtonText="Cancelar"
      onRequestClose={onClose}
      onRequestSubmit={submit}
      preventCloseOnClickOutside
      size="xs"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <TextInput
          id={`edit-title-${id}`}
          labelText="Título"
          value={title}
          onChange={(e) => handleChange("title", e.currentTarget.value)}
          invalid={!!errors.title}
          invalidText={errors.title?.message}
        />
        <TextInput
          id={`edit-desc-${id}`}
          labelText="Descripción"
          value={description}
          onChange={(e) => handleChange("description", e.currentTarget.value)}
          invalid={!!errors.description}
          invalidText={errors.description?.message}
        />
      </div>
    </Modal>
  );
}
