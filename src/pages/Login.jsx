import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { fetchMe } = useAuth();
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      console.log(localStorage.getItem("token"));
      try {
        console.log("Попытка обновить данные пользователя...");

        await fetchMe(); // обновляем данные пользователя
        console.log("Данные пользователя успешно обновлены");
      } catch (error) {
        throw new Error("Ошибка при обновлении данных пользователя" + error);
      }
      navigate("/"); // переадресация на главную
    } catch (err) {
      alert(err || "Неверный email или пароль");
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
};

export default Login;
