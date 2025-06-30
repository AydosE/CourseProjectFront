import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import SkeletonCard from "@/components/ui/skeletons/skeleton-card";
import EmptyState from "@/components/ui/EmptyState";
import TemplateCard from "@/components/TemplateCard";

export default function MyTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await API.get("/users/me/templates");
        setTemplates(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке:", err);
        toast.error("Не удалось загрузить шаблоны");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Удалить шаблон?")) return;
    try {
      await API.delete(`/templates/${id}`);
      setTemplates((prev) => prev.filter((tpl) => tpl.id !== id));
      toast.success("Шаблон удалён");
    } catch (err) {
      console.error("Ошибка при удалении:", err);
      toast.error("Не удалось удалить шаблон");
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
        title="Нет шаблонов"
        message="Вы ещё не создали ни одного шаблона."
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
