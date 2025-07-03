import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import API from "../api/axios";
import TemplateForm from "../components/TemplateForm";
import SectionCard from "@/components/SelectionCard";
import { useTranslation } from "react-i18next";

export default function CreateTemplate() {
  const navigate = useNavigate();
  const { t } = useTranslation("CreateTemplate");

  const handleSubmit = async (data) => {
    try {
      const res = await API.post("/templates", data);
      toast.success(t("success"));
      navigate(`/templates/${res.data.templateId}`);
    } catch (err) {
      console.error("Ошибка при создании шаблона:", err);
      toast.error(t("error"));
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SectionCard title={t("title")}>
        <TemplateForm mode="create" onSubmit={handleSubmit} />
      </SectionCard>
    </section>
  );
}
