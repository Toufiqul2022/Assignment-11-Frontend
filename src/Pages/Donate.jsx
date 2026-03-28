import React, { useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../hooks/useAxios";
import { Link, useLocation } from "react-router";

/* ── Stripe checkout uses USD. We display in USD. ── */
const PRESETS = [1, 5, 10, 25, 50, 100]; // USD

const Donate = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const location = useLocation();

  const [amount, setAmount] = useState("");
  const [customMode, setCustomMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("select"); // select | confirm | processing

  // If user came back from a cancelled payment, show a toast once
  const wasCancelled = new URLSearchParams(location.search).get("cancelled");
  React.useEffect(() => {
    if (wasCancelled) toast.info("Payment was cancelled. You were not charged.");
  }, []);

  const selectedPreset = !customMode && amount ? Number(amount) : null;

  const handleReview = (e) => {
    e.preventDefault();
    const num = Number(amount);
    if (!amount || num < 0.5) return toast.warning("Minimum donation is $0.50");
    setStep("confirm");
  };

  const handlePay = async () => {
    setStep("processing");
    setLoading(true);
    try {
      // Calls backend POST /create-payment-checkout
      // Backend creates Stripe Checkout Session, returns { url }
      const res = await axiosInstance.post("/create-payment-checkout", {
        donateAmount: Number(amount),       // USD dollars
        donorEmail: user?.email || "",
      });

      if (res.data?.url) {
        // Redirect user to Stripe hosted checkout page
        window.location.href = res.data.url;
      } else {
        throw new Error("No checkout URL returned from server.");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Payment failed.";
      toast.error(msg, { autoClose: 6000 });
      setStep("confirm");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0a0008 0%,#12000a 40%,#0d0612 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"3rem 1.5rem", fontFamily:"'DM Sans',sans-serif" }}>
      <ToastContainer position="top-right" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .dc { animation: fadeUp .35s ease; }
        .pr {
          padding: .75rem;
          border: 1.5px solid rgba(220,38,38,.28);
          border-radius: 12px;
          background: rgba(220,38,38,.05);
          color: #fca5a5;
          font-size: 1rem; font-weight: 700;
          cursor: pointer; transition: all .2s;
          font-family: inherit; text-align: center;
        }
        .pr:hover  { background: rgba(220,38,38,.14); border-color: rgba(220,38,38,.5); transform: translateY(-2px); }
        .pr.sel    { background: #dc2626; border-color: #dc2626; color: #fff; box-shadow: 0 6px 20px rgba(220,38,38,.35); }
        .pb {
          width:100%; padding:.95rem; border-radius:14px; border:none;
          font-size:1rem; font-weight:700; font-family:inherit; cursor:pointer;
          transition:all .25s; display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .pb:disabled { opacity:.55; cursor:not-allowed; }
        .ci {
          width:100%; padding:.85rem 1rem .85rem 2.4rem;
          background:rgba(255,255,255,.06); border:1.5px solid rgba(255,255,255,.1);
          border-radius:12px; color:#fff; font-size:.95rem;
          font-family:inherit; outline:none; box-sizing:border-box; transition:border-color .2s;
        }
        .ci:focus { border-color:rgba(220,38,38,.6); }
        .ci::placeholder { color:rgba(255,255,255,.25); }
      `}</style>

      <div className="dc" style={{ width:"100%", maxWidth:480 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"1.75rem" }}>
          <div style={{ width:54, height:54, background:"rgba(220,38,38,.14)", border:"1px solid rgba(220,38,38,.3)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto .9rem" }}>
            <svg width="25" height="31" viewBox="0 0 28 34" fill="none">
              <path d="M14 0C14 0 0 16 0 22C0 29.7 6.3 34 14 34C21.7 34 28 29.7 28 22C28 16 14 0 14 0Z" fill="#dc2626"/>
              <path d="M10 24C10 21 12 18 14 16C16 18 18 21 18 24C18 26.2 16.2 28 14 28C11.8 28 10 26.2 10 24Z" fill="rgba(255,255,255,.3)"/>
            </svg>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", fontWeight:900, color:"#fff", letterSpacing:"-.02em", margin:"0 0 .5rem" }}>
            {step==="confirm" ? "Review Donation" : step==="processing" ? "Redirecting…" : "Support BloodUnity"}
          </h1>
          <p style={{ color:"rgba(255,255,255,.42)", fontSize:".87rem", lineHeight:1.6 }}>
            {step==="confirm"
              ? "Review your donation, then click Pay to proceed to Stripe."
              : "Your donation keeps our platform running and saves lives."}
          </p>
        </div>

        {/* STEP 1 — Select */}
        {step==="select" && (
          <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", borderRadius:20, padding:"1.75rem" }}>

            {/* Donor card */}
            {user && (
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1.5rem", padding:".85rem 1rem", background:"rgba(220,38,38,.07)", borderRadius:12, border:"1px solid rgba(220,38,38,.18)" }}>
                <img src={user.photoURL||`https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName||"U")}&background=7f1d1d&color=fff`} alt="" style={{ width:36, height:36, borderRadius:"50%", border:"2px solid rgba(220,38,38,.4)", objectFit:"cover" }}/>
                <div>
                  <div style={{ color:"#fff", fontWeight:600, fontSize:".875rem" }}>{user.displayName}</div>
                  <div style={{ color:"rgba(255,255,255,.4)", fontSize:".75rem" }}>{user.email}</div>
                </div>
                <span style={{ marginLeft:"auto", background:"rgba(220,38,38,.18)", color:"#fca5a5", padding:"2px 9px", borderRadius:50, fontSize:".67rem", fontWeight:700 }}>Verified</span>
              </div>
            )}

            <p style={{ fontSize:".68rem", fontWeight:700, color:"rgba(255,255,255,.36)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:".65rem" }}>Quick Select (USD)</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:"1rem" }}>
              {PRESETS.map(p => (
                <button key={p} className={`pr ${selectedPreset===p?"sel":""}`} onClick={()=>{setAmount(String(p));setCustomMode(false);}}>
                  ${p}
                </button>
              ))}
            </div>

            <form onSubmit={handleReview}>
              <p style={{ fontSize:".68rem", fontWeight:700, color:"rgba(255,255,255,.36)", textTransform:"uppercase", letterSpacing:".1em", marginBottom:".55rem" }}>Custom Amount (USD)</p>
              <div style={{ position:"relative", marginBottom:"1.25rem" }}>
                <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,.35)", fontSize:"1rem", pointerEvents:"none" }}>$</span>
                <input
                  type="number" step="0.01" min="0.5"
                  className="ci"
                  placeholder="Enter amount (min $0.50)"
                  value={customMode ? amount : ""}
                  onClick={()=>{ setCustomMode(true); setAmount(""); }}
                  onChange={e=>{ setCustomMode(true); setAmount(e.target.value); }}
                />
              </div>
              <button type="submit" className="pb" disabled={!amount}
                style={{ background:amount?"linear-gradient(135deg,#dc2626,#991b1b)":"rgba(220,38,38,.22)", color:"#fff", boxShadow:amount?"0 8px 28px rgba(220,38,38,.3)":"none" }}>
                Continue to Review →
              </button>
            </form>

            <p style={{ textAlign:"center", marginTop:".85rem", fontSize:".7rem", color:"rgba(255,255,255,.18)" }}>
              🔒 Secured by Stripe · Card, Apple Pay &amp; more
            </p>
          </div>
        )}

        {/* STEP 2 — Confirm */}
        {step==="confirm" && (
          <div style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", borderRadius:20, padding:"1.75rem", animation:"fadeUp .3s ease" }}>
            <div style={{ background:"rgba(220,38,38,.07)", border:"1px solid rgba(220,38,38,.18)", borderRadius:14, padding:"1.25rem", marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                <span style={{ color:"rgba(255,255,255,.5)", fontSize:".8rem" }}>Donation Amount</span>
                <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"2rem", fontWeight:900, color:"#dc2626", lineHeight:1 }}>${Number(amount).toFixed(2)}</span>
              </div>
              {[["Donor", user?.displayName||"Guest"], ["Email", user?.email||"—"], ["Currency", "USD"], ["Platform", "BloodUnity"]].map(([l,v])=>(
                <div key={l} style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
                  <span style={{ color:"rgba(255,255,255,.45)", fontSize:".78rem" }}>{l}</span>
                  <span style={{ color:"rgba(255,255,255,.75)", fontSize:".78rem" }}>{v}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize:".68rem", color:"rgba(255,255,255,.28)", textAlign:"center", marginBottom:".75rem", textTransform:"uppercase", letterSpacing:".08em" }}>Powered by</p>
            <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", marginBottom:"1.5rem" }}>
              {["Visa","Mastercard","Amex","Apple Pay","Google Pay"].map(g=>(
                <span key={g} style={{ background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.5)", padding:"4px 11px", borderRadius:7, fontSize:".7rem", fontWeight:600 }}>{g}</span>
              ))}
            </div>

            <button className="pb" onClick={handlePay} disabled={loading}
              style={{ background:"linear-gradient(135deg,#dc2626,#991b1b)", color:"#fff", boxShadow:"0 8px 28px rgba(220,38,38,.35)", marginBottom:10 }}>
              {loading
                ? <><div style={{ width:16, height:16, border:"2px solid rgba(255,255,255,.3)", borderTop:"2px solid #fff", borderRadius:"50%", animation:"spin .7s linear infinite" }}/> Redirecting to Stripe…</>
                : `Pay $${Number(amount).toFixed(2)} via Stripe`}
            </button>
            <button className="pb" onClick={()=>setStep("select")}
              style={{ background:"transparent", color:"rgba(255,255,255,.45)", border:"1px solid rgba(255,255,255,.1)" }}>
              ← Change Amount
            </button>

            <p style={{ textAlign:"center", marginTop:".85rem", fontSize:".7rem", color:"rgba(255,255,255,.18)" }}>
              You will be redirected to Stripe's secure checkout page
            </p>
          </div>
        )}

        {/* STEP 3 — Processing */}
        {step==="processing" && (
          <div style={{ textAlign:"center", padding:"3rem 1rem", animation:"fadeUp .3s ease" }}>
            <div style={{ width:56, height:56, border:"4px solid rgba(220,38,38,.2)", borderTop:"4px solid #dc2626", borderRadius:"50%", animation:"spin .8s linear infinite", margin:"0 auto 1.5rem" }}/>
            <p style={{ color:"rgba(255,255,255,.6)", fontSize:".95rem" }}>Connecting to Stripe…</p>
            <p style={{ color:"rgba(255,255,255,.3)", fontSize:".78rem", marginTop:".5rem" }}>Do not close this tab.</p>
          </div>
        )}

        {step==="select" && (
          <div style={{ textAlign:"center", marginTop:"1.1rem" }}>
            <Link to="/" style={{ color:"rgba(255,255,255,.25)", fontSize:".78rem", textDecoration:"none" }}>← Back to home</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
