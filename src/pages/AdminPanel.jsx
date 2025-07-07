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
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const { t } = useTranslation("Admin");

  useEffect(() => {
    fetchUsers();
  }, [search, sortBy, order, page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/users", {
        params: {
          page,
          limit: 10,
          search,
          sortBy,
          order,
        },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
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

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">
        {t("title")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          placeholder={t("search_placeholder")}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          aria-label="Search users"
        />
        <select
          className="border px-3 py-2 rounded bg-background text-sm dark:bg-neutral-800 dark:text-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort users"
        >
          <option value="username">{t("sort_name")}</option>
          <option value="role">{t("sort_role")}</option>
        </select>
        <select
          className="border px-3 py-2 rounded bg-background text-sm dark:bg-neutral-800 dark:text-white"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          aria-label="Order"
        >
          <option value="asc">{t("asc")}</option>
          <option value="desc">{t("desc")}</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground dark:text-gray-400 mt-10">
          {t("loading")}
        </p>
      ) : users.length === 0 ? (
        <p className="text-center text-muted-foreground dark:text-gray-400 mt-10">
          {t("no_users")}
        </p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-border rounded bg-background dark:bg-neutral-900">
              <thead>
                <tr className="bg-muted dark:bg-neutral-800 text-muted-foreground dark:text-gray-300">
                  <th className="p-3 border-b">{t("th_name")}</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">{t("th_role")}</th>
                  <th className="p-3 border-b">{t("th_status")}</th>
                  <th className="p-3 border-b">{t("th_actions")}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="text-center hover:bg-muted/50 dark:hover:bg-neutral-800 transition cursor-pointer"
                    onClick={() => navigate(`/users/${u.id}`)}
                  >
                    <td className="p-3 border-b">
                      <Link
                        to={`/users/${u.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {u.username}
                      </Link>
                    </td>
                    <td className="p-3 border-b">{u.email}</td>
                    <td className="p-3 border-b">{u.role}</td>
                    <td className="p-3 border-b">
                      {u.is_blocked ? t("blocked") : t("active")}
                    </td>
                    <td className="p-3 border-b space-x-2">
                      <button
                        onClick={(e) => toggleBlock(u.id, e)}
                        className="text-yellow-600 hover:underline transition"
                      >
                        {u.is_blocked ? t("unblock") : t("block")}
                      </button>
                      <button
                        onClick={(e) => toggleRole(u.id, e)}
                        className="text-blue-600 hover:underline transition"
                      >
                        {u.role === "admin" ? t("demote") : t("promote")}
                      </button>
                      <button
                        onClick={(e) => removeUser(u.id, e)}
                        className="text-red-600 hover:underline transition"
                      >
                        {t("delete")}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-muted hover:bg-muted/80 disabled:opacity-50"
            >
              ← {t("prev")}
            </button>
            <span className="text-sm text-muted-foreground">
              {t("page")} {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-muted hover:bg-muted/80 disabled:opacity-50"
            >
              {t("next")} →
            </button>
          </div>
        </>
      )}

      <div className="space-y-8 mt-10">
        <AdminTemplatesPanel />
      </div>
    </section>
  );
}
