import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaUsers } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fatchUser = () => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    fatchUser();
  }, [axiosSecure]);

  const handleStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        console.log(res.data);
        fatchUser();
      });
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="w-full mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaUsers className="text-3xl text-primary" />
          <div>
            <h2 className="text-3xl font-bold">All Users</h2>
            <p className="text-gray-500">Manage all registered users</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl rounded-2xl">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                  <tr className="text-base">
                    <th>#</th>
                    <th>User</th>
                    <th>Blood Group</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u, index) => (
                    <tr key={u._id} className="hover">
                      <td>{index + 1}</td>

                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-10 w-10">
                              <img
                                src={
                                  u.photoURL ||
                                  "https://i.ibb.co/2kRkz9n/user.png"
                                }
                                alt="user"
                              />
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold">
                              {u.name || u.displayName || "Unknown"}
                            </p>
                            <p className="text-sm text-gray-500">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="font-medium">{u.blood || "N/A"}</td>

                      <td>
                        <span className="badge badge-outline capitalize">
                          {u.role || "user"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge capitalize ${
                            u.status === "blocked"
                              ? "badge-error"
                              : "badge-success"
                          }`}
                        >
                          {u.status || "active"}
                        </span>
                      </td>
                      <td className="text-center space-x-2">
                        {u?.status == "active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(u?.email, "blocked")
                            }
                            className="btn btn-sm md:btn-md btn-success"
                          >
                            Block
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(u?.email, "active")
                            }
                            className="btn btn-sm md:btn-md btn-error"
                          >
                            Active
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {users.length === 0 && (
              <p className="text-center py-10 text-gray-500">No users found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
