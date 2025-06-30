import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const { fetchMe } = useAuth();

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
      toast.error("Пользователь уже существует или произошла ошибка");
    }
  };

  return (
    <AuthForm
      title="Регистрация"
      buttonLabel="Создать аккаунт"
      isLogin={false}
      onSubmit={handleRegister}
    />
  );
}
