import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const TopWorker = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopWorkers = async () => {
      try {
        const response = await axios.get(
          `https://earnify-amber.vercel.app/top-workers`
        );
        setWorkers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch top workers. Please try again later.");
        setLoading(false);
      }
    };

    fetchTopWorkers();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="py-10 px-4">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
          Our Top Workers
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-medium">
          Celebrate the achievements of our top performers who are making a
          difference!
        </p>
        <div className="mt-4 w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      {/* Worker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {workers.map((worker, index) => (
          <div
            key={worker._id}
            className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Decorative Accent */}
            <div
              className={`absolute top-0 left-0 w-32 h-32 rounded-br-full opacity-30 ${
                index % 3 === 0
                  ? "bg-blue-200"
                  : index % 3 === 1
                  ? "bg-purple-200"
                  : "bg-green-200"
              }`}
            ></div>

            {/* Rank Badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md">
              #{index + 1}
            </div>

            {/* Worker Image */}
            <div className="relative flex justify-center pt-10">
              <div className="relative">
                <img
                  src={worker.image || "https://via.placeholder.com/100"}
                  alt={worker.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute inset-0 rounded-full border-4 border-blue-300 opacity-50"></div>
              </div>
            </div>

            {/* Worker Details */}
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {worker.name || "N/A"}
              </h3>
              <div className="flex justify-center items-center space-x-3 bg-gray-50 py-2 px-4 rounded-full ">
                <span className="text-2xl font-extrabold text-yellow-500">
                  {worker.coins}
                </span>
                <span className="text-sm text-gray-700 font-semibold">
                  Coins Earned
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWorker;
