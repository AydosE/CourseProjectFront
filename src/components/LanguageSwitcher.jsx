import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLangChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleLangChange}
      className="px-3 py-1 rounded-md border text-sm bg-background dark:bg-neutral-800 dark:text-white dark:border-gray-700 transition"
      aria-label="Language"
    >
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  );
}
