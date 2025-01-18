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
  const from = location?.state?.from?.pathname || "/";

  if (user) return <Navigate to={from} replace={true} />;

  // Save user in the database
  const saveUserToDb = async (email, userData) => {
    try {
      const response = await axios.post(`/users/${email}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error saving user to DB:", error);
      toast.error("Error saving user data");
    }
  };

  // Fetch user from the database
  const fetchUserFromDb = async (email) => {
    try {
      const response = await axios.get(`/users/${email}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user from DB:", error);
      toast.error("Error fetching user data");
    }
  };

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      // User Login through API
      const response = await signIn(email, password);

      // Fetch user data from DB (to get role, coins, etc.)
      const userFromDb = await fetchUserFromDb(email);

      // If user doesn't exist in the database, assign default role 'worker'
      if (!userFromDb) {
        const userData = { role: "worker" }; // default role for new users
        await saveUserToDb(email, userData); // Save new user
      }

      // Save the role and other user info in the local storage
      localStorage.setItem("userRole", userFromDb.role || "worker");
      localStorage.setItem("coins", userFromDb.coins || 10); // Default coins for worker

      navigate(from, { replace: true });
      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const response = await signInWithGoogle();

      const userEmail = response.user.email;
      // Fetch user data from DB (to get role, coins, etc.)
      const userFromDb = await fetchUserFromDb(userEmail);

      // If user doesn't exist in the database, assign default role 'worker'
      if (!userFromDb) {
        const userData = { role: "worker" }; // default role for new users
        await saveUserToDb(userEmail, userData); // Save new user
      }

      // Save the role and other user info in the local storage
      localStorage.setItem("userRole", userFromDb.role || "worker");
      localStorage.setItem("coins", userFromDb.coins || 10); // Default coins for worker

      navigate(from, { replace: true });
      toast.success("Login Successful");
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
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
          action=""
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
                data-temp-mail-org="0"
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
