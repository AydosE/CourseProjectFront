import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "sonner";

import SkeletonCard from "@/components/ui/skeletons/skeleton-card";
import EmptyState from "@/components/ui/EmptyState";
import SectionCard from "@/components/SelectionCard";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [latest, setLatest] = useState([]);
  const [top, setTop] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("Home");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [latestRes, topRes, tagsRes] = await Promise.all([
          API.get("/templates?limit=6"),
          API.get("/templates/top"),
          API.get("/tags"),
        ]);
        setLatest(latestRes.data);
        setTop(topRes.data);
        setTags(tagsRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке:", err);
        toast.error("Не удалось загрузить данные для главной страницы");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* 📦 Новые шаблоны */}
      <SectionCard title={t("newTemplates.title")}>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : latest.length === 0 ? (
          <EmptyState
            icon="📭"
            title={t("newTemplates.noTemplates")}
            message={t("newTemplates.message")}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latest.map((tpl) => (
              <Link
                key={tpl.id}
                to={`/templates/${tpl.id}`}
                className="border rounded p-4 hover:shadow transition bg-background"
              >
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                  {tpl.title}
                </h3>
                {tpl.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {tpl.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title={t("popularTemplates.title")}>
        {loading ? (
          <SkeletonCard className="h-32" />
        ) : top.length === 0 ? (
          <EmptyState
            icon="📉"
            title={t("popularTemplates.noTemplates")}
            message={t("popularTemplates.message")}
          />
        ) : (
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="text-left p-2">#</th>
                <th className="text-left p-2">
                  {t("popularTemplates.templates")}
                </th>
                <th className="text-left p-2">
                  {t("popularTemplates.passedTimes")}
                </th>
              </tr>
            </thead>
            <tbody>
              {top.map((tpl, i) => (
                <tr key={tpl.id} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">
                    <Link
                      to={`/templates/${tpl.id}`}
                      className="text-primary hover:underline"
                    >
                      {tpl.title}
                    </Link>
                  </td>
                  <td className="p-2">{tpl.formCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>

      <SectionCard title={t("tags.title")}>
        {loading ? (
          <SkeletonCard className="h-20" />
        ) : tags.length === 0 ? (
          <EmptyState
            icon="📪"
            title={t("tags.noTags")}
            message={t("tags.message")}
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded hover:bg-blue-200 transition"
                onClick={() =>
                  navigate(`/templates?tag=${encodeURIComponent(tag)}`)
                }
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
