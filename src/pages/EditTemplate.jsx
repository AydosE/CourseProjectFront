import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "sonner";
import TemplateForm from "../components/TemplateForm";
import SectionCard from "@/components/SelectionCard";
import FormPreview from "@/components/FormPreview";
import { Skeleton } from "@/components/ui/skeletons/skeleton";
import { useTranslation } from "react-i18next";

export default function EditTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("EditTemplate");

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await API.get(`/templates/${id}`);
        const { Questions, ...rest } = res.data;
        setTemplate({ ...rest, questions: Questions });
      } catch (err) {
        console.error("Ошибка при загрузке шаблона:", err);
        toast.error(t("load_error"));
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [id, t]);

  const handleSubmit = async (data) => {
    try {
      await API.put(`/templates/${id}`, { ...data, tags: data.tags });

      const enriched = data.questions.map((q, i) => ({
        ...q,
        templateId: id,
        order: i,
      }));

      await API.patch(`/templates/${id}/questions`, { questions: enriched });

      toast.success(t("save_success"));
      navigate("/profile");
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
      toast.error(t("save_error"));
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Skeleton className="h-6 w-2/3 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <SectionCard title={t("title_edit")}>
        <TemplateForm
          mode="edit"
          initialData={template}
          onSubmit={handleSubmit}
        />
      </SectionCard>

      <SectionCard title={t("title_preview")}>
        <FormPreview
          template={{ ...template, Questions: template.questions }}
        />
      </SectionCard>
    </div>
  );
}
