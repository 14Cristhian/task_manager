"use client";

import { Modal, TextArea, TextInput } from "@carbon/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormData } from "@/lib/validations/taskSchema";
import TaskFields from "./TaskFields";

type Props = Readonly<{
  id: number;
  title: string;
  description: string;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  onClose: () => void;
  onSave: () => void; // ya la logica de save está en el padre
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
      size="sm"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <TaskFields
          isEditing
          idPrefix={`edit-${id}`}
          title={title}
          description={description}
          errors={errors}
          handleChange={handleChange}
        />
      </div>
    </Modal>
  );
}
