import { Stack, Tag } from "@carbon/react";
import { Information } from "@carbon/icons-react";

type Props = {
  title: string;
  description?: string;
  done: boolean;
};

export default function TaskInfo({ title, description = "", done }: Props) {
  const statusLabel = done ? "Completada" : "Pendiente";

  return (
    <Stack gap={0.5} style={{ flex: 1, minWidth: 0, flexDirection: "column", justifyContent: "flex-start" }}>
      <Stack gap={1} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <h3
          title={title}
          style={{
            marginBottom: 2,
            fontWeight: 600,
            fontSize: "1rem",
            color: "var(--cds-text-primary)",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {title}
        </h3>

        <Tag
          size="sm"
          type={done ? "green" : "gray"}
          style={{
            backgroundColor: done ? undefined : "#f1c21b",
            color: done ? undefined : "#1a1a1a",
          }}
        >
          {statusLabel}
        </Tag>
      </Stack>

      {description && (
        <div style={{ marginTop: 3, display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "var(--cds-text-secondary)" }}>
          <Information size={16} style={{ color: "var(--cds-interactive)", marginTop: 2, marginBottom: 4 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{description}</span>
        </div>
      )}
    </Stack>
  );
}
