// Import necessary modules and libraries
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Container from "../Container";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [availableCoins, setAvailableCoins] = useState(0);

  // Fetch coins when user is logged in
  useEffect(() => {
    const fetchCoins = async () => {
      if (user?.email) {
        try {
          console.log("Fetching coins for user:", user.email);
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${user.email}`
          );
          console.log("Response from API:", response.data);
          setAvailableCoins(response.data?.coins || 0);
        } catch (error) {
          console.error("Error fetching coins:", error);
        }
      }
    };

    fetchCoins();
  }, [user]);

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="logo" className="h-10 md:h-12" />
            </Link>

            {/* Menu for Larger Screens */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                Home
              </Link>
              {user ? (
                <div className="flex items-center gap-6">
                  {/* Dashboard Link */}
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                  >
                    Dashboard
                  </Link>

                  {/* Available Coins */}
                  <div className="text-sm font-medium text-gray-600">
                    Available Coins: {availableCoins}
                  </div>

                  {/* User Profile and Logout */}
                  <div className="relative">
                    <img
                      src={user.photoURL || avatarImg}
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full border border-gray-300 cursor-pointer"
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
                    className="text-sm font-medium text-blue-500 hover:underline"
                  >
                    Join as Developer
                  </a>
                </div>
              ) : (
                <>
                  {/* Links for Non-Logged-in Users */}
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                  >
                    Sign Up
                  </Link>
                  <a
                    href="https://github.com/Khalid-Saifullaha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-500 hover:underline"
                  >
                    Join as Developer
                  </a>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
