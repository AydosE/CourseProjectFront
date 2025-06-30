import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import AnswerCard from "@/components/AnswerCard";
import SectionCard from "@/components/SelectionCard";
import EmptyState from "@/components/ui/EmptyState";
import SkeletonCard from "@/components/ui/skeletons/skeleton-card";

export default function FormView() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await API.get(`/forms/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке формы:", err);
        toast.error("Не удалось загрузить форму");
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Удалить этот ответ?")) return;
    try {
      await API.delete(`/forms/${form.id}`);
      toast.success("Ответ удалён");
      navigate(user?.role === "admin" ? `/users/${form.userId}` : "/profile");
    } catch (err) {
      console.error("Ошибка при удалении формы:", err);
      toast.error("Не удалось удалить ответ");
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (!form) {
    return (
      <EmptyState title="Ошибка" message="Ответ не найден или недоступен" />
    );
  }

  const isTemplateDeleted = form.Template === null;
  const hasAnswers = form.Answers?.length > 0;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <SectionCard
        title={isTemplateDeleted ? "🗑 Ответ без шаблона" : "📄 Ответ"}
      >
        <h2 className="text-xl font-bold">
          {isTemplateDeleted ? "Шаблон был удалён" : form.Template.title}
        </h2>
        {!isTemplateDeleted && form.Template.description && (
          <p className="text-muted-foreground mb-2">
            {form.Template.description}
          </p>
        )}
      </SectionCard>

      <SectionCard title="📝 Ответы на вопросы">
        {hasAnswers ? (
          form.Answers.map((ans, i) => {
            const q = form.Template?.Questions?.find(
              (q) => q.id === ans.questionId
            );
            return (
              <AnswerCard key={ans.id} index={i} question={q} answer={ans} />
            );
          })
        ) : (
          <EmptyState
            icon="📭"
            title="Нет данных"
            message="Ответов на вопросы не найдено"
          />
        )}
      </SectionCard>

      {(user?.id === form.userId || user?.role === "admin") && (
        <Button type="button" variant="destructive" onClick={handleDelete}>
          🗑 Удалить ответ
        </Button>
      )}
    </div>
  );
}
