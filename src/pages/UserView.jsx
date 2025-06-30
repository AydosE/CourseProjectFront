import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import TemplateCard from "../components/TemplateCard";
import SectionCard from "@/components/SelectionCard";
import FormCard from "@/components/FormCard";

export default function UserView() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, templatesRes, formsRes] = await Promise.all([
          API.get(`/users/${id}/datas`),
          API.get(`/users/${id}/templates`),
          API.get(`/users/${id}/forms`),
        ]);
        setUser(userRes.data);
        setTemplates(templatesRes.data);
        setForms(formsRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setUser({ notFound: true });
      }
    };
    fetchData();
  }, [id]);

  if (user?.notFound)
    return <div className="text-center mt-10">❌ Пользователь не найден</div>;
  if (!user) return <div className="text-center mt-10">Загрузка...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">👤 {user.username}</h1>

      <SectionCard title="📁 Шаблоны">
        {templates.length === 0 ? (
          <p className="text-muted-foreground">Нет шаблонов</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {templates.map((tpl) => (
              <TemplateCard key={tpl.id} template={tpl} />
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="📝 Ответы">
        {forms.length === 0 ? (
          <EmptyState
            icon="🗒️"
            title="Нет форм"
            message="Пользователь ещё не отправлял ответы."
          />
        ) : (
          <div className="space-y-2">
            {forms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
