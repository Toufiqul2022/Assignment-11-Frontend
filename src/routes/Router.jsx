import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageProducts from "../Pages/Dashboard/MyRequest";
import AddRequest from "../Pages/Dashboard/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers";
import PrivateRoute from "./PrivateRoute";
import Donate from "../Pages/Donate";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import SearchRequest from "../Pages/searchRequest";
import BloodDonationRequests from "../Pages/BloodDonationRequests";
import DonationRequestDetails from "../Pages/DonationRequestDetails";
import Profile from "../Pages/Dashboard/Profile";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import AllRequest from "../Pages/Dashboard/AllRequest";

import VolunteerAllRequests from "../Pages/Dashboard/VolunteerAllRequests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
        path: "funding",
        element: (
          <PrivateRoute>
            <Donate />
          </PrivateRoute>
        ),
      },

      { path: "success-payment", element: <PaymentSuccess /> },
      { path: "search", element: <SearchRequest /> },
      { path: "requests", element: <BloodDonationRequests /> },
      {
        path: "requests/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },

      /* 🔐 ADMIN ROUTE */
      {
        path: "admin",
        element: <AdminDashboard />,
      },

      /* 👤 DONOR ROUTES */
      { path: "add-request", element: <AddRequest /> },
      { path: "my-request", element: <ManageProducts /> },

      /* 👮 ADMIN ONLY */
      { path: "all-users", element: <AllUsers /> },

      /* 👤 COMMON */
      {
        path: "profile",
        element: <Profile />,
      },

      /* 🩸 ADMIN ALL REQUEST */
      {
        path: "All-requests",
        element: <AllRequest />,
      },

      /* 🤝 VOLUNTEER ROUTE (NEW) */
      {
        path: "all-blood-donation-request",
        element: (
            <VolunteerAllRequests />
        ),
      },
    ],
  },
]);

export default router;
