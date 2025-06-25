import { useEffect, useState } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";

const MyTemplates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    API.get("/users/me/templates").then((res) => {
      setTemplates(res.data);
    });
  }, []);

  return (
    <div className="space-y-4">
      {templates.map((tpl) => (
        <div key={tpl.id} className="border p-4 rounded shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">{tpl.title}</h2>
            <Link
              to={`/templates/${tpl.id}`}
              className="text-blue-600 text-sm hover:underline"
            >
              Посмотреть
            </Link>
          </div>
          <p className="text-gray-600 text-sm">{tpl.description}</p>
        </div>
      ))}
      {templates.length === 0 && (
        <p className="text-gray-500">У вас пока нет шаблонов.</p>
      )}
    </div>
  );
};

export default MyTemplates;
