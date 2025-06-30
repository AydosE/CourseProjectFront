import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function FormPreview({ template }) {
  if (!template || !template.Questions?.length) {
    return (
      <p className="text-muted-foreground italic">
        Нет вопросов для предпросмотра
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {template.Questions.map((q, i) => (
        <div key={q.id} className="space-y-2">
          <p className="font-semibold">
            {i + 1}. {q.text}
          </p>

          {q.type === "text" && <Input placeholder="Короткий текст" disabled />}

          {q.type === "textarea" && (
            <Textarea placeholder="Развёрнутый ответ" disabled />
          )}

          {q.type === "number" && (
            <Input type="number" placeholder="Число" disabled />
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
