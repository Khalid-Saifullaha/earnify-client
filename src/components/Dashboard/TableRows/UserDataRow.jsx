import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Fill } from "react-icons/ri";
const UserDataRow = ({ userData, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { name, image, email, role, coins } = userData || {};

  // handle user role update
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
      console.log(err);
    } finally {
      setIsOpen(false);
    }
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
                className="mx-auto w-10 rounded-full h-10  "
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
        <button className="text-gray-900 whitespace-no-wrap hover:text-red-600">
          <RiDeleteBin6Fill className="text-xl" />
        </button>
      </td>

      <td className="px-5 py-5 border-b border-gray-200  bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-300  opacity-50 rounded-full  "
          ></span>
          <span className="relative hover:text-black">Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserModal
          updateRole={updateRole}
          role={role}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
