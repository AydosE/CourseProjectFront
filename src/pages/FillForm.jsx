import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "sonner";
import FormSkeleton from "@/components/ui/skeletons/FormSkeleton";

export default function FillForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await API.get(`/templates/${id}`);
        setTemplate(res.data);
      } catch (err) {
        console.error("Ошибка загрузки шаблона:", err);
        toast.error("Не удалось загрузить шаблон");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckbox = (questionId, option) => {
    const prev = answers[questionId] || [];
    const updated = prev.includes(option)
      ? prev.filter((o) => o !== option)
      : [...prev, option];
    setAnswers((prev) => ({ ...prev, [questionId]: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!template?.Questions?.length) {
      toast.error("Форма повреждена или не содержит вопросов");
      return;
    }

    const answerList = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value: Array.isArray(value) ? JSON.stringify(value) : String(value),
    }));

    if (answerList.length === 0) {
      toast.error("Вы не ответили ни на один вопрос");
      return;
    }

    const payload = {
      templateId: template.id,
      answers: answerList,
    };

    try {
      setSubmitting(true);
      const res = await API.post("/forms", payload);
      toast.success("Ответ успешно отправлен");
      navigate(`/forms/${res.data.formId}`);
    } catch (err) {
      console.error("Ошибка при отправке формы:", err);
      toast.error(
        err.response?.data?.message || "Ошибка при отправке. Попробуйте позже."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <FormSkeleton />;

  if (!template) {
    return <p className="text-center text-red-500 mt-20">Шаблон не найден</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h1 className="text-2xl font-bold">{template.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button
          disabled={submitting}
          className={`bg-blue-600 text-white px-4 py-2 rounded ${
            submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {submitting ? "⏳ Отправка..." : "✅ Отправить"}
        </button>
      </form>
    </div>
  );
}
