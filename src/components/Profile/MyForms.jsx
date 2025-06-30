import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "sonner";

import SkeletonCard from "@/components/ui/skeletons/skeleton-card";
import EmptyState from "@/components/ui/EmptyState";
import FormCard from "@/components/FormCard";

export default function MyForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await API.get("/users/me/forms");
        setForms(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке форм:", err);
        toast.error("Не удалось загрузить ответы");
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <EmptyState
        icon="📬"
        title="Нет ответов"
        message="Вы ещё не заполняли ни одной формы."
      />
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
}
