import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";

const SearchRequest = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedBlood, setSelectedBlood] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const axiosInstance = useAxios();

  // ✅ Load districts & upazilas
  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  // ✅ Load ALL requests initially
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/search-requests")
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  // ✅ Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    axiosInstance
      .get(
        `/search-requests?bloodGroup=${encodeURIComponent(
          selectedBlood
        )}&district=${selectedDistrict}&upazila=${selectedUpazila}`
      )
      .then((res) => setRequests(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  // 🔹 Navigate to details page
  const handleView = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/requests/${id}`);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 🔍 Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap gap-4 justify-center items-end"
      >
        {/* Blood Group */}
        <div className="flex gap-3">
          <label className="label">Blood Group</label>
          <select
            className="select select-bordered w-48"
            required
            value={selectedBlood}
            onChange={(e) => setSelectedBlood(e.target.value)}
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

        {/* District */}
        <div className="flex gap-3">
          <label className="label">District</label>
          <select
            className="select select-bordered w-48"
            required
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedUpazila("");
            }}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div className="flex gap-3">
          <label className="label">Upazila</label>
          <select
            className="select select-bordered w-48"
            required
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
          >
            <option value="">Select Upazila</option>
            {upazilas
              .filter(
                (u) =>
                  String(u.district_id) ===
                  String(districts.find((d) => d.name === selectedDistrict)?.id)
              )
              .map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* 📦 Cards Section */}
      {/* 📦 Cards Section */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <p className="text-center col-span-full text-lg">Loading...</p>
        )}

        {!loading && requests.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No blood requests found
          </p>
        )}

        {requests.map((req) => (
          <div
            key={req._id}
            className="card bg-base-100 shadow-lg border border-base-300"
          >
            <div className="card-body space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="card-title text-red-600 text-2xl">
                  {req.bloodGroup} Blood Needed
                </h2>

                <span
                  className={`badge ${
                    req.status === "pending" ? "badge-warning" : "badge-success"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              <p>
                <span className="font-semibold">Patient:</span>{" "}
                {req.recipientName}
              </p>

              <p>
                <span className="font-semibold">Hospital:</span> {req.hospital}
              </p>

              <p>
                <span className="font-semibold">Address:</span> {req.address}
              </p>

              <p>
                <span className="font-semibold">Location:</span> {req.upazila},{" "}
                {req.district}
              </p>

              <div className="flex gap-4 flex-wrap">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {req.donationDate}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {req.donationTime}
                </p>
              </div>

              <div className="bg-base-200 p-3 rounded-lg">
                <p className="text-sm italic">“{req.message}”</p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-gray-500">
                  Requested by{" "}
                  <span className="font-medium">{req.requesterName}</span>
                </div>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRequest;
