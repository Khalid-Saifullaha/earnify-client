import { Helmet } from "react-helmet-async";
import AddTaskForm from "../../../components/Form/AddTaskFrom";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // For navigation
  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Button" },
  });
  const [requiredWorkers, setRequiredWorkers] = useState(0); // State for workers
  const [payableAmount, setPayableAmount] = useState(0); // State for payable amount
  const [loading, setLoading] = useState(false);

  const totalPayable = requiredWorkers * payableAmount; // Calculate total payable

  // Fetch user's coin balance (this would come from your backend or context)
  const userCoins = user?.coins || 100; // Replace with actual user coins from context or API

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

    // Check if user has enough coins
    if (totalPayable > userCoins) {
      alert("Not enough coins. Purchase more coins.");
      navigate("/purchase-coin");
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

    console.table(taskData);

    setLoading(true);

    try {
      // Save task to the database
      await axiosSecure.post("/tasks", taskData);

      // Update user's coin balance (example, replace with backend API logic)
      const updatedCoins = userCoins - totalPayable;
      console.log(`Updated Coins: ${updatedCoins}`);

      // Show success toast
      toast.success("Task added successfully!");
    } catch (err) {
      console.error(err);
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
