import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import QuestionBuilder from "../components/QuestionBuilder";

const CreateTemplate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    tags: "",
  });

  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questions.length === 0) {
      return alert("Добавьте хотя бы один вопрос!");
    }

    try {
      const res = await API.post("/templates", {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()),
        questions,
      });
      navigate(`/templates/${res.data.templateId}`);
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании шаблона");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Создание шаблона</h1>
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
          placeholder="Теги (через запятую)"
          className="w-full border px-3 py-2 rounded"
        />

        <hr className="my-4" />
        <QuestionBuilder questions={questions} setQuestions={setQuestions} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-6">
          ✅ Создать шаблон
        </button>
      </form>
    </div>
  );
};

export default CreateTemplate;
