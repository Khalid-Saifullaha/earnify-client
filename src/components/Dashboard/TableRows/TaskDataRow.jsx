import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TaskDataRow = ({ refetch, task }) => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    task_title: task?.task_title || "",
    task_detail: task?.task_detail || "",
    submission_info: task?.submission_info || "",
  });

  const {
    image,
    task_title,
    task_detail,
    required_workers,
    payable_amount,
    submission_info,
    _id,
  } = task || {};

  const handleTaskDelete = async () => {
    try {
      await axiosSecure.delete(`/tasks/${_id}`);
      toast.success("Task successfully removed.");
      refetch();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data || "Failed to delete task.");
    } finally {
      setDeleteConfirmOpen(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosSecure.patch(`/tasks/${_id}`, updatedTask);
      toast.success("Task successfully updated.");
      refetch();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data || "Failed to update task.");
    }
  };

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="block relative">
                <img
                  alt="profile"
                  src={image}
                  className="mx-auto object-cover rounded h-10 w-15 "
                />
              </div>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{task_title}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">${payable_amount}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{required_workers}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <button
            onClick={() => setDeleteConfirmOpen(true)}
            className="text-red-500 font-bold"
          >
            Delete
          </button>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-500 font-bold"
          >
            Update
          </button>
        </td>
      </tr>

      {deleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">
              Do you really want to delete this task? This process cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleTaskDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3 border border-lime-300">
            <h2 className="text-lg font-bold mb-4 text-gray-600">
              Update Task
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-600">
                Task Title
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 rounded-md bg-white focus:outline-lime-500"
                value={updatedTask.task_title}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, task_title: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-600">
                Task Details
              </label>
              <textarea
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 rounded-md bg-white focus:outline-lime-500"
                value={updatedTask.task_detail}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    task_detail: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2 text-gray-600">
                Submission Details
              </label>
              <textarea
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 rounded-md bg-white focus:outline-lime-500"
                value={updatedTask.submission_info}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    submission_info: e.target.value,
                  })
                }
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskDataRow;
