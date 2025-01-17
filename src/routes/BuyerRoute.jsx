import React from "react";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router-dom";

const BuyerRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "buyer") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

export default BuyerRoute;
