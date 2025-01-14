import React, { useEffect, useState } from "react";
import axios from "axios";

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
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Top Workers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workers.map((worker) => (
          <div
            key={worker._id}
            className="bg-white shadow-md p-4 rounded-lg text-center"
          >
            <img
              src={worker.image || "https://via.placeholder.com/100"} // Fallback for missing image
              alt={worker.name}
              className="w-24 h-24 mx-auto rounded-full mb-2"
            />
            <h3 className="text-lg font-semibold">{worker.name || "N/A"}</h3>
            <p className="text-gray-600">{worker.coins} Coins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWorker;
