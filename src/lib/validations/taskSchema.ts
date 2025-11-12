import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(100, "El título no puede superar los 100 caracteres"),
  description: z.string().max(250, "La descripción no puede superar los 250 caracteres").optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
