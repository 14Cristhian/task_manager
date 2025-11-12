"use client";

import { Button } from "@carbon/react";
import { CheckmarkOutline } from "@carbon/icons-react";

type Props = {
  done: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export default function TaskToggleButton({ done, onToggle, disabled = false }: Props) {
  const activeColor = "var(--cds-support-success)";
  const inactiveColor = "var(--cds-icon-secondary)";
  const hoverColor = "var(--cds-background-hover)";

  return (
    <Button
      kind="ghost"
      size="sm"
      hasIconOnly
      renderIcon={CheckmarkOutline}
      iconDescription={done ? "Marcar como pendiente" : "Marcar como completada"}
      tooltipAlignment="center"
      onClick={disabled ? undefined : onToggle}
      disabled={disabled}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: done ? activeColor : "transparent",
        border: done ? `2px solid ${activeColor}` : `2px solid ${inactiveColor}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: done ? "#ffffff" : inactiveColor,
        transition: "all 0.25s ease-in-out",
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: done ? "0 2px 6px rgba(0, 128, 0, 0.3)" : "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.transform = "scale(1.1)";
          if (!done) btn.style.backgroundColor = hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.transform = "scale(1)";
          btn.style.backgroundColor = done ? activeColor : "transparent";
        }
      }}
    />
  );
}
