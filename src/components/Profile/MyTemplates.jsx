import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const MyTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/me/templates").then((res) => {
      setTemplates(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить шаблон?")) return;
    try {
      await API.delete(`/templates/${id}`);
      setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
    } catch (err) {
      console.error("Ошибка удаления шаблона:", err);
      alert("Не удалось удалить шаблон");
    }
  };

  return (
    <div className="space-y-4">
      {templates.map((tpl) => (
        <div key={tpl.id} className="border p-4 rounded shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">{tpl.title}</h2>
            <Link
              to={`/templates/${tpl.id}`}
              className="text-blue-600 text-sm hover:underline"
            >
              Посмотреть
            </Link>
          </div>
          <p className="text-gray-600 text-sm">{tpl.description}</p>

          <div className="flex gap-4 mt-2 text-sm">
            <button
              onClick={() => navigate(`/edit-template/${tpl.id}`)}
              className="text-blue-500 hover:underline"
            >
              ✏️ Редактировать
            </button>
            <button
              onClick={() => handleDelete(tpl.id)}
              className="text-red-500 hover:underline"
            >
              🗑 Удалить
            </button>
          </div>
        </div>
      ))}

      {templates.length === 0 && (
        <p className="text-gray-500">У вас пока нет шаблонов.</p>
      )}
    </div>
  );
};

export default MyTemplates;
