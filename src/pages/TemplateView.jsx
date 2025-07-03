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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">{template.title}</h1>
        <p className="text-gray-700">{template.description}</p>
      </div>

      <ul className="space-y-2">
        {template.Questions?.map((q, i) => (
          <li key={q.id} className="border p-3 rounded">
            <div className="font-medium">
              {i + 1}. {q.text}{" "}
              <span className="text-sm text-gray-500 font-normal">
                ({q.type})
              </span>
            </div>
            {q.type === "checkbox" && (
              <ul className="pl-5 list-disc text-sm text-gray-600 mt-1">
                {q.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {isAuth && (
        <>
          <Link
            to={`/templates/${template.id}/fill`}
            className="inline-block text-blue-600 hover:underline"
          >
            {t("fill_button")}
          </Link>

          {(user?.id === template.userId || user?.role === "admin") && (
            <button
              onClick={handleDeleteTemplate}
              className="block text-red-600 hover:underline text-sm mt-4"
            >
              {t("delete_button")}
            </button>
          )}

          {(user?.id === template.userId || user?.role === "admin") && (
            <Link
              to={`/edit-template/${template.id}`}
              className="block text-green-600 hover:underline text-sm mt-2"
            >
              {t("edit_button")}
            </Link>
          )}
        </>
      )}
    </div>
  );
}
