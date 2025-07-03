import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FormCard({ form }) {
  const isTemplateDeleted = !form.Template;
  const { t } = useTranslation("FormCard");

  return (
    <div className="p-4 border rounded-lg bg-background dark:bg-neutral-900 dark:border-gray-700 shadow-sm space-y-2">
      <h3 className="text-base sm:text-lg font-medium text-foreground dark:text-white leading-tight">
        {t("title")}:
        <span className="ml-1 text-primary dark:text-blue-400">
          {isTemplateDeleted ? t("deleted_template") : form.Template.title}
        </span>
      </h3>

      {form.createdAt && (
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          {new Date(form.createdAt).toLocaleString()}
        </p>
      )}

      <Link
        to={`/forms/${form.id}`}
        className="inline-block text-sm text-blue-600 dark:text-blue-400 hover:underline transition"
      >
        {t("view_button")}
      </Link>
    </div>
  );
}
