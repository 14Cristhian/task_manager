import { Stack, Button } from "@carbon/react";
import { Edit, TrashCan } from "@carbon/icons-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
};

export default function TaskActions({ onEdit, onDelete, disabled = false }: Props) {
  return (
    <Stack gap={0.5} style={{ flexDirection: "row" }}>
      <Button kind="ghost" size="sm" renderIcon={Edit} iconDescription="Editar tarea" onClick={onEdit} disabled={disabled} />
      <Button kind="danger--ghost" size="sm" renderIcon={TrashCan} iconDescription="Eliminar tarea" onClick={onDelete} disabled={disabled} />
    </Stack>
  );
}
