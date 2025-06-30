import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import TemplateForm from "../components/TemplateForm";

const CreateTemplate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const res = await API.post("/templates", data);
      navigate(`/templates/${res.data.templateId}`);
    } catch (err) {
      console.error(err);
      alert("Ошибка при создании шаблона");
    }
  };

  return <TemplateForm mode="create" onSubmit={handleSubmit} />;
};

export default CreateTemplate;
