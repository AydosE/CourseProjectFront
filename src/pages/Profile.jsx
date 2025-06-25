import { useState } from "react";
import MyTemplates from "../components/Profile/MyTemplates";
import MyForms from "../components/Profile/MyForms";
import SettingsPanel from "../components/Profile/SettingsPanel";

const Profile = () => {
  const [active, setActive] = useState(0);
  const tabs = ["Шаблоны", "Ответы", "Настройки"];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">👤 Профиль</h1>

      <div className="flex gap-6 border-b mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`pb-2 border-b-2 ${
              active === idx
                ? "border-blue-600 text-blue-700 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === 0 && <MyTemplates />}
      {active === 1 && <MyForms />}
      {active === 2 && <SettingsPanel />}
    </div>
  );
};

export default Profile;
