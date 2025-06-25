import { useEffect, useState } from "react";
import API from "../../api/axios";

const MyForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    API.get("/users/me/forms").then((res) => setForms(res.data));
  }, []);

  return (
    <div className="space-y-6">
      {forms.map((form) => (
        <div key={form.id} className="border p-4 rounded">
          <h3 className="font-medium text-lg">{form.Template?.title}</h3>
          <ul className="mt-2 list-disc pl-4 text-sm text-gray-700">
            {form.Answers.map((a, i) => (
              <li key={a.id}>
                Ответ {i + 1}: {a.value}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {forms.length === 0 && (
        <p className="text-gray-500">Вы ещё не заполняли формы.</p>
      )}
    </div>
  );
};

export default MyForms;
