import { Button } from "@carbon/react";
import { CheckmarkOutline } from "@carbon/icons-react";

type Props = {
  done: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export default function TaskToggleButton({ done, onToggle, disabled = false }: Props) {
  const activeBg = "var(--cds-tag-background-green, #24a148)"; // verde Carbon
  const activeBorder = "var(--cds-tag-background-green, #24a148)";
  const activeIconColor = "#ffffff"; // check blanco cuando activo

  const inactiveBg = "#c9c9c9ff";
  const inactiveBorder = "2px solid #8d8d8d"; // gris claro
  const inactiveIconColor = "#2b2b2b"; // icono oscuro cuando inactivo

  return (
    <Button
      kind="tertiary"
      size="sm"
      hasIconOnly
      renderIcon={CheckmarkOutline}
      iconDescription={done ? "Marcar como pendiente" : "Marcar como completada"}
      tooltipAlignment="start"
      onClick={disabled ? undefined : onToggle}
      disabled={disabled}
      style={{
        minWidth: "38px",
        minHeight: "38px",
        borderRadius: "50%",
        border: done ? `2px solid ${activeBorder}` : inactiveBorder,
        backgroundColor: done ? activeBg : inactiveBg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s",
        outline: "none",
        boxShadow: "none",
        color: done ? activeIconColor : inactiveIconColor,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (!disabled && !done) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f3f3f3";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !done) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = inactiveBg;
        }
      }}
    />
  );
}
