import Container from "../../components/Shared/Container";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const TaskDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [submissionDetails, setSubmissionDetails] = useState("");
  const [completionDate, setCompletionDate] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmissionDetailsChange = (event) => {
    setSubmissionDetails(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const task_title = form.task_title.value;
    const task_detail = form.task_detail.value;
    const required_workers = parseInt(form.required_workers.value);
    const payable_amount = parseFloat(form.payable_amount.value);
    const completion_date = form.completion_date.value;
    const submission_info = form.submission_info.value;
    const worker_name = form.worker_name.value;
    const buyer_name = form.buyer_name.value;
    const buyer_email = form.buyer_email.value;
    const submission_details = form.submission_details.value;
    const imageUrl = uploadImage?.image || null;
    const current_date = new Date().toLocaleString();
    const status = "pending";

    const formData = {
      task_title,
      task_detail,
      required_workers,
      payable_amount,
      completion_date,
      submission_info,
      image: imageUrl,
      worker_name,
      buyer_name,
      buyer_email,
      submission_details,
      current_date,
      status,
    };

    console.log("Form Data:", formData);
    setLoading(true);
    // Simulate form submission (replace with actual logic)
    setTimeout(() => {
      setLoading(false);
      alert("Form submitted successfully!");
    }, 2000);
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
    required_workers,
    payable_amount,
    completion_date,
    submission_info,
    image: imageUrl,
    buyer,
  } = task || {};
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <Container>
      <Helmet>
        <title>Task Details</title>
      </Helmet>
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
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="task_title"
                  id="task_title"
                  defaultValue={task_title}
                  disabled
                  type="text"
                  required
                />
              </div>

              {/* Task Detail */}
              <div className="space-y-1 text-sm">
                <label htmlFor="task_detail" className="block text-gray-600">
                  Task Detail
                </label>
                <textarea
                  id="task_detail"
                  defaultValue={task_detail}
                  disabled
                  className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500"
                  name="task_detail"
                  required
                ></textarea>
              </div>

              {/* Required Workers */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="required_workers"
                  className="block text-gray-600"
                >
                  Required Workers
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="required_workers"
                  id="required_workers"
                  type="number"
                  defaultValue={payable_amount}
                  required
                />
              </div>

              {/* Worker Name */}
              <div className="space-y-1 text-sm">
                <label htmlFor="worker_name" className="block text-gray-600">
                  Worker Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="worker_name"
                  id="worker_name"
                  type="text"
                  defaultValue={user?.displayName}
                  required
                />
              </div>
            </div>

            <div className="space-y-6 flex flex-col">
              {/* Payable Amount */}
              <div className="space-y-1 text-sm">
                <label htmlFor="payable_amount" className="block text-gray-600">
                  Payable Amount (per worker)
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="payable_amount"
                  id="payable_amount"
                  type="number"
                  defaultValue={payable_amount}
                  disabled
                  required
                />
              </div>

              {/* Completion Date */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="completion_date"
                  className="block text-gray-600"
                >
                  Completion Date
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="completion_date"
                  id="completion_date"
                  type="date"
                  required
                />
              </div>

              {/* Submission Info */}
              <div className="space-y-1 text-sm">
                <label
                  htmlFor="submission_info"
                  className="block text-gray-600"
                >
                  Submission Info
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="submission_info"
                  id="submission_info"
                  type="text"
                  placeholder="e.g., Screenshot or proof"
                  required
                />
              </div>

              {/* Buyer Name */}
              <div className="space-y-1 text-sm">
                <label htmlFor="buyer_name" className="block text-gray-600">
                  Buyer Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
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
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
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
                  id="submission_details"
                  placeholder="Enter submission details"
                  className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500"
                  name="submission_details"
                  value={submissionDetails}
                  onChange={(e) => setSubmissionDetails(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="p-4 w-full m-auto rounded-lg flex-grow">
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        onChange={(e) =>
                          setUploadImage({
                            image: e.target.files[0],
                            url: URL.createObjectURL(e.target.files[0]),
                          })
                        }
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                        {uploadImage?.image?.name || "Upload Image"}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              {uploadImage && uploadImage?.image?.size && (
                <div className="flex gap-5 items-center">
                  <img className="w-20" src={uploadImage?.url} alt="" />
                  <p>Image Size: {uploadImage?.image?.size} Bytes</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
              >
                {loading ? (
                  <div className="animate-spin m-auto">Loading...</div>
                ) : (
                  "Save & Continue"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default TaskDetails;
