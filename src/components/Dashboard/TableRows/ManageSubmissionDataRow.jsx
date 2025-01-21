import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const ManageSubmissionDataRow = ({ submission, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const {
    _id,
    worker_name,
    task_title,
    payable_amount,
    submission_info,
    status,
    task_id,
  } = submission || {};

  // Handle Approve
  const handleApprove = async () => {
    try {
      const response = await axiosSecure.patch(
        `/worker/status/approve/${_id}`,
        {
          status: "approved",
          payable_amount: payable_amount,
        }
      );
      // Show notification to user
      toast.success("Submission approved successfully!");
      // Trigger re-fetch to update UI
      refetch();
      setIsApproved(true);
      setIsRejected(false);
      // Add the notification UI logic (trigger a pop-up or visual indicator)
      showNotification(
        "Submission approved",
        `You have earned ${payable_amount} from ${worker_name} for completing ${task_title}.`
      );
    } catch (error) {
      toast.error("Failed to approve submission.");
      console.error(error);
    }
  };

  // Handle Reject
  const handleReject = async () => {
    try {
      const response = await axiosSecure.patch(`/worker/status/reject/${_id}`, {
        status: "rejected",
        task_id: task_id,
      });
      // Show notification to user
      toast.success("Submission rejected successfully!");
      // Trigger re-fetch to update UI
      refetch();
      setIsRejected(true);
      setIsApproved(false);
      // Add the notification UI logic (trigger a pop-up or visual indicator)
      showNotification(
        "Submission rejected",
        `Your submission for task "${task_title}" was rejected.`
      );
    } catch (error) {
      toast.error("Failed to reject submission.");
      console.error(error);
    }
  };

  // Show notification function (you can implement your own UI pop-up here)
  const showNotification = (title, message) => {
    const notification = {
      title: title,
      message: message,
      time: new Date(),
    };
    // You can use any state or library to show the notification
    console.log("Notification:", notification);
    // Here you could call a custom hook or use a state to display the notification
  };

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{worker_name}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{task_title}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{payable_amount}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-500 hover:underline"
          >
            View Submission
          </button>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p
            className={`whitespace-no-wrap font-semibold ${
              status === "approved"
                ? "text-green-500"
                : status === "rejected"
                ? "text-red-500"
                : "text-gray-900"
            }`}
          >
            {status}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex space-x-2">
            <button
              onClick={handleApprove}
              className={`px-3 py-1 text-white rounded ${
                isRejected || status === "approved"
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              disabled={isRejected || status === "approved"}
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className={`px-3 py-1 text-white rounded ${
                isApproved || status === "rejected"
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={isApproved || status === "rejected"}
            >
              Reject
            </button>
          </div>
        </td>
      </tr>

      {/* Modal for Viewing Submission */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-lg font-bold mb-4">Submission Details</h2>
            <p className="mb-6 text-gray-700">{submission_info}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageSubmissionDataRow;
