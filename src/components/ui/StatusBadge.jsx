export default function StatusBadge({ status }) {
  const variants = {
    active: "bg-green-100 text-green-800",
    completed: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    deleted: "bg-red-100 text-red-800",
    archived: "bg-gray-200 text-gray-700",
  };

  const labelMap = {
    active: "🟢 Активен",
    completed: "✅ Завершено",
    draft: "📝 Черновик",
    deleted: "🗑 Удалено",
    archived: "📦 Архив",
  };

  const classes = variants[status] || "bg-muted text-muted-foreground";
  const label = labelMap[status] || "Неизвестно";

  return (
    <span className={`text-xs px-2 py-0.5 rounded ${classes}`}>{label}</span>
  );
}
