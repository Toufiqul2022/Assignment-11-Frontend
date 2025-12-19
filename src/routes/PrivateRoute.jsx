import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, useStatus } = useContext(AuthContext);

  if (!user || useStatus?.toLowerCase() === "blocked") {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default PrivateRoute;
