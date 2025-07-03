import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Unauthorized() {
  const { t } = useTranslation("Unauthorized");

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-red-600">{t("title")}</h1>
      <p className="mt-4">{t("message")}</p>
      <Link to="/" className="text-blue-600 hover:underline mt-2 block">
        ⬅ {t("back")}
      </Link>
    </div>
  );
}
