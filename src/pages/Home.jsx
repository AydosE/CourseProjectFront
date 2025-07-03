import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import SkeletonCard from "@/components/ui/skeletons/skeleton-card";
import EmptyState from "@/components/ui/EmptyState";
import SectionCard from "@/components/SelectionCard";

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
        console.error("Home fetch error:", err);
        toast.error(t("load_error"));
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [t]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-8 py-6 space-y-12">
      <SectionCard title={t("newTemplates.title")}>
        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((tpl) => (
              <Link
                key={tpl.id}
                to={`/templates/${tpl.id}`}
                className="border rounded-xl p-4 bg-background dark:bg-neutral-900 transition hover:shadow-sm"
              >
                <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-1">
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
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded bg-background dark:bg-neutral-900">
              <thead>
                <tr className="bg-muted text-muted-foreground">
                  <th className="text-left px-4 py-2">#</th>
                  <th className="text-left px-4 py-2">
                    {t("popularTemplates.templates")}
                  </th>
                  <th className="text-left px-4 py-2">
                    {t("popularTemplates.passedTimes")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {top.map((tpl, i) => (
                  <tr
                    key={tpl.id}
                    className="border-t hover:bg-muted/50 dark:hover:bg-neutral-800 transition"
                    onClick={() => navigate(`/templates/${tpl.id}`)}
                  >
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2 text-primary">{tpl.title}</td>
                    <td className="px-4 py-2">{tpl.formCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                className="px-4 py-1 text-sm bg-muted dark:bg-neutral-800 text-foreground rounded-full hover:bg-muted/70 dark:hover:bg-neutral-700 transition"
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
