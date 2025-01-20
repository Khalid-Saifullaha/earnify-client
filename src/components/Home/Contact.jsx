import React, { useState } from "react";

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
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We’d love to hear from you! Fill out the form below, and we’ll get
            back to you as soon as possible.
          </p>
        </div>

        {/* Flex Container for Two Divs */}
        <div className="flex flex-wrap justify-between gap-8">
          {/* Contact Form Div */}
          <div className="flex-1 bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-lg font-semibold text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    placeholder="Write your message"
                    rows="6"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white py-3 px-6 rounded-lg text-lg font-medium"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Engaging Company Info Section */}
          <div className="flex-1 bg-gradient-to-r from-lime-400 to-lime-600 text-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">About Our Company</h3>
            <p className="text-lg mb-6">
              We are dedicated to connecting workers and buyers through an
              easy-to-use platform. Our mission is to provide opportunities for
              people to earn and for businesses to find skilled workers for
              their tasks.
            </p>

            {/* Contact Info */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold">Contact Information</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <strong>Email:</strong> khalidsaifullaha3@gmail.com
                </li>
                <li>
                  <strong>Phone:</strong> +123 456 7890
                </li>
                <li>
                  <strong>Address:</strong> Myminshing, Dhaka,Banyladesh
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-xl font-semibold">Follow Us</h4>
              <div className="mt-4 flex space-x-6">
                <a href="#" className="text-2xl text-white hover:text-gray-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-2xl text-white hover:text-gray-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-2xl text-white hover:text-gray-300">
                  <i className="fab fa-instagram"></i>
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
