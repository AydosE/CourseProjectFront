import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../api/axios";
import TemplateCard from "../components/TemplateCard";
import SectionCard from "@/components/SelectionCard";
import FormCard from "@/components/FormCard";
import EmptyState from "@/components/ui/EmptyState";

export default function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);
  const { t } = useTranslation("UserView");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, templatesRes, formsRes] = await Promise.all([
          API.get(`/users/${id}/datas`),
          API.get(`/users/${id}/templates`),
          API.get(`/users/${id}/forms`),
        ]);
        setUser(userRes.data);
        setTemplates(templatesRes.data);
        setForms(formsRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setUser({ notFound: true });
      }
    };
    fetchData();
  }, [id]);

  if (user?.notFound)
    return <div className="text-center mt-10">{t("not_found")}</div>;

  if (!user) return <div className="text-center mt-10">{t("loading")}</div>;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">
        {user.username}
      </h1>

      <SectionCard title={t("templates_section")}>
        {templates.length === 0 ? (
          <p className="text-muted-foreground dark:text-gray-400">
            {t("no_templates")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {templates.map((tpl) => (
              <TemplateCard key={tpl.id} template={tpl} />
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title={t("forms_section")}>
        {forms.length === 0 ? (
          <EmptyState
            icon="🗒️"
            title={t("no_forms_title")}
            message={t("no_forms_message")}
          />
        ) : (
          <div className="space-y-3">
            {forms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        )}
      </SectionCard>
    </section>
  );
}
