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
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("Admin");

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await API.get("/templates");
        setTemplates(res.data);
      } catch (err) {
        toast.error(t("template_fetch_error"));
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const filtered = templates
    .filter((tpl) => tpl.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <section className="space-y-5 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold text-foreground dark:text-white">
        {t("template_section_title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          placeholder={t("template_search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground dark:text-gray-400 mt-6">
          {t("template_empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      )}
    </section>
  );
}
