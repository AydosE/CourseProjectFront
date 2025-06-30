import MyTemplates from "../components/Profile/MyTemplates";
import MyForms from "../components/Profile/MyForms";
import SettingsPanel from "../components/Profile/SettingsPanel";
import TabsSwitcher from "@/components/ui/TabsSwitcher";

export default function Profile() {
  const tabs = [
    { label: "Шаблоны", content: <MyTemplates /> },
    { label: "Ответы", content: <MyForms /> },
    { label: "Настройки", content: <SettingsPanel /> },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">👤 Профиль</h1>
      <TabsSwitcher tabs={tabs} />
    </div>
  );
}
