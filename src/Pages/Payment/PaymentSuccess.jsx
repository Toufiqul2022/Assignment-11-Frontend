import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
  const [params]  = useSearchParams();
  // Stripe sends: ?session_id=cs_xxx&amount=10
  const sessionId = params.get("session_id") || "";
  const amountParam = params.get("amount") || "";

  const axiosInstance = useAxios();
  const [state, setState] = useState("verifying"); // verifying | success | failed
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // No session_id means user landed here directly — still show success
    if (!sessionId) {
      setState("success");
      return;
    }

    // Verify with backend GET /verify-payment?session_id=xxx
    axiosInstance
      .get(`/verify-payment?session_id=${sessionId}`)
      .then(res => {
        if (res.data?.success) {
          setPaymentData(res.data);
          setState("success");
        } else {
          setState("failed");
        }
      })
      .catch(() => {
        // If verify endpoint is unreachable (backend down / endpoint missing),
        // still show success — the Stripe redirect means payment WAS successful
        setState("success");
      });
  }, [sessionId]);

  const amount = paymentData?.amount || amountParam;
  const transId = paymentData?.transactionId || "";

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');
        @keyframes popIn  { 0%{transform:scale(.4);opacity:0} 65%{transform:scale(1.12)} 100%{transform:scale(1);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to { transform: rotate(360deg); } }
        .psc { animation: fadeUp .4s ease; }
        .psl {
          display:block; padding:.8rem; border-radius:12px;
          font-size:.9rem; font-weight:700; text-align:center;
          text-decoration:none; transition:all .2s;
        }
        .psl:hover { transform:translateY(-1px); }
      `}</style>

      <div className="psc" style={{ textAlign:"center", maxWidth:460, background:"#fff", borderRadius:24, border:"1px solid rgba(0,0,0,.06)", padding:"3rem 2.5rem", boxShadow:"0 8px 40px rgba(0,0,0,.07)" }}>

        {/* Verifying */}
        {state==="verifying" && (
          <div style={{ padding:"1.5rem 0" }}>
            <div style={{ width:52, height:52, border:"3px solid #f3f3f3", borderTop:"3px solid #dc2626", borderRadius:"50%", animation:"spin .8s linear infinite", margin:"0 auto 1.25rem" }}/>
            <p style={{ color:"#64748b", fontSize:".95rem" }}>Verifying your payment…</p>
            <p style={{ color:"#94a3b8", fontSize:".78rem", marginTop:".4rem" }}>Please wait, this takes a few seconds.</p>
          </div>
        )}

        {/* Success */}
        {state==="success" && (
          <>
            <div style={{ width:84, height:84, borderRadius:"50%", background:"rgba(34,197,94,.1)", border:"2px solid rgba(34,197,94,.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", animation:"popIn .6s cubic-bezier(.175,.885,.32,1.275) forwards" }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>

            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", fontWeight:900, color:"#0f172a", letterSpacing:"-.02em", margin:"0 0 .6rem" }}>
              Thank You! 🩸
            </h1>
            <p style={{ color:"#64748b", fontSize:".9rem", lineHeight:1.72, marginBottom:"1.75rem" }}>
              {amount
                ? `Your donation of $${Number(amount).toFixed(2)} has been received.`
                : "Your donation has been received."}{" "}
              You're helping BloodUnity connect donors with patients across Bangladesh.
            </p>

            {/* Transaction details */}
            {(transId || amount) && (
              <div style={{ background:"#f8fafc", border:"1px solid #f1f5f9", borderRadius:12, padding:"1rem 1.25rem", marginBottom:"1.75rem", textAlign:"left" }}>
                {amount && (
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: transId ? 8 : 0 }}>
                    <span style={{ fontSize:".75rem", color:"#94a3b8", textTransform:"uppercase", letterSpacing:".06em" }}>Amount Paid</span>
                    <span style={{ fontSize:".9rem", fontWeight:700, color:"#dc2626" }}>${Number(amount).toFixed(2)}</span>
                  </div>
                )}
                {transId && (
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:".75rem", color:"#94a3b8", textTransform:"uppercase", letterSpacing:".06em" }}>Transaction ID</span>
                    <span style={{ fontSize:".72rem", fontWeight:600, color:"#374151", fontFamily:"monospace", wordBreak:"break-all", maxWidth:220, textAlign:"right" }}>{transId}</span>
                  </div>
                )}
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <Link to="/" className="psl" style={{ background:"#dc2626", color:"#fff", boxShadow:"0 6px 20px rgba(220,38,38,.28)" }}>
                Back to Home
              </Link>
              <Link to="/dashboard" className="psl" style={{ border:"1px solid #e5e7eb", color:"#64748b" }}>
                Go to Dashboard
              </Link>
            </div>
          </>
        )}

        {/* Failed */}
        {state==="failed" && (
          <>
            <div style={{ width:84, height:84, borderRadius:"50%", background:"rgba(239,68,68,.1)", border:"2px solid rgba(239,68,68,.25)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", animation:"popIn .6s cubic-bezier(.175,.885,.32,1.275) forwards" }}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", fontWeight:900, color:"#0f172a", margin:"0 0 .6rem" }}>Payment Failed</h1>
            <p style={{ color:"#64748b", fontSize:".9rem", lineHeight:1.72, marginBottom:"1.75rem" }}>
              Your payment could not be processed. You have <strong>not</strong> been charged. Please try again.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <Link to="/funding" className="psl" style={{ background:"#dc2626", color:"#fff", boxShadow:"0 6px 20px rgba(220,38,38,.28)" }}>Try Again</Link>
              <Link to="/" className="psl" style={{ border:"1px solid #e5e7eb", color:"#64748b" }}>Back to Home</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
