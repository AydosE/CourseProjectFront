import { useState } from "react";
import { templates } from "../mock/templates"; // Мок-данные
import { useTranslation } from "react-i18next";

const FormPage = () => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState({});
  const template = templates[0]; // Выбираем первый шаблон (в будущем можно менять)

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold">{t(template.title)}</h2>
      <p className="text-gray-500">{t(template.description)}</p>

      {template.questions.map((q) => (
        <div key={q.id} className="mb-4">
          <label className="block font-medium text-gray-700">{t(q.text)}</label>
          {q.type === "text" || q.type === "number" ? (
            <input
              type={q.type}
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm p-2 focus:ring focus:ring-blue-300"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          ) : (
            <select
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm p-2"
              onChange={(e) => handleChange(q.id, e.target.value)}
            >
              {q.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          )}
        </div>
      ))}

      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        {t("submit")}
      </button>
    </div>
  );
};

export default FormPage;
