import { useState } from "react";
import { templates } from "../mock/templates";
import { useTranslation } from "react-i18next";
import QuestionField from "@/components/ui/QuestionField";
import { toast } from "sonner";

export default function FormPage() {
  const { t } = useTranslation("FormPage");
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const template = templates[0];

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(answers).length === 0) {
      toast.error(t("FormPage:fill_required"));
      return;
    }

    toast.success(t("FormPage:submitted"));
  };

  return (
    <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-background dark:bg-neutral-900 rounded-lg shadow space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">
          {t(template.title)}
        </h2>
        <p className="text-muted-foreground dark:text-gray-400 text-sm">
          {t(template.description)}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {template.questions.map((q) => (
          <QuestionField key={q.id} question={q} onChange={handleChange} />
        ))}

        <button
          disabled={submitting}
          className={`w-full bg-blue-600 text-white py-2 rounded transition ${
            submitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {submitting ? t("FormPage:submitting") : t("FormPage:submit")}
        </button>
      </form>
    </section>
  );
}
