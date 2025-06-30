export default function EmptyState({ icon = "📭", title = "Пусто", message }) {
  return (
    <div className="text-center text-muted-foreground py-8">
      <div className="text-5xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="text-sm mt-1">{message}</p>}
    </div>
  );
}
