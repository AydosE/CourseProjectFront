import { useState } from "react";
import { useTranslation } from "react-i18next";

const Results = () => {
  const { t } = useTranslation();
  const [answers] = useState({
    q1: "Иван Иванов",
    q2: "29",
    q3: "JavaScript",
  });

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold">{t("Ваши ответы")}</h2>
      {Object.entries(answers).map(([key, value]) => (
        <p key={key} className="text-gray-700">
          <strong>{t(`Вопрос ${key}`)}:</strong> {value}
        </p>
      ))}
    </div>
  );
};

export default Results;
