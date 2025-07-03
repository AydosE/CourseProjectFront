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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white">
        {t("title")}
      </h1>
      <TabsSwitcher tabs={tabs} />
    </section>
  );
}
