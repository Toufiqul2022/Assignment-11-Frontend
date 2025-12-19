import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();

  useEffect(() => {
    if (!sessionId) return;

    axiosInstance
      .get(`/success-payment?session_id=${sessionId}`)
      .then((res) => {
        console.log("Payment Saved:", res.data);
      })
      .catch((err) => {
        console.error("Payment Error:", err);
      });
  }, [axiosInstance, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <div className="text-6xl mb-4">🎉</div>

          <h1 className="text-3xl font-bold text-green-600">
            Payment Successful
          </h1>

          <p className="text-gray-500 mt-2">
            Thank you for your generous donation.
          </p>

          <div className="divider"></div>

          <p className="text-sm text-gray-400">
            Your transaction has been securely processed.
          </p>

          <button
            className="btn btn-primary mt-4"
            onClick={() => window.location.href = "/"}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
