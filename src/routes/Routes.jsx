import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";

import AddTask from "../pages/Dashboard/Buyer/AddTask";
import TaskDetails from "../pages/TaskDetails/TaskDetails";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks";
import MySubmission from "../pages/Dashboard/Worker/MySubmission";
import BuyerRoute from "./BuyerRoute";
import AdminRoute from "./AdminRoute";
import ManageSubmission from "../pages/Dashboard/Buyer/ManageSubmission";
import PurchaseCoin from "../pages/Dashboard/Buyer/PurchaseCoin";
import PaymentCards from "../pages/Dashboard/Buyer/PaymentCards";
import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory";
import TaskList from "../pages/Dashboard/Worker/TaskList";
import MyHome from "../pages/Dashboard/Worker/MyHome";
import WithdrawalInfo from "../pages/Dashboard/Worker/WithdrawalInfo";
import HowItWorks from "../pages/HowItWorks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/task/:id",
        element: <TaskDetails></TaskDetails>,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-task",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <AddTask></AddTask>
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-task",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <MyTasks></MyTasks>
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-home",
        element: (
          <PrivateRoute>
            <MyHome />
          </PrivateRoute>
        ),
      },
      {
        path: "my-submission",
        element: (
          <PrivateRoute>
            <MySubmission></MySubmission>
          </PrivateRoute>
        ),
      },
      {
        path: "task-list",
        element: (
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        ),
      },
      {
        path: "withdrawalInfo",
        element: (
          <PrivateRoute>
            <WithdrawalInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-submission",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <ManageSubmission></ManageSubmission>
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "purchase-coin",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <PurchaseCoin />
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-card/:amount",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <PaymentCards></PaymentCards>
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <BuyerRoute>
              <PaymentHistory></PaymentHistory>
            </BuyerRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
