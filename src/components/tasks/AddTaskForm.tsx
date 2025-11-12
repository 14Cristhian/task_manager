"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { TextInput, Button, InlineNotification, Layer, Stack } from "@carbon/react";
import { Add } from "@carbon/icons-react";
import { taskSchema, TaskFormData } from "@/lib/validations/taskSchema";
import { useAddTask } from "@/features/tasks/hooks/useAddTask";

export default function AddTaskForm() {
  const { addTask, isLoading } = useAddTask();
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    mode: "onBlur",
  });

  //  Ocultar automaticamente la notificacion
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(
        () => {
          setFeedback(null);
        },
        feedback.type === "success" ? 3000 : 5000
      ); // 3s para exito, 5s para error

      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const onSubmit = useCallback(
    (data: TaskFormData) => {
      setFeedback(null);
      addTask(data, {
        onSuccess: () => {
          setFeedback({ type: "success", message: "Tarea agregada correctamente" });
          reset();
        },
        onError: (err: any) =>
          setFeedback({
            type: "error",
            message: err?.message ?? "Error al agregar tarea",
          }),
      } as any);
    },
    [addTask, reset]
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        borderRadius: "1rem",
        background: "var(--cds-layer)",
        padding: "2rem",
        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
      }}
    >
      <Layer>
        <Stack gap={4}>
          <header>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>Nueva Tarea</h2>
            <p style={{ marginTop: "0.25rem", color: "var(--cds-text-secondary)" }}>
              Crea y organiza tus pendientes fácilmente.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <TextInput
                id="title"
                labelText="Título"
                placeholder="Ej. Llamar al cliente"
                {...register("title")}
                invalid={!!errors.title}
                invalidText={errors.title?.message}
              />

              <TextInput
                id="description"
                labelText="Descripción"
                placeholder="Detalles (opcional)"
                {...register("description")}
                invalid={!!errors.description}
                invalidText={errors.description?.message}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <Button type="submit" kind="primary" size="lg" renderIcon={Add} disabled={isLoading}>
                  Agregar tarea
                </Button>

                {feedback && (
                  <InlineNotification
                    kind={feedback.type}
                    title={feedback.type === "success" ? "Éxito" : "Error"}
                    subtitle={feedback.message}
                    onCloseButtonClick={() => setFeedback(null)}
                    lowContrast
                  />
                )}
              </div>
            </Stack>
          </form>
        </Stack>
      </Layer>
    </motion.section>
  );
}
