import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";
import DonateModal from "../components/DonateModal";
import {
  FaHandHoldingHeart,
  FaUser,
  FaEnvelope,
  FaHospital,
  FaMapMarkerAlt,
  FaTint,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!user) return;

    axiosInstance
      .get(`/donation-requests/${id}`, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => setRequest(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, axiosInstance, user]);

  if (loading) return <p className="text-center mt-20">Loading details...</p>;
  if (!request) return <p className="text-center mt-20">Request not found</p>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <FaHandHoldingHeart className="mx-auto text-4xl text-red-500 mb-3" />
          <h2 className="text-3xl font-bold text-red-600">
            Donation Requests Details
          </h2>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            {/* Left */}
            <div className="space-y-4">
              <p className="flex items-center gap-2">
                <FaUser className="text-red-500" />
                <b>Requester Name:</b> {request.requesterName}
              </p>
              <p className="flex items-center gap-2">
                <FaUser className="text-red-500" />
                <b>Recipient Name:</b> {request.recipientName}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <b>District:</b> {request.district}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <b>Full Address:</b> {request.address}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-red-500" />
                <b>Donation Date:</b> {request.donationDate}
              </p>
              <p>
                <b>Request Message:</b> {request.message}
              </p>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-red-500" />
                <b>Requester Email:</b> {request.requesterEmail}
              </p>
              <p className="flex items-center gap-2">
                <FaTint className="text-red-500" />
                <b>Blood Group:</b> {request.bloodGroup}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <b>Upazila:</b> {request.upazila}
              </p>
              <p className="flex items-center gap-2">
                <FaHospital className="text-red-500" />
                <b>Hospital Name:</b> {request.hospital}
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-red-500" />
                <b>Donation Time:</b> {request.donationTime}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={`badge ${
                    request.status === "pending"
                      ? "badge-warning"
                      : "badge-success"
                  }`}
                >
                  {request.status}
                </span>
              </p>
            </div>
          </div>

          {/* Donate Button */}
          {request.status === "pending" && (
            <div className="text-center mt-10">
              <button
                onClick={() => setOpenModal(true)}
                className="btn btn-error px-10 text-lg shadow-md hover:scale-105 transition"
              >
                Donate
              </button>
            </div>
          )}
        </div>

        {openModal && (
          <DonateModal
            requestId={id}
            closeModal={() => setOpenModal(false)}
            refresh={() => window.location.reload()}
          />
        )}
      </div>
    </section>
  );
};

export default DonationRequestDetails;
