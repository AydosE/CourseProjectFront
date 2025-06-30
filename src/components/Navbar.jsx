import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, isAuth } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLangToggle = () => {
    const next = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(next);
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex flex-wrap justify-between items-center gap-4">
      <Link to="/" className="text-xl font-bold whitespace-nowrap">
        📄 {t("title")}
      </Link>

      <div className="flex items-center flex-wrap gap-3 text-sm">
        <Link to="/templates" className="hover:underline">
          {t("Templates") || "Шаблоны"}
        </Link>

        {isAuth && (
          <Link
            to="/templates/create"
            className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
          >
            ➕ {t("CreateTemplate") || "Создать шаблон"}
          </Link>
        )}

        {isAuth ? (
          <>
            <span className="hidden sm:inline whitespace-nowrap">
              {t("Hello")}, {user?.username}!
            </span>

            <Link
              to="/profile"
              className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
            >
              {t("Profile") || "Профиль"}
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
              >
                {t("Admin") || "Админка"}
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-red-100"
            >
              {t("Logout") || "Выйти"}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              {t("Login") || "Войти"}
            </Link>
            <Link to="/register" className="hover:underline">
              {t("Register") || "Регистрация"}
            </Link>
          </>
        )}

        <button
          onClick={handleLangToggle}
          className="bg-white text-blue-500 px-2 py-1 rounded"
        >
          🌍 {i18n.language.toUpperCase()}
        </button>
      </div>
    </nav>
  );
}
