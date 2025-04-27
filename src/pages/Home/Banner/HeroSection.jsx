import React from "react";
import { motion } from "framer-motion";
import { FaPlayCircle, FaUsers, FaCheckCircle } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-gray-50  px-4 md:px-20 py-16 md:py-24">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Earn by completing{" "}
            <span className="text-blue-600">tasks quickly.</span>{" "}
            <span className="text-xl text-yellow-400">★</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
            className="text-gray-600 mb-8 text-lg"
          >
            Join our platform today and start completing exciting micro-tasks to
            earn real money quickly, easily, and from anywhere you want!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
            className="flex space-x-4"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-lg">
              Learn more
            </button>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-semibold py-3 px-6 rounded-full transition duration-300 flex items-center gap-2"
            >
              <FaPlayCircle className="w-5 h-5" />
              Watch video
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
            className="flex items-center gap-4 mt-8"
          >
            <FaUsers className="w-6 h-6 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Join over <span className="text-blue-600">10,000+</span> earners!
            </span>
          </motion.div>
        </div>

        {/* Right side */}
        <div className="relative">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            src="https://i.ibb.co/3YyVcLvK/pexels-canvastudio-3194523.jpg"
            alt="Smiling man"
            className="rounded-xl shadow-2xl w-full max-w-md ml-auto border border-gray-200"
          />

          {/* Review card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
            className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-4 w-64 border border-gray-200"
          >
            <div className="flex items-center mb-3">
              <img
                src="https://i.ibb.co/Xfmt9VJW/pexels-olly-3765132.jpg"
                alt="Karin Agasya"
                className="w-10 h-10 rounded-full mr-3 border border-gray-200"
              />
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Karin Agasya</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-gray-500">4.5</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              &quot;I had a very good experience while using the tasking
              application, Thanks!&quot;
            </p>

            <div className="mt-3 flex items-center gap-2 text-blue-600">
              <FaCheckCircle className="w-4 h-4" />
              <span className="font-medium text-sm">Verified User</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
