import React, { useState } from "react";
// Import the necessary icons from react-icons
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 sm:text-4xl mb-4">
            Get in Touch with Us
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We'd love to hear from you! Fill out the form and we'll get back to
            you as soon as possible.
          </p>
        </div>

        {/* Flex Container for Form and Company Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div className="bg-white shadow-xl rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-4 py-3 border rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-4 py-3 border rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="youremail@example.com"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-4 py-3 border rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Write your message here..."
                    rows="6"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl text-lg font-semibold transition duration-300 hover:bg-indigo-700"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Company Info Section */}
          <div className="bg-indigo-600 text-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-6">About Our Company</h3>
            <p className="text-lg mb-6">
              We connect skilled workers with businesses that need them. Our
              platform makes it easy for workers to find tasks and for
              businesses to find skilled professionals to help them.
            </p>

            {/* Contact Info */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold">Contact Details</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <strong>Email:</strong> khalidsaifullaha3@gmail.com
                </li>
                <li>
                  <strong>Phone:</strong> +123 456 7890
                </li>
                <li>
                  <strong>Address:</strong> Mymensingh, Dhaka, Bangladesh
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-xl font-semibold">Follow Us</h4>
              <div className="mt-4 flex space-x-6">
                {/* React Icons for Social Media */}
                <a
                  href="#"
                  className="text-2xl text-white hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="text-2xl text-white hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-2xl text-white hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
