import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";
import i18n from "../i18n/i18n";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← добавляем

  const fetchMe = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
      i18n.changeLanguage(res.data.preferred_lang || "en");
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false); // ← обязательно
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchMe();
    } else {
      setLoading(false); // ← если токена нет, всё равно завершаем загрузку
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, logout, isAuth: !!user, fetchMe, loading }} // ← добавляем loading
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
