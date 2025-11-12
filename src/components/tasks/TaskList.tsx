"use client";

import { useState, useMemo } from "react";
import { InlineNotification, Loading, Tile, Stack, Button, Search } from "@carbon/react";
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

        <Search
          closeButtonLabelText="Clear search input"
          id="search-tasks"
          labelText="Buscar tareas"
          placeholder="Escribe para filtrar..."
          size="md"
          type="search"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>

      {/* Resumen de tareas */}
      {/* === Resumen de tareas === */}
      <div
        style={{
          display: "flex",
          gap: "0.4rem",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <StatCard label="Total" value={totalTasks} color="var(--cds-text-primary)" />
        <StatCard label="Pendientes" value={pendingTasks} color="#f1c21b" />
        <StatCard label="Completadas" value={completedTasks} color="#42be65" />
      </div>

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

export function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0.6rem 0.8rem",
        cursor: "default",
        borderRadius: "0.5rem",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color,
          marginBottom: "0.25rem",
          letterSpacing: "-0.5px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.95rem",
          fontWeight: 500,
          opacity: 0.7,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}
