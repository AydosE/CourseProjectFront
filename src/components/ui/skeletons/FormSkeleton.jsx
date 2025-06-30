export default function FormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-2/3" /> {/* Заголовок */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-1/2 bg-gray-200 rounded" /> {/* Вопрос */}
          <div className="h-10 bg-gray-100 rounded" /> {/* Инпут */}
        </div>
      ))}
      <div className="h-10 bg-blue-200 rounded w-32" /> {/* Кнопка */}
    </div>
  );
}
