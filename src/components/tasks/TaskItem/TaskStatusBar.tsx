type Props = { done: boolean };

export default function TaskStatusBar({ done }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "6px",
        borderRadius: "4px 0 0 4px",
        backgroundColor: done ? "var(--cds-tag-background-green)" : "#f1c21b",
      }}
    />
  );
}
