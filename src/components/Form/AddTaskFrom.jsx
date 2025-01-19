import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbFidgetSpinner } from "react-icons/tb";

const AddTaskForm = ({
  handleSubmit,
  uploadImage,
  setUploadImage,
  loading,
  setRequiredWorkers,
  setPayableAmount,
  totalPayable,
}) => {
  const [completionDate, setCompletionDate] = useState(null);

  return (
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
                type="text"
                placeholder="e.g., Watch my YouTube video and make a comment"
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
                placeholder="Detailed description of the task"
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500"
                name="task_detail"
                required
              ></textarea>
            </div>

            {/* Required Workers */}
            <div className="space-y-1 text-sm">
              <label htmlFor="required_workers" className="block text-gray-600">
                Required Workers
              </label>
              <input
                onChange={(e) =>
                  setRequiredWorkers(Math.max(0, parseInt(e.target.value) || 0))
                }
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="required_workers"
                id="required_workers"
                type="number"
                placeholder="e.g., 100"
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
                onChange={(e) =>
                  setPayableAmount(Math.max(0, parseFloat(e.target.value) || 0))
                }
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="payable_amount"
                id="payable_amount"
                type="number"
                placeholder="e.g., 10"
                required
              />
            </div>

            {/* Completion Date */}
            <div className="space-y-1 text-sm">
              <label htmlFor="completion_date" className="block text-gray-600">
                Completion Date
              </label>
              <DatePicker
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                selected={completionDate}
                onChange={(date) => setCompletionDate(date)}
                placeholderText="Select a completion date"
                dateFormat="yyyy-MM-dd"
                required
                name="completion_date"
                id="completion_date"
              />
            </div>

            {/* Submission Info */}
            <div className="space-y-1 text-sm">
              <label htmlFor="submission_info" className="block text-gray-600">
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
                      {uploadImage?.image?.name}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview Uploaded Image */}
            {uploadImage?.image?.size && (
              <div className="flex gap-5 items-center">
                <img className="w-20" src={uploadImage?.url} alt="" />
                <p>Image Size: {uploadImage?.image?.size} Bytes</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
              disabled={totalPayable <= 0}
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                `Save & Continue (Total: ${totalPayable} Coins)`
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
