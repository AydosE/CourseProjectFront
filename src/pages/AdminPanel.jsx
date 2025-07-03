import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import AdminTemplatesPanel from "@/components/AdminTemplatesPanel";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("username");

  const navigate = useNavigate();
  const { t } = useTranslation("Admin");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Ошибка загрузки пользователей:", err);
      toast.error(t("fetch_error"));
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = async (id, e) => {
    e.stopPropagation();
    try {
      await API.put(`/admin/${id}/block`);
      toast.success(t("block_success"));
      fetchUsers();
    } catch {
      toast.error(t("block_error"));
    }
  };

  const toggleRole = async (id, e) => {
    e.stopPropagation();
    try {
      await API.put(`/admin/${id}/toggle-admin`);
      toast.success(t("role_success"));
      fetchUsers();
    } catch {
      toast.error(t("role_error"));
    }
  };

  const removeUser = async (id, e) => {
    e.stopPropagation();
    const confirmed = window.confirm(t("confirm_delete"));
    if (!confirmed) return;
    try {
      await API.delete(`/admin/${id}`);
      toast.success(t("delete_success"));
      fetchUsers();
    } catch {
      toast.error(t("delete_error"));
    }
  };

  const filtered = users
    .filter(
      (u) =>
        u.username.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "role") return a.role.localeCompare(b.role);
      return a.username.localeCompare(b.username);
    });

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder={t("search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-2 py-1 text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="username">{t("sort_name")}</option>
          <option value="role">{t("sort_role")}</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground mt-10">
          {t("loading")}
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">{t("no_users")}</p>
      ) : (
        <table className="w-full table-auto border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">{t("th_name")}</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">{t("th_role")}</th>
              <th className="p-2 border">{t("th_status")}</th>
              <th className="p-2 border">{t("th_actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
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
                  {u.is_blocked ? t("blocked") : t("active")}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={(e) => toggleBlock(u.id, e)}
                    className="text-yellow-600 hover:underline"
                  >
                    {u.is_blocked ? t("unblock") : t("block")}
                  </button>
                  <button
                    onClick={(e) => toggleRole(u.id, e)}
                    className="text-blue-600 hover:underline"
                  >
                    {u.role === "admin" ? t("demote") : t("promote")}
                  </button>
                  <button
                    onClick={(e) => removeUser(u.id, e)}
                    className="text-red-600 hover:underline"
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="space-y-8 mt-10">
        <AdminTemplatesPanel />
      </div>
    </div>
  );
}
