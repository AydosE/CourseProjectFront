import { useState, useLayoutEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function SettingsPanel() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("ru");
  const { t, i18n } = useTranslation("Profile");

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedLang = localStorage.getItem("lang") || "ru";
    setTheme(savedTheme);
    setLang(savedLang);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const handleTheme = (value) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    document.documentElement.classList.toggle("dark", value === "dark");
    toast.success(t("theme_applied", { theme: t(`theme_${value}`) }));
  };

  const handleLang = (value) => {
    setLang(value);
    localStorage.setItem("lang", value);
    i18n.changeLanguage(value);
    toast.success(t("language_changed", { lang: value.toUpperCase() }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium mb-1">{t("label_theme")}</label>
        <select
          value={theme}
          onChange={(e) => handleTheme(e.target.value)}
          className="border rounded px-3 py-1 bg-background"
        >
          <option value="light">{t("theme_light")}</option>
          <option value="dark">{t("theme_dark")}</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">{t("label_language")}</label>
        <select
          value={lang}
          onChange={(e) => handleLang(e.target.value)}
          className="border rounded px-3 py-1 bg-background"
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}
