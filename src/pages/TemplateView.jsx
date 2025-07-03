import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import SkeletonCard from "@/components/ui/skeletons/skeleton-card";

export default function TemplateView() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation("TemplateView");

  const handleDeleteTemplate = async () => {
    const confirmed = window.confirm(t("confirm_delete"));
    if (!confirmed) return;
    try {
      await API.delete(`/templates/${id}`);
      toast.success(t("delete_success"));
      navigate(
        user?.role === "admin" ? `/users/${template.userId}` : "/profile"
      );
    } catch (err) {
      console.error("Ошибка удаления шаблона:", err);
      toast.error(t("delete_error"));
    }
  };

  useEffect(() => {
    API.get(`/templates/${id}`)
      .then((res) => setTemplate(res.data))
      .catch((err) => {
        console.error("Ошибка загрузки шаблона", err);
        toast.error(t("load_error"));
      })
      .finally(() => setLoading(false));
  }, [id, t]);

  if (loading) return <SkeletonCard className="max-w-2xl mx-auto p-6" />;

  if (!template)
    return <p className="text-center text-red-500 mt-10">{t("not_found")}</p>;

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 bg-background dark:bg-neutral-900 rounded-lg shadow">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-2">
          {template.title}
        </h1>
        <p className="text-muted-foreground dark:text-gray-400">
          {template.description}
        </p>
      </header>

      <ul className="space-y-3">
        {template.Questions?.map((q, i) => (
          <li
            key={q.id}
            className="border rounded-md p-4 bg-muted/50 dark:bg-neutral-800 dark:border-gray-700"
          >
            <div className="font-medium text-foreground dark:text-white">
              {i + 1}. {q.text}
              <span className="text-sm text-muted-foreground dark:text-gray-400 font-normal ml-2">
                ({q.type})
              </span>
            </div>
            {q.type === "checkbox" && (
              <ul className="pl-5 list-disc mt-1 text-sm text-muted-foreground dark:text-gray-400">
                {q.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {isAuth && (
        <div className="space-y-2">
          <Link
            to={`/templates/${template.id}/fill`}
            className="inline-block text-blue-600 hover:underline"
          >
            {t("fill_button")}
          </Link>

          {(user?.id === template.userId || user?.role === "admin") && (
            <>
              <button
                onClick={handleDeleteTemplate}
                className="block text-red-600 hover:underline text-sm"
              >
                {t("delete_button")}
              </button>
              <Link
                to={`/edit-template/${template.id}`}
                className="block text-green-600 hover:underline text-sm"
              >
                {t("edit_button")}
              </Link>
            </>
          )}
        </div>
      )}
    </section>
  );
}
