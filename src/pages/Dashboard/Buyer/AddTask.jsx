import { Helmet } from "react-helmet-async";
import AddTaskForm from "../../../components/Form/AddTaskFrom";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState({
    image: { name: "Upload Button" },
  });
  console.log(uploadImage);
  const [loading, setLoading] = useState(false);
  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const task_title = form.task_title.value;
    const task_detail = form.task_detail.value;
    const required_workers = parseInt(form.required_workers.value);
    const payable_amount = parseFloat(form.payable_amount.value);
    const completion_date = form.completion_date.value;
    const submission_info = form.submission_info.value;

    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    // buyer info
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
    // save task in db
    try {
      // post req
      await axiosSecure.post("/tasks", taskData);
      toast.success("Data Added Successfully!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Task| Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddTaskForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      ></AddTaskForm>
    </div>
  );
};

export default AddTask;
