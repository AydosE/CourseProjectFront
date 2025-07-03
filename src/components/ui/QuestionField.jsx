import { useTranslation } from "react-i18next";

export default function QuestionField({ question, onChange }) {
  const { id, type, text, options = [] } = question;
  const { t } = useTranslation("QuestionField");

  const handle = (e) => onChange(id, e.target.value);

  return (
    <div className="space-y-2">
      <label className="block font-medium text-foreground dark:text-white">
        {text}
      </label>

      {type === "text" || type === "number" ? (
        <input
          type={type}
          onChange={handle}
          className="w-full px-3 py-2 rounded-md border bg-background dark:bg-neutral-800 dark:text-white dark:border-gray-700 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500 transition"
        />
      ) : type === "select" ? (
        <select
          onChange={handle}
          className="w-full px-3 py-2 rounded-md border bg-background dark:bg-neutral-800 dark:text-white dark:border-gray-700 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500 transition"
        >
          <option value="">{t("select_option")}</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-red-500 text-sm">{t("unknown_type", { type })}</p>
      )}
    </div>
  );
}
