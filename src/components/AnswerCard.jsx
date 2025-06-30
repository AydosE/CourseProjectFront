export default function AnswerCard({ index, question, answer }) {
  const text = question?.text || answer.Question?.text || "❔ Вопрос удалён";

  let value = answer.value;
  if (question?.type === "checkbox") {
    try {
      value = JSON.parse(answer.value).join(", ");
    } catch {
      value = answer.value;
    }
  }

  return (
    <div className="border rounded p-4 bg-muted/50">
      <p className="font-semibold mb-1">
        {index + 1}. {text}
      </p>
      <p className="text-sm text-muted-foreground">Ответ: {value || "—"}</p>
    </div>
  );
}
