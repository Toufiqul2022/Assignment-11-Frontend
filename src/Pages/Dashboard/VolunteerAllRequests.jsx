import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const VolunteerAllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/volunteer/requests", {
        params: { status: filter !== "all" ? filter : undefined },
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);


  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(`/volunteer/requests/status/${id}`, { status });
      fetchRequests(); 
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Donation Requests</h1>


      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>


      {loading && (
        <div className="text-center py-6 text-gray-500">
          Loading requests...
        </div>
      )}


      {!loading && (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Requester</th>
                <th className="border p-2">District</th>
                <th className="border p-2">Upazila</th>
                <th className="border p-2">Blood Group</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr key={req._id}>
                    <td className="border p-2">{req.requesterName}</td>
                    <td className="border p-2">{req.district}</td>
                    <td className="border p-2">{req.upazila}</td>
                    <td className="border p-2">{req.bloodGroup}</td>
                    <td className="border p-2">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border p-2 capitalize">{req.status}</td>
                    <td className="border p-2 flex gap-2">
                      {req.status === "inprogress" && (
                        <>
                          <button
                            className="bg-green-500 text-white px-2 py-1 rounded"
                            onClick={() => handleStatusChange(req._id, "done")}
                          >
                            Done
                          </button>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() =>
                              handleStatusChange(req._id, "canceled")
                            }
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-6 text-center text-gray-400 italic"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VolunteerAllRequests;
