"use client";

import { useState, useMemo } from "react";
import { InlineNotification, Loading, Tile, TextInput, Stack, Button } from "@carbon/react";
import { AnimatePresence, motion } from "framer-motion";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const { data, isLoading, isError, error, refetch } = useTasks();
  const [search, setSearch] = useState("");

  // Filtrado de tareas
  const filteredTasks = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  // Calculos de resumen
  const totalTasks = data?.length ?? 0;
  const completedTasks = data?.filter((t) => t.done).length ?? 0;
  const pendingTasks = totalTasks - completedTasks;

  if (isLoading)
    return (
      <section style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <Loading description="Cargando tareas..." withOverlay={false} small />
      </section>
    );

  if (isError)
    return (
      <InlineNotification
        kind="error"
        title="Error al cargar tareas"
        subtitle={error?.message ?? "Por favor, inténtalo nuevamente."}
        lowContrast
      >
        <Button kind="secondary" size="sm" onClick={() => refetch()}>
          Reintentar
        </Button>
      </InlineNotification>
    );

  return (
    <section style={{ padding: "1.5rem", borderRadius: "1rem", background: "var(--cds-layer)" }}>
      {/* Header y busqueda */}
      <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>Mis Tareas</h2>
        <TextInput
          id="search-tasks"
          labelText="Buscar tareas"
          placeholder="Escribe para filtrar..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>

      {/* Resumen de tareas */}
      <Stack orientation="horizontal" gap={1} style={{ marginBottom: "1rem" }}>
        <Tile
          style={{
            flex: 1,
            textAlign: "center",
            padding: "1rem",
            backgroundColor: "var(--cds-layer-1)",
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          Total <br />
          <span style={{ fontSize: "1.25rem", color: "var(--cds-text-primary)" }}>{totalTasks}</span>
        </Tile>

        <Tile
          style={{
            flex: 1,
            textAlign: "center",
            padding: "1rem",
            backgroundColor: "var(--cds-layer-1)",
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          Pendientes <br />
          <span style={{ fontSize: "1.25rem", color: "#f1c21b" }}>{pendingTasks}</span>
        </Tile>

        <Tile
          style={{
            flex: 1,
            textAlign: "center",
            padding: "1rem",
            backgroundColor: "var(--cds-layer-1)",
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          Completadas <br />
          <span style={{ fontSize: "1.25rem", color: "#42be65" }}>{completedTasks}</span>
        </Tile>
      </Stack>

      {/* Lista de tareas */}
      {!filteredTasks || filteredTasks.length === 0 ? (
        <Tile
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "var(--cds-text-secondary)",
            border: "1px dashed var(--cds-border-subtle)",
          }}
        >
          No se encontraron tareas.
        </Tile>
      ) : (
        <motion.div
          role="list"
          style={{ display: "grid", gap: "0.75rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <TaskItem
                  id={t.id!}
                  title={t.title}
                  description={t.description}
                  done={t.done}
                  onDeleted={() => refetch()}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
