import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTheme } from "@/context/ThemeContext"; // если используешь свой ThemeContext

export default function Navbar() {
  const { t } = useTranslation("Navbar");
  const navigate = useNavigate();
  const { user, logout, isAuth } = useAuth();
  const { theme, toggleTheme } = useTheme(); // нужно добавить ThemeContext

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkStyle =
    "px-3 py-1 rounded-md border border-border dark:border-gray-700 text-sm font-medium text-foreground dark:text-white hover:bg-muted hover:border-blue-500 dark:hover:border-blue-400 transition";

  return (
    <nav className="bg-background dark:bg-neutral-950 border-b border-border dark:border-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          to="/"
          className="text-xl font-bold whitespace-nowrap text-blue-600 dark:text-blue-400"
        >
          📄 {t("title")}
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/" className={linkStyle}>
            {t("home")}
          </Link>
          <Link to="/templates" className={linkStyle}>
            {t("templates")}
          </Link>
          {isAuth && (
            <Link to="/templates/create" className={linkStyle}>
              {t("createTemplate")}
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isAuth ? (
            <>
              <Link to="/profile" className={linkStyle}>
                {t("profile")}
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin" className={linkStyle}>
                  {t("admin")}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`${linkStyle} hover:bg-red-50 dark:hover:bg-red-900`}
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkStyle}>
                {t("login")}
              </Link>
              <Link to="/register" className={linkStyle}>
                {t("register")}
              </Link>
            </>
          )}
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="px-2 py-1 border border-border dark:border-gray-700 rounded-md text-sm hover:bg-muted transition"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}
