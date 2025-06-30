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

const QuestionItem = memo(function QuestionItem({
  question,
  onUpdate,
  onRemove,
}) {
  const [text, setText] = useState(question.text || "");
  const [type, setType] = useState(question.type || "text");
  const [options, setOptions] = useState(question.options?.join(", ") || "");

  // Сохраняем при размонтировании или изменениях вручную
  useEffect(() => {
    return () => {
      commitChanges();
    };
  }, []);

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
    <div className="flex flex-col gap-2 p-4 rounded border bg-muted/50">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={commitChanges}
        placeholder="Вопрос"
      />

      <Select
        value={type}
        onValueChange={(value) => {
          setType(value);
          commitChanges();
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Тип вопроса" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="text">Короткий текст</SelectItem>
          <SelectItem value="textarea">Развёрнутый ответ</SelectItem>
          <SelectItem value="number">Число</SelectItem>
          <SelectItem value="checkbox">Флажки</SelectItem>
        </SelectContent>
      </Select>

      {type === "checkbox" && (
        <Input
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          onBlur={commitChanges}
          placeholder="Опции (через запятую)"
        />
      )}

      <Button
        type="button"
        variant="destructive"
        className="self-start text-sm"
        onClick={onRemove}
      >
        🗑 Удалить
      </Button>
    </div>
  );
});

export default QuestionItem;
