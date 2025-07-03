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
  const { t } = useTranslation("Admin");
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const params = tag ? { tag } : {};
        const res = await API.get("/templates", { params });
        setTemplates(res.data);
      } catch (err) {
        console.error("Ошибка загрузки шаблонов", err);
        toast.error("Не удалось загрузить шаблоны");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {t("template_section_title")}
        {tag ? `(tag:${tag})` : ""}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <EmptyState
          icon="📭"
          title="Нет шаблонов"
          message="Попробуйте создать первый шаблон или обновите страницу позже"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      )}
    </div>
  );
}
