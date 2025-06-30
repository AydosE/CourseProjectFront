import { useState, useEffect } from "react";

export default function QuestionItem({ question, onUpdate, onRemove }) {
  const [text, setText] = useState(question.text || "");
  const [type, setType] = useState(question.type || "text");
  const [options, setOptions] = useState(question.options?.join(", ") || "");

  const handleCommit = () => {
    const updated = {
      ...question,
      text,
      type,
      options:
        type === "checkbox" ? options.split(",").map((s) => s.trim()) : [],
    };
    onUpdate(question.id, updated);
  };

  return (
    <div className="space-y-1 flex-1">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleCommit}
        className="w-full border px-2 py-1 rounded"
        placeholder="Вопрос"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        onBlur={handleCommit}
        className="w-full border px-2 py-1 rounded"
      >
        <option value="text">Короткий текст</option>
        <option value="textarea">Развёрнутый ответ</option>
        <option value="number">Число</option>
        <option value="checkbox">Флажки</option>
      </select>
      {type === "checkbox" && (
        <input
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          onBlur={handleCommit}
          placeholder="Опции (через запятую)"
          className="w-full border px-2 py-1 rounded"
        />
      )}
      <button
        type="button"
        onClick={onRemove}
        className="text-red-500 hover:underline"
      >
        🗑 Удалить
      </button>
    </div>
  );
}
