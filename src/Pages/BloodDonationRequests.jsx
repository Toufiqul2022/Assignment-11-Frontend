import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";

const BloodDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/donation-requests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("Failed to load donation requests:", err))
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  const handleView = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/requests/${id}`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
        Blood Donation Requests
      </h2>

      {loading && (
        <p className="text-center text-lg text-gray-600">Loading requests...</p>
      )}

      {!loading && requests.length === 0 && (
        <p className="text-center text-gray-500">
          No pending blood donation requests found.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div key={req._id} className="card bg-base-100 shadow-lg border">
            <div className="card-body space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="card-title text-red-600 text-2xl">
                  {req.bloodGroup} Blood Needed
                </h3>
                <span className="badge badge-warning">{req.status}</span>
              </div>

              <p>
                <b>Recipient:</b> {req.recipientName}
              </p>
              <p>
                <b>Location:</b> {req.upazila}, {req.district}
              </p>
              <p>
                <b>Date:</b> {req.donationDate}
              </p>
              <p>
                <b>Time:</b> {req.donationTime}
              </p>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => handleView(req._id)}
                  className="btn btn-error"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodDonationRequests;
