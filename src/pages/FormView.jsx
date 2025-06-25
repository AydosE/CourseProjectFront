import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const FormView = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await API.get(`/forms/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке формы", err);
      }
    };
    fetchForm();
  }, [id]);

  if (!form) return <p className="text-center">Загрузка ответа...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{form.Template.title}</h1>
      <p className="text-gray-700 mb-4">{form.Template.description}</p>
      <div className="space-y-4">
        {form.Answers.map((ans, i) => {
          const q = form.Template.Questions.find(
            (q) => q.id === ans.questionId
          );
          const value = (() => {
            if (q.type === "checkbox") {
              try {
                return JSON.parse(ans.value).join(", ");
              } catch {
                return ans.value;
              }
            }
            return ans.value;
          })();

          return (
            <div key={ans.id} className="border p-3 rounded">
              <p className="font-semibold">
                {i + 1}. {q.text}
              </p>
              <p className="text-sm text-gray-700 mt-1">Ответ: {value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormView;
