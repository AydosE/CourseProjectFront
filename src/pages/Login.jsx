import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function Login() {
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
      title="Вход в аккаунт"
      buttonLabel="Войти"
      isLogin
      onSubmit={handleLogin}
    />
  );
}
