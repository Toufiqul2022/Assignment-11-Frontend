import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const Spinner = () => (
  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh" }}>
    <div style={{ width:40, height:40, border:"3px solid #f3f3f3", borderTop:"3px solid #dc2626", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading, useStatus } = useContext(AuthContext);
  if (loading || roleLoading) return <Spinner />;
  if (!user || useStatus?.toLowerCase() === "blocked") return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
