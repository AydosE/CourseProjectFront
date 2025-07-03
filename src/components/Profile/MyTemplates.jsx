import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "sonner";
import SkeletonCard from "@/components/ui/skeletons/skeleton-card";
import EmptyState from "@/components/ui/EmptyState";
import TemplateCard from "@/components/TemplateCard";

export default function MyTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("Profile");
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/me/templates")
      .then((res) => setTemplates(res.data))
      .catch((err) => {
        console.error(err);
        toast.error(t("templates_load_error"));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(t("template_confirm_delete"))) return;
    try {
      await API.delete(`/templates/${id}`);
      setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
      toast.success(t("template_deleted"));
    } catch {
      toast.error(t("template_delete_error"));
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <EmptyState
        icon="📄"
        title={t("templates_empty_title")}
        message={t("templates_empty_message")}
      />
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {templates.map((tpl) => (
        <TemplateCard
          key={tpl.id}
          template={tpl}
          onEdit={() => navigate(`/edit-template/${tpl.id}`)}
          onDelete={() => handleDelete(tpl.id)}
        />
      ))}
    </div>
  );
}
