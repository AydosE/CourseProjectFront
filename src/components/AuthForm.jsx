import { useState } from "react";

const AuthForm = ({ title, buttonLabel, onSubmit, isLogin }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            name="username"
            placeholder="Имя пользователя"
            value={form.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded">
          {buttonLabel}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
