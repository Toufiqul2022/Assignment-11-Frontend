import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyRequest = () => {
  const axiosSecure = useAxiosSecure();

  const [myRequests, setMyRequests] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [itemPage, setItemPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosSecure
      .get(`/my-requests?page=${currentPage}&size=${itemPage}`)
      .then((res) => {
        setMyRequests(res.data.request || []);
        setTotalRequest(res.data.totalRequest || 0);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [axiosSecure, currentPage, itemPage]);

  const numberOfPages = Math.ceil(totalRequest / itemPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  console.log(itemPage, totalRequest, currentPage, myRequests);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">My Requests</h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Hospital Name</th>
              <th>Blood Group</th>
            </tr>
          </thead>

          <tbody>
            {myRequests.length === 0 ? (
              <tr>
                <td className="text-center py-6">
                  No requests found
                </td>
              </tr>
            ) : (
              myRequests.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td>{(currentPage - 1) * itemPage + index + 1}</td>
                  <td>{item.recipientName}</td>
                  <td>{item.hospital}</td>
                  <td>{item.bloodGroup}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {numberOfPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm"
          >
            Prev
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn btn-sm ${
                currentPage === page ? "btn-primary" : "btn-outline"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage )}
            disabled={currentPage === numberOfPages}
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyRequest;
