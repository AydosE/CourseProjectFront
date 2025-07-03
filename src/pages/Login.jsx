import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation("login");

  const navigate = useNavigate();
  const { fetchMe } = useAuth();

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      await fetchMe();
      navigate("/");
    } catch (err) {
      toast.error("Неверный email или пароль");
    }
  };

  return (
    <AuthForm
      title={t("title")}
      buttonLabel={t("submit")}
      isLogin
      onSubmit={handleLogin}
    />
  );
}
