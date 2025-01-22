import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";

const MySubmission = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);

  const {
    data: { submissions = [], totalPages = 1 } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["submissions", user?.email, page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-submission/${user?.email}?page=${page}`
      );
      return data;
    },
    keepPreviousData: true,
    staleTime: 0,
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error loading submissions. Please try again.</div>;

  return (
    <>
      <Helmet>
        <title>My Submission</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Task Title
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Buyer Name
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Payable Amount
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Submission Date
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.length > 0 ? (
                    submissions.map((submission) => (
                      <tr key={submission._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {submission.task_title}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {submission.buyer_name}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {submission.payable_amount}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {submission.current_date}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span
                            className={`font-bold px-2 py-1 rounded ${
                              submission.status === "pending"
                                ? "text-red-600 bg-red-100"
                                : "text-green-600 bg-green-100"
                            }`}
                          >
                            {submission.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500"
                      >
                        No submissions available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination Controls */}
              <div className="flex justify-center items-center space-x-4 mt-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    page === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white "
                  }`}
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-lg font-bold text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-md font-semibold ${
                    page === totalPages
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MySubmission;
