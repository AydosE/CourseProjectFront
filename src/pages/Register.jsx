import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Register() {
  const navigate = useNavigate();
  const { fetchMe } = useAuth();
  const { t } = useTranslation("Register");

  const handleRegister = async ({ username, email, password }) => {
    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      await fetchMe();
      navigate("/");
    } catch (err) {
      toast.error(t("register_error"));
    }
  };

  return (
    <AuthForm
      title={t("register_title")}
      buttonLabel={t("register_button")}
      isLogin={false}
      onSubmit={handleRegister}
    />
  );
}
