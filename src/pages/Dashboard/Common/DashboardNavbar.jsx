import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { FaCoins } from "react-icons/fa";
import { FiBell, FiX } from "react-icons/fi";

const DashboardNavbar = () => {
  const { user, loading, logOut } = useAuth();
  const [role, isLoading] = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [availableCoins, setAvailableCoins] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${user.email}`
          );
          setAvailableCoins(response.data?.coins || 0);
        } catch (error) {
          console.error("Error fetching coins:", error);
        }
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/notifications/${user.email}`
        );
        setNotifications(response.data || []);
        const unread = response.data?.filter((n) => !n.isRead).length || 0;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchCoins();
    fetchNotifications();
  }, [user]);

  const handleMarkAsRead = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/notifications/mark-read/${user.email}`
      );
      setUnreadCount(0);
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true }))
      );
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  if (loading || isLoading) return <LoadingSpinner />;

  return (
    <div className="fixed w-full bg-blue-600 z-10 shadow-lg">
      <div className="py-4 border-b-2 border-gray-300">
        <div className="container mx-auto flex items-center justify-between px-4 md:pl-40">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-3xl font-semibold text-white bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
              Earnify
            </h1>
          </Link>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden flex items-center" onClick={toggleMenu}>
            <button className="text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items for Larger Screens */}
          <div className="hidden md:flex items-center gap-6">
            <div className="font-medium text-white flex items-center gap-2">
              Available Coins: <FaCoins className="text-yellow-300" />
              <span>{availableCoins}</span>
            </div>
            <div className="font-medium text-white flex items-center gap-2">
              <h2>{role}</h2>
            </div>
            <img
              referrerPolicy="no-referrer"
              src={user?.photoURL || avatarImg}
              alt="User Avatar"
              className="h-10 w-10 rounded-full border-2 border-white cursor-pointer hover:border-gray-400 transition"
              onClick={() => setProfileOpen(!profileOpen)}
            />
            <div className="font-medium text-white flex items-center gap-2">
              {user.displayName || "User"}
            </div>
            <div className="relative">
              <FiBell
                className="w-6 h-6 text-white cursor-pointer"
                onClick={handleMarkAsRead}
              />
              {unreadCount > 0 && (
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-gray-800 bg-opacity-50 md:hidden">
          <div className="absolute right-0 top-0 w-3/4 bg-white h-full shadow-lg">
            <div className="flex justify-end p-4">
              <button onClick={closeMenu} className="text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center mt-8 space-y-6">
              <div className="text-lg font-medium text-gray-600">
                Available Coins:{" "}
                <span className="text-black">{availableCoins}</span>
              </div>
              <div className="text-lg font-medium text-gray-600">
                Notifications: {unreadCount}
              </div>
              <button
                onClick={logOut}
                className="text-lg font-medium text-gray-600 hover:text-gray-900 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
