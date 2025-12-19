import React, { useContext } from "react";
import { NavLink } from "react-router";
import {
  MdHome,
  MdGroup,
  MdSettings,
  MdLogout,
  MdAddBox,
  MdOutlineInventory2,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const Sidebar = () => {
  const { role } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <aside className="w-48 lg:w-64 min-h-screen bg-slate-900 text-white flex flex-col p-8">
      <div className="flex items-center gap-2 mb-8 px-2">
        <h1 className="text-2xl font-bold tracking-wide">AdminPanel</h1>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <MdHome className="w-6 h-6" />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        {role == "donor" && (
          <NavLink
            to="/dashboard/add-request"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <MdAddBox className="w-6 h-6" />
            <span className="font-medium">Add Request</span>
          </NavLink>
        )}

        {role == "admin" && (
          <NavLink
            to="/dashboard/all-users"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <FaUsers className="w-6 h-6" />
            <span className="font-medium">All Users</span>
          </NavLink>
        )}

        <NavLink
          to="/dashboard/my-request"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <MdOutlineInventory2 className="text-2xl" />
          <span className="font-medium">My Request</span>
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <MdGroup className="w-6 h-6" />
          <span className="font-medium">My Profile</span>
        </NavLink>
      </nav>

      <div className="mt-auto border-t border-gray-800 pt-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <MdLogout className="w-6 h-6" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
