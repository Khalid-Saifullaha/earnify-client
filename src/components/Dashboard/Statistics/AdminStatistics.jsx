import { Calendar } from "react-date-range";
import { BsFillPeopleFill, BsCurrencyDollar } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  // State to hold statistics
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalAvailableCoins: 0,
  });

  // Fetch admin statistics on component mount
  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await axiosSecure.get("/admin-stat");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching admin statistics:", error);
      }
    };

    fetchAdminStats();
  }, [axiosSecure]);

  return (
    <div>
      <div className="mt-12">
        {/* small cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
          {/* Total Workers Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <FaUsers className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Workers
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {stats.totalWorkers}
              </h4>
            </div>
          </div>

          {/* Total Buyers Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              <BsFillPeopleFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Buyers
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {stats.totalBuyers}
              </h4>
            </div>
          </div>

          {/* Total Available Coins Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40`}
            >
              <BsCurrencyDollar className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Available Coins
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {stats.totalAvailableCoins}
              </h4>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {/* Withdraw request */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <h2>Withdraw request</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
