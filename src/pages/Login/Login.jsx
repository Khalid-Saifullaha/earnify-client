import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import axios from "axios";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/dashboard";

  if (user) return <Navigate to={from} replace={true} />;

  // Email Validation Function
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Password Validation Function (min 6 characters)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Form Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Input validation
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email.");
    }
    if (!validatePassword(password)) {
      return toast.error("Password must be at least 6 characters.");
    }

    try {
      // User Login via email/password
      await signIn(email, password);

      // After login, fetch user info from DB to check or save role and coins
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${email}`
      );
      const userData = response.data;

      // If user is new, assign default values (worker and 10 coins)
      if (!userData.role) {
        const newUserData = {
          role: "worker",
          coins: 10,
        };

        // Save the user in the DB if not found
        await axios.post(
          `${import.meta.env.VITE_API_URL}/users/${email}`,
          newUserData
        );

        // Update user data after saving
        userData.role = "worker";
        userData.coins = 10;
      }

      // Navigate the user to the dashboard after successful login
      navigate("/dashboard", { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      // console.log(err);
      toast.error(err?.message || "Invalid email or password.");
    }
  };

  // Handle Google SignIn
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      const userData = {
        name: data?.user?.displayName,
        email: data?.user?.email,
        role: "worker",
        coins: 10,
      };

      // Save user data to DB using axios
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/${data?.user?.email}`,
        userData
      );

      navigate("/dashboard", { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      // console.log(err);
      toast.error(err?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
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
              <label htmlFor="password" className="text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-lime-500 text-gray-400">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
