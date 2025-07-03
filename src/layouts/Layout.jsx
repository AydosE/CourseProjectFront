import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="p-6">
      <Outlet />
    </div>
  </div>
);

export default Layout;
