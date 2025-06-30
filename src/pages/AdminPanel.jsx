import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "sonner";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Ошибка загрузки пользователей:", err);
      toast.error("Не удалось получить список пользователей");
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = async (id) => {
    try {
      await API.put(`/admin/${id}/block`);
      toast.success("Статус блокировки обновлён");
      fetchUsers();
    } catch {
      toast.error("Не удалось изменить статус");
    }
  };

  const toggleRole = async (id) => {
    try {
      await API.put(`/admin/${id}/toggle-admin`);
      toast.success("Роль успешно обновлена");
      fetchUsers();
    } catch {
      toast.error("Ошибка при изменении роли");
    }
  };

  const removeUser = async (id) => {
    const confirmed = window.confirm("Удалить пользователя?");
    if (!confirmed) return;
    try {
      await API.delete(`/admin/${id}`);
      toast.success("Пользователь удалён");
      fetchUsers();
    } catch {
      toast.error("Не удалось удалить пользователя");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">👑 Панель администратора</h1>

      {loading ? (
        <p className="text-center text-muted-foreground mt-10">Загрузка...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Нет пользователей для отображения
        </p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
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
                className="text-center hover:bg-gray-50 transition"
                onClick={() => navigate(`/users/${u.id}`)}
              >
                <td className="p-2 border">
                  <Link
                    to={`/users/${u.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {u.username}
                  </Link>
                </td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border">
                  {u.is_blocked ? "🚫 Заблокирован" : "✅ Активен"}
                </td>
                <td className="p-2 border space-x-2">
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
      )}
    </div>
  );
}
