import { useEffect, useState } from "react";
import { toast } from "sonner";
import API from "../api/axios";
import TemplateCard from "@/components/TemplateCard";
import SkeletonCard from "@/components/ui/skeletons/skeleton-card";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");
  const { t } = useTranslation("Admin");

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const res = await API.get("/templates", {
          params: {
            page,
            limit: 9,
            tag,
            sortBy: "createdAt",
            order: "DESC",
          },
        });
        setTemplates(res.data.templates);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Ошибка загрузки шаблонов", err);
        toast.error("Не удалось загрузить шаблоны");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [page, tag]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        {t("template_section_title")}{" "}
        {tag && <span className="text-muted-foreground">(#{tag})</span>}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <EmptyState
          icon="📭"
          title="Нет шаблонов"
          message="Попробуйте изменить фильтры или создать первый шаблон"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <TemplateCard key={tpl.id} template={tpl} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-muted hover:bg-muted/80 disabled:opacity-50"
            >
              ← Назад
            </button>
            <span className="text-sm text-muted-foreground">
              Страница {page} из {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-muted hover:bg-muted/80 disabled:opacity-50"
            >
              Вперёд →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
