import { useState, useLayoutEffect } from "react";
import { toast } from "sonner";

export default function SettingsPanel() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("ru");

  // Применяем тему до рендера, чтобы избежать мерцания
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
    toast.success(`Тема: ${value === "dark" ? "тёмная" : "светлая"}`);
  };

  const handleLang = (value) => {
    setLang(value);
    localStorage.setItem("lang", value);
    // i18n.changeLanguage(value)
    toast.success(`Язык интерфейса: ${value.toUpperCase()}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium mb-1">🌗 Тема</label>
        <select
          value={theme}
          onChange={(e) => handleTheme(e.target.value)}
          className="border rounded px-3 py-1 bg-background"
        >
          <option value="light">Светлая</option>
          <option value="dark">Тёмная</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">🌍 Язык</label>
        <select
          value={lang}
          onChange={(e) => handleLang(e.target.value)}
          className="border rounded px-3 py-1 bg-background"
        >
          <option value="ru">Русский</option>
          <option value="uz">O‘zbek</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}
