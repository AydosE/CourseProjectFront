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
      className="bg-white text-blue-500 px-3 py-1 rounded border"
    >
      <option value="en">EN</option>
      <option value="ru">Ру</option>
    </select>
  );
}
