import React, { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";

const DonateModal = ({ requestId, closeModal, refresh }) => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const handleConfirm = async () => {
    try {
      // ✅ Get Firebase ID Token
      const token = await user.getIdToken();

      await axiosInstance.patch(
        `/donation-requests/${requestId}`,
        {
          donorName: user.displayName,
          donorEmail: user.email,
        },
        {
          headers: {
            authorization: `Bearer ${token}`, // ✅ correct token
          },
        }
      );

      closeModal();
      refresh();
    } catch (err) {
      console.error("Donation confirm failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold mb-4">Confirm Donation</h3>

        <label className="label">Donor Name</label>
        <input
          value={user.displayName}
          readOnly
          className="input input-bordered w-full mb-3"
        />

        <label className="label">Donor Email</label>
        <input
          value={user.email}
          readOnly
          className="input input-bordered w-full mb-4"
        />

        <div className="flex gap-3">
          <button onClick={handleConfirm} className="btn btn-success flex-1">
            Confirm
          </button>
          <button onClick={closeModal} className="btn btn-outline flex-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
