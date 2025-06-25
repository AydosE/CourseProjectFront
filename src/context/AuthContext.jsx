import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";
import i18n from "../i18n/i18n";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchMe = async () => {
    try {
      const res = await API.get("/auth/me");

      setUser(res.data);
      i18n.changeLanguage(res.data.preferred_lang || "en");
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchMe();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, isAuth: !!user, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
