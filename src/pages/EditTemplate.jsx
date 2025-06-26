import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionBuilder from "../components/QuestionBuilder";
import API from "../api/axios";

export const EditTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/templates/${id}`).then((res) => {
      setTemplate(res.data);
      setQuestions(res.data.Questions || []);
      setLoading(false);
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      await API.put(`/templates/${id}`, {
        title: template.title,
        description: template.description,
        category: template.category,
        tags: template.tags,
        imageUrl: template.imageUrl,
      });

      // 🔁 Сохраняем новые
      const enriched = questions.map((q, i) => ({
        ...q,
        templateId: id,
        order: i,
      }));

      await API.patch(`/templates/${id}/questions`, {
        questions: enriched,
      });

      alert("Шаблон обновлён!");
      navigate("/profile");
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
      alert("Не удалось сохранить");
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Редактирование шаблона</h1>

      <input
        value={template.title}
        onChange={(e) => setTemplate({ ...template, title: e.target.value })}
        placeholder="Название"
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <textarea
        value={template.description}
        onChange={(e) =>
          setTemplate({ ...template, description: e.target.value })
        }
        placeholder="Описание"
        className="w-full border px-3 py-2 rounded mb-2"
      />

      <QuestionBuilder questions={questions} setQuestions={setQuestions} />

      <button
        onClick={handleUpdate}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        💾 Сохранить изменения
      </button>
    </div>
  );
};
