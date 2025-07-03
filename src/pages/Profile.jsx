import { useTranslation } from "react-i18next";
import MyTemplates from "../components/Profile/MyTemplates";
import MyForms from "../components/Profile/MyForms";
import SettingsPanel from "../components/Profile/SettingsPanel";
import TabsSwitcher from "@/components/ui/TabsSwitcher";

export default function Profile() {
  const { t } = useTranslation("Profile");

  const tabs = [
    { label: t("tab_templates"), content: <MyTemplates /> },
    { label: t("tab_forms"), content: <MyForms /> },
    { label: t("tab_settings"), content: <SettingsPanel /> },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <TabsSwitcher tabs={tabs} />
    </div>
  );
}
