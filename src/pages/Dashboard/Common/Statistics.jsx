import { Helmet } from "react-helmet-async";
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import useRole from "../../../hooks/useRole";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
const Statistics = () => {
  const [role, isLoading] = useRole();
  if (isLoading) return <LoadingSpinner />;
  if (role === "worker")
    return <Navigate to="/dashboard/my-submission"></Navigate>;
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <AdminStatistics />
    </div>
  );
};

export default Statistics;
