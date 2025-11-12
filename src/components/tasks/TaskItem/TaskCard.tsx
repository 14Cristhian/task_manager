"use client";

import { Tile } from "@carbon/react";
import TaskInfo from "./TaskInfo";
import TaskActions from "./TaskActions";
import TaskToggleButton from "./TaskToggleButton";
import TaskStatusBar from "./TaskStatusBar";

type Props = Readonly<{
  title: string;
  description?: string | null;
  done: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}>;

export default function TaskCard({
  title,
  description = "",
  done,
  onToggle,
  onEdit,
  onDelete,
  disabled = false,
}: Props) {
  return (
    <Tile
      role="group"
      aria-label={`Tarea: ${title}`}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem 1.5rem",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        backgroundColor: "var(--cds-ui-background)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        gap: "1rem",
        position: "relative",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 6px 18px rgba(0,0,0,0.06)";
      }}
    >
      <TaskStatusBar done={done} />
      <TaskToggleButton done={done} onToggle={onToggle} disabled={disabled} />
      <TaskInfo title={title} done={done} {...(description ? { description } : {})} />
      <TaskActions onEdit={onEdit} onDelete={onDelete} disabled={disabled} />
    </Tile>
  );
}
