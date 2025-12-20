import React, { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const handleCheckOut = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donateEmail = user?.email;
    const donateName = user?.displayName;

    const formData = {
      donateAmount,
      donateEmail,
      donateName,
    };

    axiosInstance.post("/create-payment-checkout", formData).then((res) => {
      console.log(res.data);
      window.location.href = res.data.url;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold text-primary">
            Support Our Cause 
          </h2>

          <p className="text-center text-gray-500 mb-4">
            Your donation helps us save lives
          </p>

          <form onSubmit={handleCheckOut} className="space-y-4">
            <input
              name="donateAmount"
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter donation amount"
              required
            />

            <button className="btn btn-primary w-full">Donate Now</button>
          </form>

          {user && (
            <p className="text-xs text-center text-gray-400 mt-3">
              Logged in as {user.displayName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donate;
