import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Container from "../Container";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { FaCoins } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [availableCoins, setAvailableCoins] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      if (user?.email) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${user.email}`
          );
          setAvailableCoins(response.data?.coins || 0);
        } catch (error) {
          // console.error("Error fetching coins:", error);
        }
      }
    };

    fetchCoins();
  }, [user]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed w-full bg-blue-600 z-10 shadow-lg">
      <div className="py-4 border-b-2 border-gray-300">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <h1 className="text-3xl font-semibold text-white bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
                Earnify
              </h1>
            </Link>

            {/* Hamburger Menu Icon for Mobile */}
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

            {/* Menu for Larger Screens */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="font-medium text-white hover:text-gray-100 transition"
              >
                Home
              </Link>
              {user ? (
                <div className="flex items-center gap-6">
                  {/* Dashboard Link */}
                  <Link
                    to="/dashboard"
                    className="font-medium text-white hover:text-gray-100 transition"
                  >
                    Dashboard
                  </Link>

                  {/* Available Coins */}
                  <div className="font-medium text-white flex items-center gap-1">
                    Available Coins: <FaCoins className="text-yellow-300" />
                    <span>{availableCoins}</span>
                  </div>

                  {/* User Profile */}
                  <div className="relative">
                    <img
                      referrerPolicy="no-referrer"
                      src={user.photoURL || avatarImg}
                      alt="User Avatar"
                      className="h-10 w-10 rounded-full border-2 border-white cursor-pointer hover:border-gray-400 transition"
                      onClick={() => setProfileOpen(!profileOpen)}
                    />
                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                        <div className="py-1">
                          <div className="px-4 py-2 text-sm text-gray-700">
                            {user.displayName || "User"}
                          </div>
                          <button
                            onClick={logOut}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Join as Developer */}
                  <a
                    href="https://github.com/Khalid-Saifullaha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-400 hover:underline"
                  >
                    Join as Developer
                  </a>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-white hover:text-gray-100 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-white hover:text-gray-100 transition"
                  >
                    Sign Up
                  </Link>
                  <a
                    href="https://github.com/Khalid-Saifullaha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-400 hover:underline"
                  >
                    Join as Developer
                  </a>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Menu (Sidebar) */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-gray-800 bg-opacity-50 md:hidden">
          <div className="absolute right-0 top-0 w-3/4 bg-white h-full shadow-lg">
            <div className="flex justify-end p-4">
              <button onClick={closeMenu} className="text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center mt-8 space-y-6 text-center">
              <Link
                to="/"
                className="text-lg font-medium text-gray-600 hover:text-gray-900 transition"
                onClick={closeMenu}
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-lg font-medium text-gray-600 hover:text-gray-900 transition"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <div className="text-lg font-medium text-gray-600">
                    Available Coins:{" "}
                    <span className="text-black">{availableCoins}</span>
                  </div>

                  <div className="relative">
                    <img
                      src={user.photoURL || avatarImg}
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full border border-gray-300 cursor-pointer"
                      onClick={() => setProfileOpen(!profileOpen)}
                    />
                    {profileOpen && (
                      <div className="absolute right-12 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                        <div className="py-1">
                          <div className="px-4 py-2 text-sm text-gray-700">
                            {user.displayName || "User"}
                          </div>
                          <button
                            onClick={logOut}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <a
                    href="https://github.com/Khalid-Saifullaha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-blue-500 hover:underline"
                  >
                    Join as Developer
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-lg font-medium text-gray-600 hover:text-gray-900 transition"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-lg font-medium text-gray-600 hover:text-gray-900 transition"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                  <a
                    href="https://github.com/Khalid-Saifullaha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-blue-500 hover:underline"
                  >
                    Join as Developer
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
