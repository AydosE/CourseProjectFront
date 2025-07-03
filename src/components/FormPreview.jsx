import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";

export default function FormPreview({ template }) {
  const { t } = useTranslation("FormPreview");

  if (!template || !template.Questions?.length) {
    return <p className="text-muted-foreground italic">{t("no_questions")}</p>;
  }

  return (
    <div className="space-y-6">
      {template.Questions.map((q, i) => (
        <div key={q.id} className="space-y-2">
          <p className="font-semibold">
            {i + 1}. {q.text}
          </p>

          {q.type === "text" && <Input placeholder={t("text")} disabled />}
          {q.type === "textarea" && (
            <Textarea placeholder={t("textarea")} disabled />
          )}
          {q.type === "number" && (
            <Input type="number" placeholder={t("number")} disabled />
          )}
          {q.type === "checkbox" && (
            <div className="space-y-1 pl-1">
              {q.options?.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Checkbox disabled />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
