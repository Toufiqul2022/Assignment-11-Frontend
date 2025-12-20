import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllRequest = () => {
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  useEffect(() => {
    fetchRequests();
  }, [page, size]);

  const fetchRequests = async () => {
    const res = await axiosSecure.get(
      `/admin/requests?page=${page}&size=${size}`
    );
    setRequests(res.data.requests);
    setTotal(res.data.total);
  };

  const handleStatus = async (id, status) => {
    await axiosSecure.patch(`/admin/requests/status/${id}`, { status });
    fetchRequests();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    await axiosSecure.delete(`/admin/requests/${id}`);
    fetchRequests();
  };

  const totalPages = Math.ceil(total / size);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        All Blood Donation Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient</th>
              <th>Blood</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id}>
                <td>{(page - 1) * size + index + 1}</td>
                <td>{req.patientName}</td>
                <td>{req.bloodGroup}</td>
                <td>
                  {req.district}, {req.upazila}
                </td>
                <td>
                  <span className="badge badge-outline">{req.status}</span>
                </td>
                <td className="space-x-2">
                  {req.status === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatus(req._id, "done")}
                        className="btn btn-xs btn-success"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatus(req._id, "canceled")}
                        className="btn btn-xs btn-warning"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""}`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllRequest;
