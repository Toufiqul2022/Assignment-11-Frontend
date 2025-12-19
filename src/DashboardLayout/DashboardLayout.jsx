import React from "react";
import { Outlet } from "react-router";
import Aside from "../components/Aside";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-base-100">
      <Aside />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
