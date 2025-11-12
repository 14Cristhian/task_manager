import { Modal } from "@carbon/react";
import { WarningAlt } from "@carbon/icons-react";

type Props = Readonly<{
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}>;

export default function DeleteModal({ onClose, onConfirm, loading }: Props) {
  return (
    <Modal
      open
      modalHeading="Confirmar eliminación"
      modalLabel="Eliminar tarea"
      primaryButtonText={loading ? "Eliminando..." : "Eliminar"}
      secondaryButtonText="Cancelar"
      onRequestClose={onClose}
      onRequestSubmit={onConfirm}
      danger
      preventCloseOnClickOutside
      size="xs"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <WarningAlt style={{ color: "#d32f2f", fontSize: 20 }} />
        <p style={{ margin: 0 }}>¿Estás seguro que deseas eliminar esta tarea?</p>
      </div>
    </Modal>
  );
}
