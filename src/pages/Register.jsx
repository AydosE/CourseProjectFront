import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
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
      await fetchMe(); // обновляем данные пользователя
      navigate("/");
    } catch (err) {
      alert("Пользователь уже существует или ошибка регистрации");
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
};

export default Register;
