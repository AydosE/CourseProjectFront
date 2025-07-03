import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("FormView");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await API.get(`/forms/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error(err);
        toast.error(t("load_error"));
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [id, t]);

  const handleDelete = async () => {
    if (!window.confirm(t("confirm_delete"))) return;
    try {
      await API.delete(`/forms/${form.id}`);
      toast.success(t("delete_success"));
      navigate(user?.role === "admin" ? `/users/${form.userId}` : "/profile");
    } catch (err) {
      console.error(err);
      toast.error(t("delete_error"));
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
    return <EmptyState title={t("error_title")} message={t("error_message")} />;
  }

  const isTemplateDeleted = form.Template === null;
  const hasAnswers = form.Answers?.length > 0;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <SectionCard
        title={
          isTemplateDeleted
            ? t("template_removed_title")
            : t("template_section_title")
        }
      >
        <h2 className="text-xl font-bold">
          {isTemplateDeleted ? t("template_deleted") : form.Template.title}
        </h2>
        {!isTemplateDeleted && form.Template.description && (
          <p className="text-muted-foreground mb-2">
            {form.Template.description}
          </p>
        )}
      </SectionCard>

      <SectionCard title={t("answers_section_title")}>
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
            title={t("no_data_title")}
            message={t("no_data_message")}
          />
        )}
      </SectionCard>

      {(user?.id === form.userId || user?.role === "admin") && (
        <Button type="button" variant="destructive" onClick={handleDelete}>
          🗑 {t("delete_button")}
        </Button>
      )}
    </div>
  );
}
