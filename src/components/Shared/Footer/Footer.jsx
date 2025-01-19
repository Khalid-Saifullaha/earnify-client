import React from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Website Name Section */}
        <div className="flex justify-center mb-4">
          <h1 className="text-2xl font-bold">Earnify</h1>
        </div>
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://www.facebook.com/md.khalid.saifullaha/map"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-blue-500 hover:text-blue-400 transition"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/khalid-saifullaha/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-blue-700 hover:text-blue-600 transition"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/Khalid-Saifullaha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-400 hover:text-gray-300 transition"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://x.com/khalid112288"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            <FaTwitter size={24} />
          </a>
        </div>
        {/* Copyright Section */}
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Earnify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
