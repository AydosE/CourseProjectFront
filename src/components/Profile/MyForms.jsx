import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../../api/axios";
import { toast } from "sonner";
import SkeletonCard from "@/components/ui/skeletons/skeleton-card";
import EmptyState from "@/components/ui/EmptyState";
import FormCard from "@/components/FormCard";

export default function MyForms() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("Profile");

  useEffect(() => {
    API.get("/users/me/forms")
      .then((res) => setForms(res.data))
      .catch((err) => {
        console.error(err);
        toast.error(t("forms_load_error"));
      })
      .finally(() => setLoading(false));
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
        title={t("forms_empty_title")}
        message={t("forms_empty_message")}
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
