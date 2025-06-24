import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const TemplateView = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await API.get(`/templates/${id}`);
        setTemplate(res.data);
      } catch (err) {
        console.error("Ошибка загрузки шаблона", err);
      }
    };
    fetchTemplate();
  }, [id]);

  if (!template) return <p className="text-center">Загрузка шаблона...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{template.title}</h1>
      <p className="text-gray-700 mb-4">{template.description}</p>
      <ul className="space-y-2">
        {template.Questions?.map((q, i) => (
          <li key={q.id} className="border p-2 rounded">
            <strong>
              {i + 1}. {q.text}
            </strong>{" "}
            <span className="text-sm text-gray-500">({q.type})</span>
            {q.type === "checkbox" && (
              <ul className="pl-5 list-disc text-sm text-gray-600">
                {q.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateView;
