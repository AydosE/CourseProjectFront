import { Link } from "react-router-dom";

export default function TemplateCard({ template }) {
  return (
    <div className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{template.title}</h3>
        <Link
          to={`/templates/${template.id}`}
          className="text-blue-600 text-sm hover:underline"
        >
          Открыть
        </Link>
      </div>

      {template.description && (
        <p className="text-gray-600 text-sm mt-1">{template.description}</p>
      )}

      {template.category && (
        <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
          📁 {template.category}
        </span>
      )}

      {template.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {template.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
