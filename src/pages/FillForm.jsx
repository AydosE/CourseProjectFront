import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/axios";
import { toast } from "sonner";
import FormSkeleton from "@/components/ui/skeletons/FormSkeleton";

export default function FillForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation("FillForm");

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
        toast.error(t("load_error"));
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, t]);

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
      toast.error(t("template_corrupt"));
      return;
    }

    const answerList = Object.entries(answers).map(([questionId, value]) => ({
      questionId,
      value: Array.isArray(value) ? JSON.stringify(value) : String(value),
    }));

    if (answerList.length === 0) {
      toast.error(t("no_answers"));
      return;
    }

    const payload = {
      templateId: template.id,
      answers: answerList,
    };

    try {
      setSubmitting(true);
      const res = await API.post("/forms", payload);
      toast.success(t("submit_success"));
      navigate(`/forms/${res.data.formId}`);
    } catch (err) {
      console.error("Ошибка при отправке формы:", err);
      const message = err.response?.data?.message || t("submit_error");
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <FormSkeleton />;

  if (!template) {
    return <p className="text-center text-red-500 mt-20">{t("not_found")}</p>;
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 bg-background dark:bg-neutral-900 rounded-lg shadow">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">
        {template.title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {template.Questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <label className="block font-medium text-foreground dark:text-white">
              {q.text}
            </label>

            {q.type === "text" && (
              <input
                type="text"
                className="w-full px-3 py-2 rounded border bg-background dark:bg-neutral-800 dark:text-white dark:border-gray-700"
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}

            {q.type === "textarea" && (
              <textarea
                className="w-full px-3 py-2 rounded border bg-background dark:bg-neutral-800 dark:text-white dark:border-gray-700"
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}

            {q.type === "number" && (
              <input
                type="number"
                min="0"
                className="w-full px-3 py-2 rounded border bg-background dark:bg-neutral-800 dark:text-white dark:border-gray-700"
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}

            {q.type === "checkbox" && (
              <div className="space-y-1">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 text-foreground dark:text-white"
                  >
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
          className={`bg-blue-600 text-white px-4 py-2 rounded transition ${
            submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {submitting ? t("submit_loading") : t("submit_button")}
        </button>
      </form>
    </section>
  );
}
