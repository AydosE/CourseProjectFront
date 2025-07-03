export default function EmptyState({ icon = "📭", title = "Пусто", message }) {
  return (
    <div className="text-center text-muted-foreground dark:text-gray-400 py-8 px-4">
      <div className="text-5xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground dark:text-white">
        {title}
      </h3>
      {message && (
        <p className="text-sm mt-1 text-muted-foreground dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  );
}
