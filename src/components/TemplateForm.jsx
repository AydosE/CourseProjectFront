import { useState, useEffect } from "react";
import QuestionBuilder from "./QuestionBuilder";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function TemplateForm({
  mode = "create",
  initialData = {},
  onSubmit,
}) {
  const { t } = useTranslation("TemplateForm");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    tags: "",
    ...initialData,
  });

  const [questions, setQuestions] = useState(initialData.questions || []);

  useEffect(() => {
    if (Array.isArray(initialData.tags)) {
      setForm((prev) => ({
        ...prev,
        tags: initialData.tags.join(", "),
      }));
    }
  }, [initialData.tags]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value : "",
    }));
  };

  const normalizeTags = (raw) => {
    const rawTags = String(raw)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const validTags = rawTags.filter((t) => /^[a-zA-Z0-9]+$/.test(t));
    const invalidTags = rawTags.filter((t) => !validTags.includes(t));

    if (raw && validTags.length === 0) {
      toast.error(t("tags_invalid_all"));
    }

    if (invalidTags.length > 0) {
      toast.error(t("tags_invalid_some", { tags: invalidTags.join(", ") }));
    }

    return validTags;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error(t("title_required"));
      return;
    }

    if (questions.length === 0) {
      toast.error(t("questions_required"));
      return;
    }

    if (questions.some((q) => !q.text.trim())) {
      toast.error(t("question_empty_error"));
      return;
    }

    const tags = normalizeTags(form.tags);
    if (form.tags && tags.length === 0) return;

    const payload = {
      ...form,
      tags,
      questions,
    };

    onSubmit(payload);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-background rounded-md shadow">
      <h1 className="text-2xl font-bold mb-6">
        {mode === "edit" ? t("edit_title") : t("create_title")}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">{t("section_info")}</h2>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder={t("placeholder_title")}
            required
          />
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder={t("placeholder_description")}
          />
          <Input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder={t("placeholder_category")}
          />
          <Input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder={t("placeholder_image")}
          />
          <Input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder={t("placeholder_tags")}
          />
        </section>

        <hr className="my-4" />

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">{t("section_questions")}</h2>
          <QuestionBuilder questions={questions} setQuestions={setQuestions} />
        </section>

        <div className="pt-4">
          <Button type="submit">
            {mode === "edit" ? t("button_save") : t("button_create")}
          </Button>
        </div>
      </form>
    </div>
  );
}
