import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import MenuItem from "./Menu/MenuItem";
import useAuth from "../../../hooks/useAuth";
import AdminMenu from "./Menu/AdminMenu";
import { Link } from "react-router-dom";
import BuyerMenu from "./Menu/BuyerMenu";
import useRole from "../../../hooks/useRole";
import WorkerMenu from "./Menu/WorkerMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [role, isLoading] = useRole();

  // Toggle Sidebar
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Close Sidebar
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="relative">
      {/* Top Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden p-4">
        <button
          onClick={toggleSidebar}
          className="mobile-menu-button p-4  focus:outline-none focus:bg-gray-200 mt-16"
        >
          {isSidebarOpen ? (
            <AiOutlineClose className="h-5 w-5" />
          ) : (
            <AiOutlineBars className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed z-10 flex flex-col justify-between bg-gray-100 w-64 space-y-6 px-2 py-4 inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Sidebar Header */}
        <div className="w-full flex px-4 py-2 shadow-lg rounded-lg justify-between items-center bg-white mx-auto">
          <Link to="/">
            <h1 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
              Earnify
            </h1>
          </Link>

          {/* Close Sidebar Icon */}
          <button onClick={closeSidebar} className="md:hidden mt-2">
            <AiOutlineClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {role === "worker" && <WorkerMenu />}
            {role === "buyer" && <BuyerMenu />}
            {role === "admin" && <AdminMenu />}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div>
          <hr />
          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
            onClick={closeSidebar}
          />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay to Close Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black opacity-50 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
