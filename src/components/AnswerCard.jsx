import { useTranslation } from "react-i18next";

export default function AnswerCard({ index, question, answer }) {
  const { t } = useTranslation("AnswerCard");

  const text = question?.text || answer.Question?.text || t("question_deleted");

  let value = answer.value;
  if (question?.type === "checkbox") {
    try {
      value = JSON.parse(answer.value).join(", ");
    } catch {
      value = answer.value;
    }
  }

  return (
    <div className="border rounded-lg bg-muted/50 dark:bg-neutral-800 dark:border-gray-700 p-4 space-y-2">
      <p className="font-medium text-foreground dark:text-white">
        {index + 1}. {text}
      </p>
      <p className="text-sm text-muted-foreground dark:text-gray-400">
        {t("answer_prefix")}: {value || t("answer_empty")}
      </p>
    </div>
  );
}
