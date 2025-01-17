import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";

const UpdatePlantModal = ({ setIsEditModalOpen, isOpen, onSubmit, task }) => {
  const [title, setTitle] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [submissionDetails, setSubmissionDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { title, taskDetail, submissionDetails };
    onSubmit(updatedData);
    setIsEditModalOpen(false);
  };
  const {
    image,
    task_title,
    task_detail,
    required_workers,
    payable_amount,
    _id,
  } = task || {};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsEditModalOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Plant Info
                </DialogTitle>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      defaultValue={task_title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 bg-slate-200 text-black  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="taskDetail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Task Detail
                    </label>
                    <textarea
                      id="taskDetail"
                      value={taskDetail}
                      onChange={(e) => setTaskDetail(e.target.value)}
                      rows="4"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-slate-200 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="submissionDetails"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Submission Details
                    </label>
                    <input
                      type="text"
                      id="submissionDetails"
                      value={submissionDetails}
                      onChange={(e) => setSubmissionDetails(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-slate-200 text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

UpdatePlantModal.propTypes = {
  setIsEditModalOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UpdatePlantModal;
