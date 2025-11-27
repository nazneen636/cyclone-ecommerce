import React from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  if (!token) return navigate("/login");
  return children;
};

export default ProtectedRoute;
