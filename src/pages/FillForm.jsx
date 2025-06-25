import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const FillForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchTemplate = async () => {
      const res = await API.get(`/templates/${id}`);
      setTemplate(res.data);
    };
    fetchTemplate();
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleCheckbox = (questionId, option) => {
    const prev = answers[questionId] || [];
    const updated = prev.includes(option)
      ? prev.filter((o) => o !== option)
      : [...prev, option];
    setAnswers({ ...answers, [questionId]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!template || !template.Questions || template.Questions.length === 0) {
      alert("Форма повреждена или не содержит вопросов");
      return;
    }

    const answerList = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value: Array.isArray(value) ? JSON.stringify(value) : String(value),
    }));

    if (answerList.length === 0) {
      alert("Вы не ответили ни на один вопрос");
      return;
    }

    const payload = {
      templateId: template.id,
      answers: answerList,
    };

    try {
      const res = await API.post("/forms", payload);
      navigate(`/forms/${res.data.formId}`);
    } catch (err) {
      console.error("Ошибка при отправке формы:", err);
      alert(
        err.response?.data?.message ||
          "Ошибка при отправке формы. Попробуйте позже."
      );
    }
  };

  if (!template) return <p className="text-center">Загрузка шаблона...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {template.Questions.map((q) => (
          <div key={q.id}>
            <label className="block font-medium mb-1">{q.text}</label>
            {q.type === "text" && (
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}
            {q.type === "textarea" && (
              <textarea
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}
            {q.type === "number" && (
              <input
                type="number"
                min="0"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}
            {q.type === "checkbox" && (
              <div className="space-y-1">
                {q.options.map((opt, i) => (
                  <label key={i} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckbox(q.id, opt)}
                      checked={(answers[q.id] || []).includes(opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          ✅ Отправить
        </button>
      </form>
    </div>
  );
};

export default FillForm;
