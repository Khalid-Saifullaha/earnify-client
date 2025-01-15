import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <>
      <div className="relative min-h-screen md:flex bg-white">
        <Navbar></Navbar>
        {/* Left Side: Sidebar Component */}
        <div>
          <Sidebar />
        </div>
        {/* Right Side: Dashboard Dynamic Content */}
        <div className="flex-1  md:ml-64">
          <div className="p-5 mt-24">
            {/* Outlet for dynamic contents */}
            <Outlet />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default DashboardLayout;
