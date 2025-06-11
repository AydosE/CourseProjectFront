import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const Layout = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="p-6">
      <Outlet />
    </div>
  </div>
);

export default Layout;
