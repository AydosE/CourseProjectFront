import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Unauthorized() {
  const { t } = useTranslation("Unauthorized");

  return (
    <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-red-600 dark:text-red-500">
        {t("title")}
      </h1>
      <p className="text-muted-foreground dark:text-gray-400 text-sm sm:text-base">
        {t("message")}
      </p>
      <Link
        to="/"
        className="inline-block text-blue-600 hover:underline text-sm sm:text-base"
      >
        ⬅ {t("back")}
      </Link>
    </section>
  );
}
