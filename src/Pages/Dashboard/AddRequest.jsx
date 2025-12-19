import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const userStatus = "active";

  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  if (userStatus === "blocked") {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content">
          <div className="alert alert-error">
            <span>
              Your account is blocked. You are not allowed to create donation
              requests.
            </span>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      district: selectedDistrict,
      upazila: selectedUpazila,
      hospital: form.hospital.value,
      address: form.address.value,
      bloodGroup: form.blood.value,
      donationDate: form.date.value,
      donationTime: form.time.value,
      message: form.message.value,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/requests", donationRequest);
      toast.success("Donation request created successfully!");
      form.reset();
      setSelectedDistrict("");
      setSelectedUpazila("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create donation request");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <ToastContainer />
      <div className="hero-content flex-col w-full">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold">Create Donation Request</h1>
        </div>

        <div className="card bg-base-100 w-full max-w-4xl shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Requester Name</label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div>
                  <label className="label">Requester Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                </div>

                <div>
                  <label className="label">Recipient Name</label>
                  <input
                    type="text"
                    name="recipientName"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">Blood Group</label>
                  <select
                    name="blood"
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>

                <div>
                  <label className="label">District</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setSelectedUpazila("");
                    }}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Upazila</label>
                  <select
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Upazila</option>
                    {upazilas
                      .filter((u) => u.district_id === selectedDistrict)
                      .map((u) => (
                        <option key={u.id} value={u.name}>
                          {u.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="label">Hospital Name</label>
                  <input
                    type="text"
                    name="hospital"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">Full Address</label>
                  <input
                    type="text"
                    name="address"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">Donation Date</label>
                  <input
                    type="date"
                    name="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">Donation Time</label>
                  <input
                    type="time"
                    name="time"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label">Request Message</label>
                  <textarea
                    name="message"
                    className="textarea textarea-bordered w-full"
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="md:col-span-2 text-center">
                  <button
                    className="btn btn-error px-12 mt-4"
                    disabled={!selectedDistrict || !selectedUpazila}
                  >
                    Request Blood Donation
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
