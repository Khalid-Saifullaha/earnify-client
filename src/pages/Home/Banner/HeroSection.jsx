import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gray-50 px-4 md:px-16 py-16 md:py-24">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Earn by completing tasks{" "}
            <span className="text-blue-500">quickly.</span>{" "}
            <span className="text-xl">★</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Join our platform today and start completing exciting micro-tasks to
            earn real money quickly, easily, and from anywhere you want!
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition duration-300">
              Learn more
            </button>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 font-semibold py-3 px-6 rounded-md transition duration-300 flex items-center"
            >
              ▶ Watch video
            </a>
          </div>
        </div>

        {/* Right Side Content with Image and Review */}
        <div className="relative">
          <img
            src="https://i.ibb.co/3YyVcLvK/pexels-canvastudio-3194523.jpg"
            alt="Smiling man with a backpack"
            className="rounded-lg shadow-lg w-full max-w-md ml-auto"
          />

          {/* Review Section */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-4 w-64 z-2">
            <div className="flex items-center mb-2">
              <img
                src="https://i.ibb.co/Xfmt9VJW/pexels-olly-3765132.jpg"
                alt="Karin Agasya"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="text-sm">
                <p className="font-semibold text-gray-800">Karin Agasya</p>
                <p className="text-yellow-400">★★★★★ 4.5</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              &quot;I had a very good experience while using the tasking
              application, Thanks!&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
