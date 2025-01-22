import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ManageSubmissionDataRow from "../../../components/Dashboard/TableRows/ManageSubmissionDataRow";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { useEffect, useState } from "react";

const ManageSubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: submissions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["submissions", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const { data } = await axiosSecure.get(
        `/worker-submission/${user.email}`
      ); // Include user.email in the URL
      return data;
    },
  });

  // State for buyer statistics
  const [buyerStats, setBuyerStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    totalPayment: 0,
  });

  // Fetch buyer statistics
  useEffect(() => {
    const fetchBuyerStats = async () => {
      try {
        const response = await axiosSecure.get("/buyer-stat");
        // console.log("Buyer Stats Response:", response.data);

        setBuyerStats({
          totalTasks: response.data.totalTasks || 0,
          pendingTasks: response.data.pendingTasks || 0,
          totalPayment: response.data.totalPayment || 0,
        });
      } catch (error) {
        // console.error("Error fetching buyer statistics:", error);
      }
    };

    fetchBuyerStats();
  }, [axiosSecure]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Manage Submission</title>
      </Helmet>

      {/* Buyer Statistics Section */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
                {/* Total Tasks Card */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40">
                    <FaTasks className="w-6 h-6 text-white" />
                  </div>
                  <div className="p-4 text-right">
                    <p className="text-sm leading-normal text-blue-gray-600">
                      Total Tasks
                    </p>
                    <h4 className="text-2xl font-semibold text-blue-gray-900">
                      {buyerStats.totalTasks}
                    </h4>
                  </div>
                </div>

                {/* Pending Tasks Card */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40">
                    <FaTasks className="w-6 h-6 text-white" />
                  </div>
                  <div className="p-4 text-right">
                    <p className="text-sm leading-normal text-blue-gray-600">
                      Pending Tasks
                    </p>
                    <h4 className="text-2xl font-semibold text-blue-gray-900">
                      {buyerStats.pendingTasks}
                    </h4>
                  </div>
                </div>

                {/* Total Payment Card */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40">
                    <BsCurrencyDollar className="w-6 h-6 text-white" />
                  </div>
                  <div className="p-4 text-right">
                    <p className="text-sm leading-normal text-blue-gray-600">
                      Total Payment
                    </p>
                    <h4 className="text-2xl font-semibold text-blue-gray-900">
                      {buyerStats.totalPayment}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Submission Table */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Worker Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Task Title
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Payable Amount
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      View Submission
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <ManageSubmissionDataRow
                      key={submission._id}
                      refetch={refetch}
                      submission={submission}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSubmission;
