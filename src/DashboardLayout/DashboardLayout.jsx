import React from "react";
import { Outlet } from "react-router";
import Aside from "../components/Aside";

const DashboardLayout = () => {
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc" }}>
      <Aside />
      <main style={{ flex:1, overflowY:"auto", minWidth:0 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
