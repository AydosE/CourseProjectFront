import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import TemplateForm from "../components/TemplateForm";

const EditTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/templates/${id}`).then((res) => {
      const { Questions, ...rest } = res.data;
      setTemplate({ ...rest, questions: Questions });
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await API.put(`/templates/${id}`, {
        ...data,
        tags: data.tags,
      });

      const enriched = data.questions.map((q, i) => ({
        ...q,
        templateId: id,
        order: i,
      }));

      await API.patch(`/templates/${id}/questions`, { questions: enriched });

      alert("Шаблон обновлён!");
      navigate("/profile");
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
      alert("Не удалось сохранить");
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <TemplateForm mode="edit" initialData={template} onSubmit={handleSubmit} />
  );
};

export default EditTemplate;
