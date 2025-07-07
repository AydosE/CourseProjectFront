import { useState, useEffect } from "react";
import QuestionBuilder from "./QuestionBuilder";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { supabaseImg } from "@/api/supabaseImg";

export default function TemplateForm({
  mode = "create",
  initialData = {},
  onSubmit,
}) {
  const { t } = useTranslation("TemplateForm");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    tags: "",
    version: "",
    ...initialData,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [questions, setQuestions] = useState(initialData.questions || []);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (Array.isArray(initialData.tags)) {
      setForm((prev) => ({
        ...prev,
        tags: initialData.tags.join(", "),
      }));
    }
  }, [initialData.tags]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: typeof value === "string" ? value : "",
    }));
  };

  const normalizeTags = (raw) => {
    const rawTags = String(raw)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const validTags = rawTags.filter((t) => /^[a-zA-Z0-9]+$/.test(t));
    const invalidTags = rawTags.filter((t) => !validTags.includes(t));

    if (raw && validTags.length === 0) {
      toast.error(t("tags_invalid_all"));
    }

    if (invalidTags.length > 0) {
      toast.error(t("tags_invalid_some", { tags: invalidTags.join(", ") }));
    }

    return validTags;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error(t("title_required"));
      return;
    }

    if (questions.length === 0) {
      toast.error(t("questions_required"));
      return;
    }

    if (questions.some((q) => !q.text.trim())) {
      toast.error(t("question_empty_error"));
      return;
    }

    const tags = normalizeTags(form.tags);
    if (form.tags && tags.length === 0) return;

    let imageUrl = form.imageUrl;
    if (selectedFile) {
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const { data, error } = await supabaseImg.storage
        .from("template-image")
        .upload(fileName, selectedFile);

      if (error) {
        toast.error("Ошибка загрузки изображения");
        return;
      }

      const { data: publicUrl } = supabaseImg.storage
        .from("template-image")
        .getPublicUrl(fileName);

      imageUrl = publicUrl.publicUrl;

      setForm((prev) => ({
        ...prev,
        imageUrl,
      }));
    }

    const payload = {
      ...form,
      imageUrl,
      tags,
      questions,
      isPublic: form.isPublic ?? false,
    };

    onSubmit(payload);
  };

  return (
    <div className="bg-background dark:bg-neutral-900 rounded-lg shadow px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">
        {mode === "edit" ? t("edit_title") : t("create_title")}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground dark:text-white">
            {t("section_info")}
          </h2>

          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder={t("placeholder_title")}
            required
          />

          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder={t("placeholder_description")}
          />

          <Input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder={t("placeholder_category")}
          />

          <div className="space-y-2">
            <label className="block font-medium text-foreground dark:text-white">
              {t("image_label")}
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              placeholder="asdasd"
            />
            {uploading && (
              <p className="text-sm text-muted-foreground">Загрузка...</p>
            )}
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Превью шаблона"
                className="w-full max-w-xs h-auto rounded-md border border-muted"
              />
            )}
          </div>

          <Input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder={t("placeholder_tags")}
          />
          <label className="flex items-center gap-2 text-foreground dark:text-white">
            <input
              type="checkbox"
              checked={form.isPublic}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isPublic: e.target.checked }))
              }
            />
            {t("is_public_label") || "Сделать шаблон публичным"}
          </label>
        </section>

        <hr className="border-muted dark:border-gray-700" />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground dark:text-white">
            {t("section_questions")}
          </h2>
          <QuestionBuilder questions={questions} setQuestions={setQuestions} />
        </section>

        <div className="pt-4">
          <Button type="submit">
            {mode === "edit" ? t("button_save") : t("button_create")}
          </Button>
        </div>
      </form>
    </div>
  );
}
