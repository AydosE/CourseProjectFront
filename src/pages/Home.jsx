import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Home = () => {
  const [latest, setLatest] = useState([]);
  const [top, setTop] = useState([]);
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      const [latestRes, topRes, tagsRes] = await Promise.all([
        API.get("/templates?limit=6"),
        API.get("/templates/top"),
        API.get("/tags"),
      ]);
      setLatest(latestRes.data);
      setTop(topRes.data);
      setTags(tagsRes.data);
    };
    fetchHomeData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Новые шаблоны */}
      <h2 className="text-2xl font-bold mb-4">📦 Новые шаблоны</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {latest.map((tpl) => (
          <Link
            key={tpl.id}
            to={`/templates/${tpl.id}`}
            className="border rounded p-4 hover:shadow"
          >
            <h3 className="font-semibold text-lg">{tpl.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{tpl.description}</p>
          </Link>
        ))}
      </div>

      {/* Популярные шаблоны */}
      <h2 className="text-2xl font-bold mb-4">🔥 Топ-5 популярных</h2>
      <table className="w-full mb-10 border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">#</th>
            <th className="text-left p-2">Шаблон</th>
            <th className="text-left p-2">Прохождений</th>
          </tr>
        </thead>
        <tbody>
          {top.map((tpl, i) => (
            <tr key={tpl.id} className="border-t">
              <td className="p-2">{i + 1}</td>
              <td className="p-2">
                <Link
                  to={`/templates/${tpl.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {tpl.title}
                </Link>
              </td>
              <td className="p-2">{tpl.formCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Облако тегов */}
      <h2 className="text-2xl font-bold mb-4">🏷 Облако тегов</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded hover:bg-blue-200"
            onClick={() =>
              navigate(`/templates?tag=${encodeURIComponent(tag)}`)
            }
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
