import { memo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const QuestionItem = memo(function QuestionItem({
  question,
  onUpdate,
  onRemove,
}) {
  const [text, setText] = useState(question.text || "");
  const [type, setType] = useState(question.type || "text");
  const [options, setOptions] = useState(question.options?.join(", ") || "");
  const { t } = useTranslation("QuestionBuilder");

  useEffect(() => () => commitChanges(), []);

  const commitChanges = () => {
    const normalizedOptions =
      type === "checkbox"
        ? options
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const hasChanged =
      text !== question.text ||
      type !== question.type ||
      JSON.stringify(normalizedOptions) !== JSON.stringify(question.options);

    if (!hasChanged) return;

    onUpdate(question.id, {
      ...question,
      text,
      type,
      options: normalizedOptions,
    });
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border bg-muted/50 dark:bg-neutral-800 dark:border-gray-700 transition">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commitChanges}
        placeholder={t("question_placeholder")}
        className="w-full"
      />

      <Select
        value={type}
        onValueChange={(value) => {
          setType(value);
          commitChanges();
        }}
      >
        <SelectTrigger
          className="w-full bg-background dark:bg-neutral-900 dark:text-white"
          aria-label={t("type_placeholder")}
        >
          <SelectValue placeholder={t("type_placeholder")} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="text">{t("type_text")}</SelectItem>
          <SelectItem value="textarea">{t("type_textarea")}</SelectItem>
          <SelectItem value="number">{t("type_number")}</SelectItem>
          <SelectItem value="checkbox">{t("type_checkbox")}</SelectItem>
        </SelectContent>
      </Select>

      {type === "checkbox" && (
        <Input
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          onBlur={commitChanges}
          placeholder={t("options_placeholder")}
        />
      )}

      <Button
        type="button"
        variant="destructive"
        className="self-start text-sm"
        onClick={onRemove}
      >
        {t("delete_button")}
      </Button>
    </div>
  );
});

export default QuestionItem;
