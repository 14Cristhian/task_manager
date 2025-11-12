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
    <Stack
      gap={0.5}
      style={{
        flex: 1,
        minWidth: 0,
        flexDirection: "column",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      {/* === Titulo + Estado === */}
      <Stack
        gap={1}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <h3
          title={title}
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: "1rem",
            color: "var(--cds-text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: "1 1 auto",
            minWidth: 0,
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
            flexShrink: 0,
          }}
        >
          {statusLabel}
        </Tag>
      </Stack>

      {/* === Descripcion === */}
      {description && (
        <div
          style={{
            marginTop: 4,
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--cds-text-secondary)",
            overflow: "hidden",
          }}
        >
          <Information
            size={16}
            style={{
              color: "var(--cds-interactive)",
              flexShrink: 0,
              marginTop: 2,
            }}
          />
          <span
            title={description}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "1.4",
              wordBreak: "break-word",
            }}
          >
            {description}
          </span>
        </div>
      )}
    </Stack>
  );
}
