import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
  };

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/requests">Donation Requests</Link>
      </li>
      <li>
        <Link to="/search">Search</Link>
      </li>
      <li>
        <Link to="/funding">Funding</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
            {!user && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-red-600">BloodUnity</span>
        </Link>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-outline btn-error">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            {/* Avatar */}
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-error ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user avatar"
                />
              </div>
            </label>

            {/* Dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 flex flex-col gap-2"
            >
              <li>
                <Link className="btn" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
