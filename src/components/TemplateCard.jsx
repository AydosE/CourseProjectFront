import { Link, useNavigate } from "react-router-dom";

export default function TemplateCard({ template, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.tagName.toLowerCase() === "button") return;
    navigate(`/templates/${template.id}`);
  };

  return (
    <article
      className="border rounded-lg bg-background dark:bg-neutral-900 shadow-sm hover:shadow-md transition p-4 space-y-3 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div className="flex-1 space-y-1">
          <Link
            to={`/templates/${template.id}`}
            className="text-lg font-semibold tracking-tight text-foreground hover:underline block"
          >
            {template.title}
          </Link>
          {template.description && (
            <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">
              {template.description}
            </p>
          )}
        </div>

        {(onEdit || onDelete) && (
          <div className="flex items-start gap-2 text-sm whitespace-nowrap shrink-0">
            {onEdit && (
              <button
                onClick={onEdit}
                className="text-blue-600 hover:underline transition"
                aria-label="Edit template"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="text-red-600 hover:underline transition"
                aria-label="Delete template"
              >
                🗑
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-1">
        {template.category && (
          <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground dark:bg-neutral-800 dark:text-gray-300 rounded">
            📁 {template.category}
          </span>
        )}
        {template.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
