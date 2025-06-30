import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AuthForm({ title, buttonLabel, onSubmit, isLogin }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="max-w-md mx-auto bg-background p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <Input
            ref={inputRef}
            name="username"
            placeholder="Имя пользователя"
            value={form.username}
            onChange={handleChange}
            required
          />
        )}
        <Input
          ref={isLogin ? inputRef : null}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full">
          {buttonLabel}
        </Button>
      </form>
    </div>
  );
}
