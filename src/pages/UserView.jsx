// /users/:id
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import TemplateCard from "../components/TemplateCard";

export default function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, templatesRes, formsRes] = await Promise.all([
          API.get(`/users/${id}/datas`),
          API.get(`/users/${id}/templates`),
          API.get(`/users/${id}/forms`),
        ]);
        setUser(userRes.data);
        setTemplates(templatesRes.data);
        setForms(formsRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setUser({ notFound: true });
      }
    };
    fetchData();
  }, [id]);

  if (user?.notFound) return <div>❌ Пользователь не найден</div>;
  if (!user) return <div>Загрузка...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">👤 {user.username}</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">📁 Шаблоны</h2>
      {templates.length === 0 ? (
        <p className="text-gray-500">Нет шаблонов</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {templates.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">📝 Ответы</h2>
      {forms.length === 0 ? (
        <p className="text-gray-500">Нет форм</p>
      ) : (
        <ul className="space-y-2">
          {forms.map((form) => (
            <li key={form.id}>
              <Link
                to={`/forms/${form.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                📄 Ответ на: {form.Template?.title || "Удаленный шаблон"}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
