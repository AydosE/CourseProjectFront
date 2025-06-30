import { useState, useEffect } from "react";
import QuestionBuilder from "./QuestionBuilder";

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
    const str = Array.isArray(raw) ? raw.join(",") : raw;

    const rawTags = str
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const validTags = rawTags.filter((t) => /^[a-zA-Z0-9]+$/.test(t));
    const invalidTags = rawTags.filter((t) => !validTags.includes(t));

    if (raw && validTags.length === 0) {
      alert("Ни один тег не прошёл проверку. Допустимы только буквы и цифры.");
    }

    if (invalidTags.length > 0) {
      alert(`Некорректные теги: ${invalidTags.join(", ")}`);
    }

    return validTags;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return alert("Название обязательно");
    if (questions.length === 0) return alert("Добавьте хотя бы один вопрос");

    const hasEmpty = questions.some((q) => !q.text.trim());
    if (hasEmpty) return alert("Все вопросы должны быть заполнены");

    const tags = normalizeTags(form.tags);
    if (form.tags && tags.length === 0) {
      return alert("Допустимы только теги из букв и цифр без пробелов");
    }

    const payload = {
      ...form,
      tags,
      questions,
    };

    onSubmit(payload);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "edit" ? "Редактирование шаблона" : "Создание шаблона"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Название"
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Описание"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Категория"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Изображение (URL)"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Теги (через запятую, только буквы и цифры)"
          className="w-full border px-3 py-2 rounded"
        />

        <hr className="my-4" />
        <QuestionBuilder questions={questions} setQuestions={setQuestions} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-6">
          {mode === "edit" ? "💾 Сохранить изменения" : "✅ Создать шаблон"}
        </button>
      </form>
    </div>
  );
}
