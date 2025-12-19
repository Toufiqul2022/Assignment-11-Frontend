import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosInstance.get("/my-requests?size=3&page=1").then((res) => {
      setRequests(res.data.requests);
    });
  }, [axiosInstance]);

  const handleStatusChange = async (id, status) => {
    await axiosInstance.patch(`/requests/status/${id}`, { status });
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status } : req))
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    await axiosInstance.delete(`/requests/${id}`);
    setRequests((prev) => prev.filter((req) => req._id !== id));
  };

  const handleView = (id) => {
    navigate(user ? `/requests/${id}` : "/login");
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Welcome, {user?.displayName} 👋
      </h1>

      {requests.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            My Recent Donation Requests
          </h2>

          <div className="overflow-x-auto rounded-2xl bg-white shadow-lg">
            <table className="table w-full text-base">
              <thead className="bg-red-600 text-white text-lg">
                <tr>
                  <th className="py-4 px-6">Recipient</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Time</th>
                  <th className="py-4 px-6">Blood</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Donor</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-100">
                    <td className="font-medium py-4 px-6 text-lg">
                      {req.recipientName}
                    </td>
                    <td className="py-4 px-6 text-lg">
                      {req.district}, {req.upazila}
                    </td>
                    <td className="py-4 px-6 text-lg">{req.donationDate}</td>
                    <td className="py-4 px-6 text-lg">{req.donationTime}</td>
                    <td className="font-semibold py-4 px-6 text-lg">
                      {req.bloodGroup}
                    </td>
                    <td className="capitalize py-4 px-6 text-lg">{req.status}</td>
                    <td className="py-4 px-6 text-lg">
                      {req.status === "inprogress"
                        ? `${req.donorName} (${req.donorEmail})`
                        : "-"}
                    </td>

                    <td className="text-right py-4 px-6">
                      <div className="inline-flex flex-wrap gap-3">
                        {req.status === "inprogress" && (
                          <>
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() =>
                                handleStatusChange(req._id, "done")
                              }
                            >
                              Done
                            </button>
                            <button
                              className="btn btn-sm btn-error"
                              onClick={() =>
                                handleStatusChange(req._id, "canceled")
                              }
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        <button
                          className="btn btn-sm btn-info"
                          onClick={() =>
                            navigate(`/dashboard/edit-request/${req._id}`)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleDelete(req._id)}
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => handleView(req._id)}
                          className="btn btn-sm btn-outline btn-error"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-gray-600 mt-8 text-lg">
          No recent donation requests found.
        </p>
      )}
    </div>
  );
};

export default DashboardHome;
