import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { data } = useSelector((state) => state.LoginAPI); 
  // console.log("data:",data);
  

  const isAuthenticated = data && data.length > 0;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
