import { Helmet } from "react-helmet-async";
import AddTaskForm from "../../../components/Form/AddTaskFrom";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { user, setUser } = useAuth(); // Destructure `setUser` to update the user state
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Button" },
  });
  const [requiredWorkers, setRequiredWorkers] = useState(0);
  const [payableAmount, setPayableAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalPayable = requiredWorkers * payableAmount;
  const userCoins = user?.coins || 100;

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const task_title = form.task_title.value;
    const task_detail = form.task_detail.value;
    const completion_date = form.completion_date.value;
    const submission_info = form.submission_info.value;
    const required_workers = parseInt(form.required_workers.value);
    const payable_amount = parseFloat(form.payable_amount.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    // Calculate total payable
    const totalPayable = required_workers * payable_amount;

    // Check if user has enough coins
    if (totalPayable > userCoins) {
      toast.error("Not enough coins. Purchase more coins.");
      navigate("/dashboard/purchase-coin");
      return;
    }

    // Buyer info
    const buyer = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };

    // Create task data object
    const taskData = {
      task_title,
      task_detail,
      required_workers,
      payable_amount,
      completion_date,
      submission_info,
      image: imageUrl,
      buyer,
    };

    // console.table(taskData);

    setLoading(true);

    try {
      // Save task to the database
      const response = await axiosSecure.post("/tasks", taskData);

      // If task added successfully, update coins
      if (response.data.updatedCoins !== undefined) {
        // console.log(`Updated Coins: ${response.data.updatedCoins}`);

        // Fetch the updated user data to get the new coin balance
        const updatedUserResponse = await axiosSecure.get(
          `/users/${user.email}`
        );

        // Assuming the response contains the updated user data with the new coin balance
        if (
          updatedUserResponse.data &&
          updatedUserResponse.data.coins !== undefined
        ) {
          // Update the user state with the new coins balance
          setUser((prevUser) => ({
            ...prevUser,
            coins: updatedUserResponse.data.coins,
          }));
        }
      }

      // Show success toast
      toast.success("Task added successfully!");
      navigate("/dashboard/my-task");
    } catch (err) {
      // console.error(err);
      toast.error("Failed to add the task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Task | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddTaskForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        setRequiredWorkers={setRequiredWorkers} // Pass setter for required workers
        setPayableAmount={setPayableAmount} // Pass setter for payable amount
        totalPayable={totalPayable} // Pass calculated total
        loading={loading}
      />
    </div>
  );
};

export default AddTask;
