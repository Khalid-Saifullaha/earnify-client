import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { FaTasks, FaRegClock, FaMoneyBillWave } from "react-icons/fa";

const MyHome = () => {
  const { user } = useAuth();
  const [workerStats, setWorkerStats] = useState({
    totalSubmissions: 0,
    totalPendingSubmissions: 0,
    totalEarnings: 0,
  });
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const workerEmail = user?.email;

  useEffect(() => {
    if (!workerEmail) return;

    // Fetch Worker Stats
    const fetchWorkerStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/worker/stats`,
          {
            params: { workerEmail },
          }
        );
        setWorkerStats(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    // Fetch Approved Submissions
    const fetchApprovedSubmissions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/worker/approved-submissions`,
          {
            params: { workerEmail },
          }
        );
        setApprovedSubmissions(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWorkerStats();
    fetchApprovedSubmissions();
    setLoading(false);
  }, [workerEmail]);

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Worker Stats
      </h1>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FaTasks className="text-4xl text-indigo-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Total Submissions
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {workerStats.totalSubmissions}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FaRegClock className="text-4xl text-yellow-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Total Pending Submissions
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {workerStats.totalPendingSubmissions}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <FaMoneyBillWave className="text-4xl text-green-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Total Earnings
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            ${workerStats.totalEarnings}
          </p>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Approved Submissions
        </h2>
        {approvedSubmissions.length > 0 ? (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-gray-700">
                  Task Title
                </th>
                <th className="px-6 py-3 text-left text-gray-700">
                  Payable Amount
                </th>
                <th className="px-6 py-3 text-left text-gray-700">
                  Buyer Name
                </th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedSubmissions.map((submission, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-3 text-gray-700">
                    {submission.task_title}
                  </td>
                  <td className="px-6 py-3 text-gray-700">
                    ${submission.payable_amount}
                  </td>
                  <td className="px-6 py-3 text-gray-700">
                    {submission.buyer_name}
                  </td>
                  <td className="px-6 py-3 text-gray-700">
                    {submission.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-xl text-gray-600">
            No approved submissions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyHome;
