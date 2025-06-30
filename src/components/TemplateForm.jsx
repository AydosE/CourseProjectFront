import { useState, useEffect } from "react";
import QuestionBuilder from "./QuestionBuilder";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TemplateForm({
  mode = "create",
  initialData = {},
  onSubmit,
}) {
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
      toast.error("Ни один тег не прошёл проверку");
    }

    if (invalidTags.length > 0) {
      toast.error(`Некорректные теги: ${invalidTags.join(", ")}`);
    }

    return validTags;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Название обязательно");
      return;
    }

    if (questions.length === 0) {
      toast.error("Добавьте хотя бы один вопрос");
      return;
    }

    const hasEmpty = questions.some((q) => !q.text.trim());
    if (hasEmpty) {
      toast.error("Все вопросы должны быть заполнены");
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
        {mode === "edit" ? "Редактирование шаблона" : "Создание шаблона"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">📝 Основная информация</h2>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Название шаблона"
            required
          />
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Описание"
          />
          <Input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Категория"
          />
          <Input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Ссылка на изображение"
          />
          <Input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Теги (через запятую, только буквы и цифры)"
          />
        </section>

        <hr className="my-4" />

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">📋 Вопросы</h2>
          <QuestionBuilder questions={questions} setQuestions={setQuestions} />
        </section>

        <div className="pt-4">
          <Button type="submit">
            {mode === "edit" ? "💾 Сохранить изменения" : "✅ Создать шаблон"}
          </Button>
        </div>
      </form>
    </div>
  );
}
