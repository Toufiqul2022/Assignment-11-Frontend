import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../hooks/useAxios";
import { FiUser, FiHeart, FiDollarSign } from "react-icons/fi";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsRes = await axiosInstance.get("/dashboard-stats");
        setStats(statsRes.data);

        // Fetch all donation requests
        const requestsRes = await axiosInstance.get("/donation-requests");
        setRequests(requestsRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axiosInstance]);

  if (loading)
    return <div className="p-8 text-center text-xl">Loading dashboard...</div>;

  const displayedRequests = showAll ? requests : requests.slice(0, 6);

  return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome , {user?.displayName || "User"}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's a quick overview of your system.
        </p>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <FiUser className="text-blue-500 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.totalUsers}</h2>
          <p className="text-gray-500 mt-1 uppercase tracking-wide">Users</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <FiHeart className="text-red-500 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">{stats.totalRequests}</h2>
          <p className="text-gray-500 mt-1 uppercase tracking-wide">Requests</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <FiDollarSign className="text-green-500 text-5xl mb-3" />
          <h2 className="text-3xl font-bold">${stats.totalFunding}</h2>
          <p className="text-gray-500 mt-1 uppercase tracking-wide">Payment</p>
        </div>
      </section>

      {/* Recent Requests Table */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Recent Blood Requests
        </h2>
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-gray-600 uppercase text-sm">
                  Requester
                </th>
                <th className="py-3 px-4 text-gray-600 uppercase text-sm">
                  Blood Group
                </th>
                <th className="py-3 px-4 text-gray-600 uppercase text-sm">
                  District
                </th>
                <th className="py-3 px-4 text-gray-600 uppercase text-sm">
                  Status
                </th>
                <th className="py-3 px-4 text-gray-600 uppercase text-sm">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedRequests.length > 0 ? (
                displayedRequests.map((req) => (
                  <tr key={req._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{req.requesterName}</td>
                    <td className="py-3 px-4">{req.bloodGroup}</td>
                    <td className="py-3 px-4">{req.district}</td>
                    <td className="py-3 px-4 capitalize">{req.status}</td>
                    <td className="py-3 px-4">
                      {new Date(req.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 text-center text-gray-400 italic"
                  >
                    No recent requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Show More Button */}
        {requests.length > 6 && !showAll && (
          <div className="mt-4 text-center">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => setShowAll(true)}
            >
              Show All
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
