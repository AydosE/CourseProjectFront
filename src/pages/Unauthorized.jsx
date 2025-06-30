import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-red-600">🚫 Доступ запрещён</h1>
      <p className="mt-4">У вас нет прав для просмотра этой страницы.</p>
      <Link to="/" className="text-blue-600 hover:underline mt-2 block">
        ⬅ Вернуться на главную
      </Link>
    </div>
  );
}
