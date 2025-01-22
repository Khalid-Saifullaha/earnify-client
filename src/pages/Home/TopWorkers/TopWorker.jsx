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
          `${import.meta.env.VITE_API_URL}/top-workers`
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
    <div className="py-10 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-10">
        Top Workers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
        {workers.map((worker) => (
          <div
            key={worker._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="bg-gradient-to-b from-indigo-600 to-purple-600 p-4">
              <img
                src={worker.image || "https://via.placeholder.com/100"}
                alt={worker.name}
                className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {worker.name || "N/A"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {worker.email || "No Email"}
              </p>
              <div className="mt-4">
                <span className="text-xl font-bold text-yellow-500">
                  {worker.coins}
                </span>{" "}
                <span className="text-sm text-gray-600">Coins</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWorker;
