import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import API from "../api/axios";
import TemplateForm from "../components/TemplateForm";
import SectionCard from "@/components/SelectionCard";

export default function CreateTemplate() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const res = await API.post("/templates", data);
      toast.success("Шаблон успешно создан");
      navigate(`/templates/${res.data.templateId}`);
    } catch (err) {
      console.error("Ошибка при создании шаблона:", err);
      toast.error("Не удалось создать шаблон. Попробуйте позже.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <SectionCard title="🧩 Новый шаблон">
        <TemplateForm mode="create" onSubmit={handleSubmit} />
      </SectionCard>
    </div>
  );
}
