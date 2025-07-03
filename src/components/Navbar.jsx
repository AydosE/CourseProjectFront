import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { t, i18n } = useTranslation("Navbar");
  const navigate = useNavigate();
  const { user, logout, isAuth } = useAuth();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLangToggle = () => {
    const next = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(next);
  };

  return (
    <nav className=" bg-blue-500 text-white p-4 flex flex-wrap justify-between items-center gap-4 sticky top-0">
      <Link to="/" className="text-xl font-bold whitespace-nowrap">
        📄 {t("title")}
      </Link>
      <div className="flex items-center  flex-wrap gap-3 text-sm">
        <Link
          to="/"
          className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
        >
          {t("home")}
        </Link>
        <Link
          to="/templates"
          className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
        >
          {t("templates")}
        </Link>
      </div>
      <div className=" flex items-center justify-between flex-wrap gap-3 text-sm">
        <div className="flex items-center justify-self-center flex-wrap gap-3 text-sm">
          {isAuth && (
            <Link
              to="/templates/create"
              className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
            >
              {t("createTemplate")}
            </Link>
          )}

          {isAuth ? (
            <>
              {/* <span className="hidden sm:inline whitespace-nowrap">
              {t("Hello")}, {user?.username}!
            </span> */}

              <Link
                to="/profile"
                className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
              >
                {t("profile")}
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
                >
                  {t("admin")}
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-red-100"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
              >
                {t("login")}
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-500 px-3 py-1 rounded hover:bg-blue-100"
              >
                {t("register")}
              </Link>
            </>
          )}

          <button
            onClick={handleLangToggle}
            className="bg-white text-blue-500 px-2 py-1 rounded"
          >
            {i18n.language.toUpperCase()}
          </button>
        </div>
      </div>
    </nav>
  );
}
