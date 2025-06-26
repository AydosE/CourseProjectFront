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
const typeLimits = {
  text: 4,
  textarea: 4,
  number: 4,
  checkbox: 4,
};
import { v4 as uuidv4 } from "uuid";

const QuestionBuilder = ({ questions, setQuestions }) => {
  const [newQ, setNewQ] = useState({ text: "", type: "text", options: "" });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleAdd = () => {
    const countByType = questions.filter((q) => q.type === newQ.type).length;
    if (countByType >= typeLimits[newQ.type]) {
      alert(`Максимум ${typeLimits[newQ.type]} вопросов типа "${newQ.type}"`);
      return;
    }

    const toAdd = {
      ...newQ,
      id: uuidv4(),
      options:
        newQ.type === "checkbox"
          ? newQ.options.split(",").map((s) => s.trim())
          : [],
      order: questions.length,
    };

    setQuestions([...questions, toAdd]);
    setNewQ({ text: "", type: "text", options: "" });
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

  const handleRemove = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated.map((q, i) => ({ ...q, order: i })));
  };
  const SortableItem = ({ id, index, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        {children}
      </div>
    );
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
              <SortableItem key={q.id} id={q.id} index={i}>
                <div className="flex justify-between items-start py-2">
                  <div>
                    <strong>{i + 1}.</strong> {q.text}{" "}
                    <span className="text-sm text-gray-500">({q.type})</span>
                    {q.type === "checkbox" && (
                      <ul className="text-xs mt-1 ml-4 list-disc">
                        {q.options.map((opt, j) => (
                          <li key={j}>{opt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemove(i)}
                    className="text-red-500 hover:underline"
                  >
                    Удалить
                  </button>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default QuestionBuilder;
