import { BsFillPeopleFill, BsCurrencyDollar } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  // State to hold statistics
  const [stats, setStats] = useState({
    totalWorkers: 0,
    totalBuyers: 0,
    totalAvailableCoins: 0,
  });

  // State for withdrawals
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch admin statistics and withdrawals on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch statistics
        const response = await axiosSecure.get("/admin-stat");
        setStats(response.data);

        // Fetch withdrawal requests
        const withdrawalsResponse = await axiosSecure.get("/withdrawals");
        setWithdrawals(withdrawalsResponse.data);
      } catch (error) {
        console.error("Error fetching admin statistics or withdrawals:", error);
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [axiosSecure]);

  const handleApproveWithdrawal = async (
    withdrawalId,
    workerEmail,
    withdrawalAmount
  ) => {
    try {
      const response = await axiosSecure.post("/approveWithdrawal", {
        withdrawalId,
        userEmail: workerEmail,
        withdrawalAmount,
      });

      // Update the withdrawals state to reflect the approved withdrawal
      setWithdrawals((prevWithdrawals) =>
        prevWithdrawals.filter((withdrawal) => withdrawal._id !== withdrawalId)
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      toast.error("Failed to approve withdrawal.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mt-12">
        {/* Statistics Cards */}
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

        {/* Withdraw Requests Table */}
        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <h2 className="text-xl font-semibold mb-4 px-4 pt-4">
              Withdraw Requests
            </h2>
            {withdrawals.length > 0 ? (
              <div className="overflow-x-auto px-4">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Worker Email</th>
                      <th className="px-4 py-2 border">Withdrawal Coin</th>
                      <th className="px-4 py-2 border">Withdrawal Amount</th>
                      <th className="px-4 py-2 border">Status</th>
                      <th className="px-4 py-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((withdrawal) => (
                      <tr key={withdrawal._id}>
                        <td className="px-4 py-2 border">
                          {withdrawal.worker_email}
                        </td>
                        <td className="px-4 py-2 border">
                          {withdrawal.withdrawal_coin}
                        </td>
                        <td className="px-4 py-2 border">
                          {withdrawal.withdrawal_amount}
                        </td>
                        <td className="px-4 py-2 border">
                          {withdrawal.status}
                        </td>
                        <td className="px-4 py-2 border">
                          {withdrawal.status === "pending" && (
                            <button
                              onClick={() =>
                                handleApproveWithdrawal(
                                  withdrawal._id,
                                  withdrawal.worker_email,
                                  withdrawal.withdrawal_amount
                                )
                              }
                              className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                              Payment Success
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="px-4 pb-4">No pending withdrawal requests.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
