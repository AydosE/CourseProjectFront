import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function AuthForm({ title, buttonLabel, onSubmit, isLogin }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const inputRef = useRef(null);
  const { t } = useTranslation("AuthForm");

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
    <div className="max-w-md mx-auto px-4 sm:px-6 py-6 bg-background dark:bg-neutral-900 rounded-lg shadow space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground dark:text-white">
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <Input
            ref={inputRef}
            name="username"
            placeholder={t("username")}
            value={form.username}
            onChange={handleChange}
            required
            className="w-full"
          />
        )}
        <Input
          ref={isLogin ? inputRef : null}
          name="email"
          type="email"
          placeholder={t("email")}
          value={form.email}
          onChange={handleChange}
          required
          className="w-full"
        />
        <Input
          name="password"
          type="password"
          placeholder={t("password")}
          value={form.password}
          onChange={handleChange}
          required
          className="w-full"
        />
        <Button type="submit" className="w-full">
          {buttonLabel}
        </Button>
      </form>
    </div>
  );
}
