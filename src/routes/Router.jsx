import { createBrowserRouter, Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import RootLayout from "../RootLayout/RootLayout";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyRequest from "../Pages/Dashboard/MyRequest";
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
import VolunteerDashboard from "../Pages/Dashboard/VolunteerDashboard";
import FeaturesSection from "../Pages/Features";
import StatisticsSection from "../Pages/Statistics";
import HighlightsSection from "../Pages/Highlights";
import TestimonialsSection from "../Pages/Testimonials";
import FAQSection from "../Pages/FAQ";
import EmergencyRequests from "../Pages/EmergencyRequests";
import ForgetPassword from "../Pages/ForgetPassword";
import Blogs from "../Pages/Blogs";

// eslint-disable-next-line react-refresh/only-export-components
const DashboardRedirect = () => {
  const { role, loading, roleLoading } = useContext(AuthContext);
  if (loading || roleLoading) return null;
  if (role === "admin")     return <Navigate to="/dashboard/admin"     replace />;
  if (role === "donor")     return <Navigate to="/dashboard/donor"     replace />;
  if (role === "volunteer") return <Navigate to="/dashboard/volunteer" replace />;
  return <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true,                element: <Home /> },
      { path: "login",              element: <Login /> },
      { path: "register",           element: <Register /> },
      { path: "blogs",              element: <Blogs /> },

      // ── Funding / Payment ──────────────────────────────────────────────────
      // /funding?cancelled=true is handled inside Donate.jsx
      { path: "funding",            element: <PrivateRoute><Donate /></PrivateRoute> },
      // Stripe success_url: /success-payment?session_id=xxx&amount=xx
      { path: "success-payment",    element: <PaymentSuccess /> },
      // ──────────────────────────────────────────────────────────────────────

      { path: "search",             element: <SearchRequest /> },
      { path: "requests",           element: <BloodDonationRequests /> },
      { path: "features",           element: <FeaturesSection /> },
      { path: "statistics",         element: <StatisticsSection /> },
      { path: "highlights",         element: <HighlightsSection /> },
      { path: "testimonials",       element: <TestimonialsSection /> },
      { path: "faq",                element: <FAQSection /> },
      { path: "emergencyReq",       element: <EmergencyRequests /> },
      { path: "/forget/:email?",    element: <ForgetPassword /> },
      { path: "requests/:id",       element: <PrivateRoute><DonationRequestDetails /></PrivateRoute> },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      { index: true,                            element: <DashboardRedirect /> },
      { path: "donor",                          element: <Dashboard /> },
      { path: "add-request",                    element: <AddRequest /> },
      { path: "my-request",                     element: <MyRequest /> },
      { path: "admin",                          element: <AdminDashboard /> },
      { path: "all-users",                      element: <AllUsers /> },
      { path: "all-requests",                   element: <AllRequest /> },
      { path: "volunteer",                      element: <VolunteerDashboard /> },
      { path: "all-blood-donation-request",     element: <VolunteerAllRequests /> },
      { path: "profile",                        element: <Profile /> },
    ],
  },
]);

export default router;
