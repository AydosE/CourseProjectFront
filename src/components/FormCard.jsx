import { Link } from "react-router-dom";

export default function FormCard({ form }) {
  const isTemplateDeleted = !form.Template;

  return (
    <div className="p-4 border rounded-md bg-background shadow-sm space-y-1">
      <h3 className="text-base font-semibold leading-tight">
        📄 Ответ на:
        <span className="ml-1 text-primary">
          {isTemplateDeleted ? "Удалённый шаблон" : form.Template.title}
        </span>
      </h3>

      {form.createdAt && (
        <p className="text-sm text-muted-foreground">
          🕒 {new Date(form.createdAt).toLocaleString()}
        </p>
      )}

      <Link
        to={`/forms/${form.id}`}
        className="inline-block mt-2 text-sm text-blue-600 hover:underline"
      >
        🔍 Посмотреть ответ
      </Link>
    </div>
  );
}
