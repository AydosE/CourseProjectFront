import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { Button } from "@/components/ui/button";
import FormPreview from "@/components/FormPreview";
import SectionCard from "@/components/SelectionCard";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function TemplatePreview() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const { t } = useTranslation("TemplatePreview");

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await API.get(`/templates/${id}`);
        setTemplate(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке шаблона:", err);
        toast.error(t("load_error"));
      }
    };
    fetchTemplate();
  }, [id, t]);

  if (!template) {
    return <p className="text-center mt-10">{t("loading")}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <SectionCard title={t("title")}>
        <h2 className="text-xl font-bold mb-1">{template.title}</h2>
        {template.description && (
          <p className="text-muted-foreground mb-4">{template.description}</p>
        )}
        <FormPreview template={template} />
      </SectionCard>

      <div className="flex gap-2">
        <Link to={`/edit-template/${id}`}>
          <Button variant="outline">✏️ {t("edit_button")}</Button>
        </Link>
        <Link to="/profile">
          <Button variant="secondary">↩️ {t("back_button")}</Button>
        </Link>
      </div>
    </div>
  );
}
