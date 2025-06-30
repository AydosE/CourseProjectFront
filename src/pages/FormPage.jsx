import { useState } from "react";
import { templates } from "../mock/templates";
import { useTranslation } from "react-i18next";
import QuestionField from "@/components/ui/QuestionField";
import { toast } from "sonner";

export default function FormPage() {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const template = templates[0];

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(answers).length === 0) {
      toast.error("Пожалуйста, заполните хотя бы один ответ");
      return;
    }

    // Для мок-примеров можно просто отобразить в консоли
    console.log("Ответы:", answers);
    toast.success("Форма отправлена");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">{t(template.title)}</h2>
        <p className="text-gray-500">{t(template.description)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {template.questions.map((q) => (
          <QuestionField key={q.id} question={q} onChange={handleChange} />
        ))}

        <button
          disabled={submitting}
          className={`w-full bg-blue-600 text-white py-2 rounded ${
            submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {submitting ? "⏳ Отправка..." : t("submit") || "Отправить"}
        </button>
      </form>
    </div>
  );
}
