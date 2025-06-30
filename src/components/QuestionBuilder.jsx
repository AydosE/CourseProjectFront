import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import QuestionItem from "./QuestionItem";

const typeLimits = {
  text: 4,
  textarea: 4,
  number: 4,
  checkbox: 4,
};

export default function QuestionBuilder({ questions, setQuestions }) {
  const [newQ, setNewQ] = useState({ text: "", type: "text", options: "" });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleAdd = () => {
    const count = questions.filter((q) => q.type === newQ.type).length;
    if (count >= typeLimits[newQ.type]) {
      alert(`Максимум ${typeLimits[newQ.type]} вопросов типа "${newQ.type}"`);
      return;
    }

    const toAdd = {
      id: uuidv4(),
      text: newQ.text,
      type: newQ.type,
      options:
        newQ.type === "checkbox"
          ? newQ.options.split(",").map((s) => s.trim())
          : [],
      order: questions.length,
    };

    setQuestions([...questions, toAdd]);
    setNewQ({ text: "", type: "text", options: "" });
  };

  const handleUpdate = (id, updated) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...updated } : q)));
  };

  const handleRemove = (index) => {
    setQuestions((prev) =>
      prev.filter((_, i) => i !== index).map((q, i) => ({ ...q, order: i }))
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex((q) => q.id === active.id);
    const newIndex = questions.findIndex((q) => q.id === over.id);
    const reordered = arrayMove(questions, oldIndex, newIndex).map((q, i) => ({
      ...q,
      order: i,
    }));
    setQuestions(reordered);
  };

  const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return children({ setNodeRef, attributes, listeners, style });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          placeholder="Текст вопроса"
          className="flex-1 border px-2 py-1 rounded"
          value={newQ.text}
          onChange={(e) => setNewQ({ ...newQ, text: e.target.value })}
        />
        <select
          className="border px-2 py-1 rounded"
          value={newQ.type}
          onChange={(e) => setNewQ({ ...newQ, type: e.target.value })}
        >
          <option value="text">Короткий текст</option>
          <option value="textarea">Развёрнутый ответ</option>
          <option value="number">Число</option>
          <option value="checkbox">Флажки</option>
        </select>
      </div>

      {newQ.type === "checkbox" && (
        <input
          placeholder="Опции (через запятую)"
          className="w-full border px-2 py-1 rounded"
          value={newQ.options}
          onChange={(e) => setNewQ({ ...newQ, options: e.target.value })}
        />
      )}

      <button
        type="button"
        onClick={handleAdd}
        className="bg-green-500 text-white px-4 py-1 rounded"
      >
        ➕ Добавить вопрос
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="divide-y border-t mt-4">
            {questions.map((q, i) => (
              <SortableItem key={q.id} id={q.id}>
                {({ setNodeRef, attributes, listeners, style }) => (
                  <div
                    ref={setNodeRef}
                    {...attributes}
                    style={style}
                    className="flex items-start py-2"
                  >
                    <span
                      {...listeners}
                      className="cursor-grab text-xl px-2 select-none"
                    >
                      ⠿
                    </span>
                    <QuestionItem
                      question={q}
                      onUpdate={handleUpdate}
                      onRemove={() => handleRemove(i)}
                    />
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
