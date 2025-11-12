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

  /** Guardar valores iniciales para resetear */
  const [initialValues, setInitialValues] = useState({ title, description });

  /** Alternar tarea completada */
  const handleToggle = useCallback(async () => {
    try {
      await toggle({ id, done: !done });
    } catch (error) {
      console.error("Error al alternar tarea:", error);
    }
  }, [id, done, toggle]);

  /** Abrir modal de edición */
  const handleEditOpen = () => {
    setInitialValues({ title, description }); // Guardamos valores iniciales
    setEditedTitle(title);
    setEditedDesc(description);
    setIsEditOpen(true);
  };

  /** Guardar edición */
  const handleSave = useCallback(async () => {
    const cleanTitle = editedTitle.trim();

    // Solo hacer petición si hubo cambios
    if (cleanTitle === initialValues.title && editedDesc === initialValues.description) {
      setIsEditOpen(false);
      return;
    }

    try {
      await updateTask({ id, title: cleanTitle, description: editedDesc });
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  }, [id, editedTitle, editedDesc, initialValues, updateTask]);

  /** Cancelar edición y resetear valores */
  const handleCancelEdit = () => {
    setEditedTitle(initialValues.title);
    setEditedDesc(initialValues.description);
    setIsEditOpen(false);
  };

  /** Eliminar tarea */
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
          onEdit={handleEditOpen}
          onDelete={() => setIsDeleteOpen(true)}
        />
      </motion.div>

      {/* Modal de edición */}
      <AnimatePresence>
        {isEditOpen && (
          <Layer>
            <EditModal
              id={id}
              title={editedTitle}
              description={editedDesc}
              setTitle={setEditedTitle}
              setDescription={setEditedDesc}
              onClose={handleCancelEdit} // Resetea valores al cancelar
              onSave={handleSave}
            />
          </Layer>
        )}
      </AnimatePresence>

      {/* Modal de eliminación */}
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
