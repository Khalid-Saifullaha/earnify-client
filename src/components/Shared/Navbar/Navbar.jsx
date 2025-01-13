// Import necessary modules and libraries
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
                <>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                  >
                    Dashboard
                  </Link>
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
                  <a
                    href="https://github.com/your-client-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-500 hover:underline"
                  >
                    Join as Developer
                  </a>
                </>
              ) : (
                <>
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
                    href="https://github.com/your-client-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-500 hover:underline"
                  >
                    Join as Developer
                  </a>
                </>
              )}
            </div>

            {/* Dropdown Menu for Smaller Screens */}
            <div className="relative md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border border-gray-300 rounded-full focus:outline-none hover:shadow-md"
              >
                <AiOutlineMenu size={20} />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <div className="py-1">
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Home
                    </Link>
                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <div className="flex items-center gap-2 px-4 py-2">
                          <img
                            src={user.photoURL || avatarImg}
                            alt="User Avatar"
                            className="h-6 w-6 rounded-full border border-gray-300"
                          />
                          <span className="text-sm text-gray-700">
                            {user.displayName || "User"}
                          </span>
                        </div>
                        <button
                          onClick={logOut}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                        <a
                          href="https://github.com/your-client-repo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-blue-500 hover:underline"
                        >
                          Join as Developer
                        </a>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Up
                        </Link>
                        <a
                          href="https://github.com/your-client-repo"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-sm text-blue-500 hover:underline"
                        >
                          Join as Developer
                        </a>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
