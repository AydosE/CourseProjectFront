import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="min-h-screen bg-background dark:bg-neutral-950 text-foreground transition-colors">
    <Navbar />
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <Outlet />
    </main>
  </div>
);

export default Layout;
