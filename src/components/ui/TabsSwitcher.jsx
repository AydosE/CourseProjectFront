import { useState } from "react";

export default function TabsSwitcher({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="flex gap-6 border-b mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`pb-2 border-b-2 transition ${
              activeIndex === idx
                ? "border-blue-600 text-blue-700 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{tabs[activeIndex]?.content}</div>
    </div>
  );
}
