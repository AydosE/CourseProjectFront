import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, logout, isAuth } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        📄 {t("title")}
      </Link>

      <div className="flex items-center gap-4">
        {isAuth ? (
          <>
            <span className="hidden sm:inline">
              {t("Hello")}, {user?.username}!
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-500 px-3 py-1 rounded"
            >
              {t("Logout")}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              {t("Login")}
            </Link>
            <Link to="/register" className="hover:underline">
              {t("Register")}
            </Link>
          </>
        )}
        <button
          onClick={() =>
            i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru")
          }
          className="bg-white text-blue-500 px-2 py-1 rounded"
        >
          🌍 {i18n.language === "ru" ? "EN" : "RU"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
