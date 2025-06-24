import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await API.get("/templates");
        setTemplates(res.data);
      } catch (err) {
        console.error("Ошибка загрузки шаблонов", err);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Все шаблоны</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((tpl) => (
          <Link
            to={`/templates/${tpl.id}`}
            key={tpl.id}
            className="border rounded p-4 hover:shadow transition"
          >
            <h2 className="text-lg font-semibold">{tpl.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {tpl.description}
            </p>
            <div className="text-xs text-gray-500 mt-2">
              Автор: {tpl.User?.username || "неизвестен"}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {tpl.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Templates;
