import Navbar from "@/components/Navbar";
import SupportModal from "@/components/SupportModal";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import API from "@/api/axios";

const Layout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  const handleSubmit = async ({ summary, priority }) => {
    const ticket = {
      reported_by: "aidos@example.com", // подставь динамически
      template: "Integration Viewer", // или получай из контекста
      link: window.location.href,
      priority,
      admins: ["admin1@example.com", "admin2@example.com"],
      summary,
    };

    try {
      await API.post("/tickets/upload", ticket);
      console.log("Тикет успешно отправлен");
    } catch (err) {
      console.error("Ошибка загрузки тикета:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-neutral-950 text-foreground transition-colors">
      <Navbar />
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-3 right-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors shadow"
      >
        Help
      </button>

      <SupportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Layout;
