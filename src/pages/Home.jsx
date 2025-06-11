import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold mb-6">📝 Анкетирование</h1>
    <p className="text-lg text-gray-600 mb-4">
      Выберите шаблон и начните заполнение
    </p>
    <Link to="/form" className="px-4 py-2 bg-blue-500 text-white rounded">
      Заполнить анкету
    </Link>
  </div>
);

export default Home;
