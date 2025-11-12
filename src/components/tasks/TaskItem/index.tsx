"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layer } from "@carbon/react";

import { useToggleTask } from "@/features/tasks/hooks/useAddTask";
import { useUpdateTask } from "@/features/tasks/hooks/useUpdateTask";
import { useDeleteTask } from "@/features/tasks/hooks/useDeleteTask";

import TaskCard from "./TaskCard";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

type Props = Readonly<{
  id: number;
  title: string;
  description?: string;
  done?: boolean | null;
  priority?: "high" | "medium" | "low";
  onDeleted?: (message: string) => void;
}>;

export default function TaskItem({ id, title, description = "", done = false, onDeleted }: Props) {
  const { toggle } = useToggleTask();
  const { updateTask } = useUpdateTask();
  const { deleteTask } = useDeleteTask();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDesc, setEditedDesc] = useState(description);

  /** Alternar tarea completada */
  const handleToggle = useCallback(async () => {
    try {
      await toggle({ id, done: !done });
    } catch (error) {
      console.error("Error al alternar tarea:", error);
    }
  }, [id, done, toggle]);

  /**  Guardar edicion */
  const handleSave = useCallback(async () => {
    const cleanTitle = editedTitle.trim();

    // Verificar si hubo cambios
    if (cleanTitle === title && editedDesc === description) {
      // No hay cambios, solo cerramos el modal
      setIsEditOpen(false);
      return;
    }

    try {
      await updateTask({ id, title: cleanTitle, description: editedDesc });
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  }, [id, editedTitle, editedDesc, title, description, updateTask]);

  /**  Eliminar tarea */
  const handleDelete = useCallback(async () => {
    try {
      await deleteTask(id);
      setIsDeleteOpen(false);
      onDeleted?.(`Tarea "${title}" eliminada`);
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  }, [id, title, deleteTask, onDeleted]);

  return (
    <>
      <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.18 }}>
        <TaskCard
          title={title}
          description={description}
          done={!!done}
          onToggle={handleToggle}
          onEdit={() => setIsEditOpen(true)}
          onDelete={() => setIsDeleteOpen(true)}
        />
      </motion.div>

      {/*  Modal de edicion */}
      <AnimatePresence>
        {isEditOpen && (
          <Layer>
            <EditModal
              id={id}
              title={editedTitle}
              description={editedDesc}
              onClose={() => setIsEditOpen(false)}
              onSave={handleSave}
              setTitle={setEditedTitle}
              setDescription={setEditedDesc}
            />
          </Layer>
        )}
      </AnimatePresence>

      {/*  Modal de eliminacion */}
      <AnimatePresence>
        {isDeleteOpen && (
          <Layer>
            <DeleteModal onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete} />
          </Layer>
        )}
      </AnimatePresence>
    </>
  );
}
