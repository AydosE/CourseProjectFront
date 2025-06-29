import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const navigateToUserPage = (id) => {
    navigate(`/users/${id}`);
  };
  useEffect(() => {
    API.get("/admin/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const toggleBlock = async (id) => {
    await API.put(`/admin/${id}/block`);
    refresh();
  };

  const toggleRole = async (id) => {
    await API.put(`/admin/${id}/toggle-admin`);
    refresh();
  };

  const removeUser = async (id) => {
    if (window.confirm("Удалить пользователя?")) {
      await API.delete(`/admin/${id}`);
      refresh();
    }
  };

  const refresh = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">👑 Панель администратора</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Имя</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Роль</th>
            <th className="p-2 border">Статус</th>
            <th className="p-2 border">Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.id}
              className="text-center  cursor-pointer"
              onClick={() => navigateToUserPage(u.id)}
            >
              <td className="p-2 border">{u.username}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">
                {u.is_blocked ? "🚫 Заблокирован" : "✅ Активен"}
              </td>
              <td className="p-2 border space-x-2 text-sm">
                <button
                  onClick={() => toggleBlock(u.id)}
                  className="text-yellow-600 hover:underline"
                >
                  {u.is_blocked ? "Разблок." : "Заблокир."}
                </button>
                <button
                  onClick={() => toggleRole(u.id)}
                  className="text-blue-600 hover:underline"
                >
                  {u.role === "admin" ? "Снять роль" : "Сделать админом"}
                </button>
                <button
                  onClick={() => removeUser(u.id)}
                  className="text-red-600 hover:underline"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <p className="text-gray-500 text-center mt-6">
          Нет пользователей для отображения
        </p>
      )}
    </div>
  );
}
