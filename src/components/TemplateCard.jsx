import { Link } from "react-router-dom";

export default function TemplateCard({ template, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md bg-background p-4 transition space-y-2">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <Link
            to={`/templates/${template.id}`}
            className="text-lg font-semibold tracking-tight hover:underline"
          >
            {template.title}
          </Link>
          {template.description && (
            <p className="text-muted-foreground text-sm mt-1">
              {template.description}
            </p>
          )}
        </div>

        <div className="flex gap-2 text-sm whitespace-nowrap">
          {onEdit && (
            <button onClick={onEdit} className="text-blue-600 hover:underline">
              ✏️
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="text-red-600 hover:underline">
              🗑
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-1">
        {template.category && (
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
            📁 {template.category}
          </span>
        )}
        {template.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
