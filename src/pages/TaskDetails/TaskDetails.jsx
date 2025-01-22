import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TaskDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalWorkers, setTotalWorkers] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const task_id = form.task_id.value;
    const task_title = form.task_title.value;
    const payable_amount = parseFloat(form.payable_amount.value);
    const worker_name = form.worker_name.value;
    const worker_email = form.worker_email.value;
    const buyer_name = form.buyer_name.value;
    const buyer_email = form.buyer_email.value;
    const current_date = new Date().toISOString().split("T")[0];
    const status = "pending";
    const submission_info = form.submission_info.value;

    const submitData = {
      task_id,
      task_title,
      payable_amount,
      worker_name,
      task_detail,
      worker_email,
      buyer_name,
      buyer_email,
      current_date,
      status,
      submission_info,
    };

    // console.table("Form Data:", submitData);
    setLoading(true);
    // post request db
    try {
      // save data in db
      await axiosSecure.post("/submit-task", submitData);
      //  decrease quantity from task collection
      await axiosSecure.patch(`/tasks/required_workers/${_id}`, {
        required_workersToUpdate: totalWorkers,
      });
      toast.success("Task submitted successfully!");
      refetch();
      navigate("/dashboard/my-submission");
    } catch (error) {
      // console.error("Error submitting task:", error);
      alert("Failed to submit task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const {
    data: task = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`
      );
      return data;
    },
  });

  const {
    task_title,
    task_detail,
    payable_amount,
    required_workers,
    completion_date,
    submission_info,
    image: imageUrl,
    buyer,
    _id,
  } = task || {};
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <Container>
      <Helmet>
        <title>Task Details</title>
      </Helmet>
      <div className="grid md:grid-cols-2">
        <div className="max-w-3xl mx-auto bg-white  rounded-lg overflow-hidden mt-8">
          <div className=" text-base text-center py-4">
            <h2 className="text-2xl font-bold">
              The Task and Submission Information
            </h2>
          </div>
          <div className="p-6">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Task"
                className="w-full h-auto rounded-lg mb-4"
              />
            )}
            <div className="mb-4">
              <span className="font-bold text-gray-700">Task Title:</span>{" "}
              {task_title || "N/A"}
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700">Task Detail:</span>{" "}
              {task_detail || "N/A"}
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700">Required Workers:</span>{" "}
              {required_workers || "N/A"}
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700">Payable Amount:</span> $
              {payable_amount || "N/A"}
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700">Completion Date:</span>{" "}
              {completion_date || "N/A"}
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700">
                Submission Information:
              </span>{" "}
              {submission_info || "N/A"}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <span className="font-bold text-gray-700">Buyer:</span>{" "}
              {buyer.name || "N/A"}
            </div>
          </div>
        </div>

        {/* task form */}
        <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                {/* Task Title */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="task_title" className="block text-gray-600">
                    Task Title
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-600 focus:outline-lime-500 rounded-md bg-white"
                    name="task_title"
                    id="task_title"
                    defaultValue={task_title}
                    disabled
                    type="text"
                    required
                  />
                </div>

                {/* Task ID */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="task_id" className="block text-gray-600">
                    Task ID
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-600 focus:outline-lime-500 rounded-md bg-white"
                    name="task_id"
                    id="task_id"
                    defaultValue={_id}
                    disabled
                    type="text"
                    required
                  />
                </div>

                {/* Worker Name */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="worker_name" className="block text-gray-600">
                    Worker Name
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-600 focus:outline-lime-500 rounded-md bg-white"
                    name="worker_name"
                    id="worker_name"
                    type="text"
                    defaultValue={user?.displayName}
                    required
                  />
                </div>

                {/* Worker Email */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="worker_email" className="block text-gray-600">
                    Worker Email
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-600 focus:outline-lime-500 rounded-md bg-white"
                    name="worker_email"
                    id="worker_email"
                    type="email"
                    defaultValue={user?.email}
                    required
                  />
                </div>
              </div>

              <div className="space-y-6 flex flex-col">
                {/* Payable Amount */}
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="payable_amount"
                    className="block text-gray-600"
                  >
                    Payable Amount (per worker)
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-600 focus:outline-lime-500 rounded-md bg-white"
                    name="payable_amount"
                    id="payable_amount"
                    type="number"
                    defaultValue={payable_amount}
                    disabled
                    required
                  />
                </div>

                {/* Current Date */}

                <div className="space-y-1 text-sm">
                  <label htmlFor="current_date" className="block text-gray-600">
                    Current Date
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-600 focus:outline-lime-500 rounded-md bg-white"
                    name="current_date"
                    id="current_date"
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                {/* Buyer Name */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="buyer_name" className="block text-gray-600">
                    Buyer Name
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-600 focus:outline-lime-500 rounded-md bg-white"
                    name="buyer_name"
                    id="buyer_name"
                    type="text"
                    defaultValue={buyer.name}
                    required
                  />
                </div>

                {/* Buyer Email */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="buyer_email" className="block text-gray-600">
                    Buyer Email
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-purple-600 focus:outline-lime-500 rounded-md bg-white"
                    name="buyer_email"
                    id="buyer_email"
                    type="email"
                    defaultValue={buyer.email}
                    disabled
                    required
                  />
                </div>

                {/* Submission Details */}
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="submission_details"
                    className="block text-gray-600"
                  >
                    Submission Details
                  </label>
                  <textarea
                    id="submission_info"
                    placeholder="Enter submission details"
                    className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800 border border-purple-600 bg-white focus:outline-lime-500"
                    name="submission_info"
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-center items-center ">
                <button
                  type="submit"
                  className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-gradient-to-r from-indigo-600 to-purple-600"
                >
                  {loading ? (
                    <div>
                      <TbFidgetSpinner className="animate-spin m-auto"></TbFidgetSpinner>
                    </div>
                  ) : (
                    "Task Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default TaskDetails;
