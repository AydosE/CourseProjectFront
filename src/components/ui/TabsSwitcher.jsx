import { useState } from "react";

export default function TabsSwitcher({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 border-b border-border dark:border-gray-700">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`pb-2 text-sm transition border-b-2 ${
              activeIndex === idx
                ? "border-blue-600 text-blue-700 dark:text-blue-400 font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground dark:hover:text-white"
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
