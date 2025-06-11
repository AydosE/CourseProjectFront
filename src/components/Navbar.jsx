import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        📄 {t("title")}
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          {t("home")}
        </Link>
        <Link to="/form" className="hover:underline">
          {t("form")}
        </Link>
        <Link to="/results" className="hover:underline">
          {t("results")}
        </Link>
        <button
          onClick={() =>
            i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
          }
          className="bg-white text-blue-500 px-2 py-1 rounded"
        >
          🌍 {i18n.language === "ru" ? "English" : "Русский"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
