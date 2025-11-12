import { Modal, TextInput } from "@carbon/react";


type Props = Readonly<{
  id: number;
  title: string;
  description: string;
  setTitle: (val: string) => void;
  setDescription: (val: string) => void;
  onClose: () => void;
  onSave: () => void;
  loading?: boolean;
}>;

export default function EditModal({
  id,
  title,
  description,
  setTitle,
  setDescription,
  onClose,
  onSave,
  loading,
}: Props) {
  return (
    <Modal
      open
      modalHeading="Editar tarea"
      modalLabel="Edición"
      primaryButtonText={loading ? "Guardando..." : "Guardar"}
      secondaryButtonText="Cancelar"
      onRequestClose={onClose}
      onRequestSubmit={onSave}
      preventCloseOnClickOutside
      size="xs"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <TextInput
          id={`edit-title-${id}`}
          labelText="Título"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <TextInput
          id={`edit-desc-${id}`}
          labelText="Descripción"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </div>
    </Modal>
  );
}
