import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";

const UserDataRow = ({ userData, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const { name, image, email, role, coins, _id } = userData || {};

  // Handle user role update
  const updateRole = async (selectedRole) => {
    if (role === selectedRole) return;
    try {
      await axiosSecure.patch(`/user/role/${email}`, {
        role: selectedRole,
      });
      toast.success("Role updated successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data);
      // console.log(err);
    } finally {
      setIsOpen(false);
    }
  };

  // Handle user delete
  const handleDelete = async () => {
    try {
      // Delete the user by ID
      await axiosSecure.delete(`/users/${_id}`);
      toast.success("User deleted successfully!");
      setIsDeleteModalOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to delete user.");
      // console.log(error);
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={image}
                className="mx-auto w-10 rounded-full h-10"
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{coins}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => {
            setUserIdToDelete(_id);
            setIsDeleteModalOpen(true);
          }}
          className="text-gray-900 whitespace-no-wrap hover:text-red-600"
        >
          <RiDeleteBin6Fill className="text-xl" />
        </button>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-300 opacity-50 rounded-full"
          ></span>
          <span className="relative hover:text-black">Update Role</span>
        </span>
        {/* Modal for Role Update */}
        <UpdateUserModal
          updateRole={updateRole}
          role={role}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </td>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">
              Do you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelDelete}
                className="mr-4 bg-gray-300 px-4 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 px-4 py-2 rounded text-sm font-medium text-white hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};

export default UserDataRow;
