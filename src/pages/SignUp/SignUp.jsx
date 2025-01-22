import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

import { imageUpload } from "../../api/utils";
import axios from "axios";

const SignUp = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();

  // form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const image = form.image.files[0];

    // Upload the image
    const photoURL = await imageUpload(image);

    // Validate email and password
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters and contain at least one letter and one number"
      );
      return;
    }

    try {
      // Register the user
      const result = await createUser(email, password);

      // Update user profile with name and photo
      await updateUserProfile(name, photoURL);

      // Determine initial coins based on role
      const coins = role === "worker" ? 10 : role === "buyer" ? 50 : 0;

      // Add the user to the database with role and coins
      await axios.post(`${import.meta.env.VITE_API_URL}/users/${email}`, {
        name,
        email,
        image: photoURL,
        role,
        coins,
      });

      // Navigate to home and show success message
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      // console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to Earnify</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>

            {/* Role Selection (Worker/Buyer) */}
            <div>
              <label htmlFor="role" className="block mb-2 text-sm">
                Select Role
              </label>
              <select
                name="role"
                id="role"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                required
              >
                <option value="worker">Worker</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>

          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-purple-600 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
