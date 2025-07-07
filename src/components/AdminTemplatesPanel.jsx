import { useEffect, useState } from "react";
import API from "../api/axios";
import { useTranslation } from "react-i18next";
import TemplateCard from "@/components/TemplateCard";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminTemplatesPanel() {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("DESC");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("Admin");

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const res = await API.get("/templates", {
          params: {
            adminView: true,
            page,
            limit: 9,
            search,
            sortBy,
            order,
          },
        });
        setTemplates(res.data.templates);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        toast.error(t("template_fetch_error"));
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [page, search, sortBy, order]);

  return (
    <section className="space-y-5 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold text-foreground dark:text-white">
        {t("template_section_title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          placeholder={t("template_search")}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // сброс страницы при новом поиске
          }}
          aria-label="Search templates"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort templates"
          className="border px-3 py-2 rounded text-sm bg-background dark:bg-neutral-800 dark:text-white"
        >
          <option value="createdAt">{t("template_sort_date")}</option>
          <option value="title">{t("template_sort_title")}</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground dark:text-gray-400 mt-6">
          {t("loading")}
        </p>
      ) : templates.length === 0 ? (
        <p className="text-center text-muted-foreground dark:text-gray-400 mt-6">
          {t("template_empty")}
        </p>
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
    </section>
  );
}
