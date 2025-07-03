import { useState, useRef } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import QuestionItem from "./QuestionItem";

const typeLimits = {
  text: 4,
  textarea: 4,
  number: 4,
  checkbox: 4,
};

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return children({ setNodeRef, attributes, listeners, style });
}

export default function QuestionBuilder({ questions, setQuestions }) {
  const [newQ, setNewQ] = useState({ text: "", type: "text", options: "" });
  const inputRef = useRef(null);
  const { t } = useTranslation("QuestionBuilder");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAdd = () => {
    const count = questions.filter((q) => q.type === newQ.type).length;
    if (count >= typeLimits[newQ.type]) {
      toast.error(
        t("max_type_error", {
          max: typeLimits[newQ.type],
          type: t(`type_${newQ.type}`),
        })
      );
      return;
    }

    if (!newQ.text.trim()) {
      toast.error(t("empty_error"));
      return;
    }

    const toAdd = {
      id: uuidv4(),
      text: newQ.text,
      type: newQ.type,
      options:
        newQ.type === "checkbox"
          ? newQ.options
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      order: questions.length,
    };

    setQuestions([...questions, toAdd]);
    setNewQ({ text: "", type: "text", options: "" });

    setTimeout(() => inputRef.current?.focus(), 0);
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          ref={inputRef}
          placeholder={t("new_placeholder")}
          value={newQ.text}
          onChange={(e) => setNewQ({ ...newQ, text: e.target.value })}
        />
        <Select
          value={newQ.type}
          onValueChange={(value) => setNewQ({ ...newQ, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("type_placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">{t("type_text")}</SelectItem>
            <SelectItem value="textarea">{t("type_textarea")}</SelectItem>
            <SelectItem value="number">{t("type_number")}</SelectItem>
            <SelectItem value="checkbox">{t("type_checkbox")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {newQ.type === "checkbox" && (
        <Input
          placeholder={t("options_placeholder")}
          value={newQ.options}
          onChange={(e) => setNewQ({ ...newQ, options: e.target.value })}
        />
      )}

      <Button type="button" onClick={handleAdd} className="w-fit">
        {t("add_button")}
      </Button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="mt-6 space-y-3">
            {questions.map((q, i) => (
              <SortableItem key={q.id} id={q.id}>
                {({ setNodeRef, attributes, listeners, style }) => (
                  <div
                    ref={setNodeRef}
                    {...attributes}
                    style={style}
                    className="flex items-start gap-2 p-3 rounded-md border bg-background dark:bg-neutral-900 dark:border-gray-700 shadow-sm transition"
                  >
                    <span
                      {...listeners}
                      className="cursor-grab text-xl px-2 text-muted-foreground dark:text-gray-400 select-none"
                      aria-grabbed="false"
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
