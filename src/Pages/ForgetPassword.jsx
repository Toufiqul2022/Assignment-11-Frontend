import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const { email: paramEmail } = useParams();
  const [email, setEmail] = useState(paramEmail ? decodeURIComponent(paramEmail) : "");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.warning("Please enter your email.");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      toast.success("Reset email sent! Check your inbox.");
    } catch {
      toast.error("Failed to send reset email. Check the address and try again.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", fontFamily:"'DM Sans',sans-serif" }}>
      <ToastContainer position="top-right" />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');`}</style>

      <div style={{ width:"100%", maxWidth:440, background:"#fff", borderRadius:20, border:"1px solid rgba(0,0,0,.06)", padding:"2.5rem", boxShadow:"0 4px 24px rgba(0,0,0,.06)" }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:8, textDecoration:"none", marginBottom:"1.5rem" }}>
            <svg width="24" height="30" viewBox="0 0 28 34" fill="none">
              <path d="M14 0C14 0 0 16 0 22C0 29.7 6.3 34 14 34C21.7 34 28 29.7 28 22C28 16 14 0 14 0Z" fill="#dc2626"/>
              <path d="M10 24C10 21 12 18 14 16C16 18 18 21 18 24C18 26.2 16.2 28 14 28C11.8 28 10 26.2 10 24Z" fill="rgba(255,255,255,.3)"/>
            </svg>
            <span style={{ fontSize:"1.2rem", fontWeight:800, color:"#0f172a" }}>BloodUnity</span>
          </Link>

          {!sent ? (
            <>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.75rem", fontWeight:900, color:"#0f172a", letterSpacing:"-.02em", margin:"0 0 .5rem" }}>Reset Password</h1>
              <p style={{ color:"#6b7280", fontSize:".875rem", margin:0 }}>Enter your email and we'll send you a reset link.</p>
            </>
          ) : (
            <>
              <div style={{ fontSize:"3rem", marginBottom:".75rem" }}>📬</div>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.75rem", fontWeight:900, color:"#0f172a", margin:"0 0 .5rem" }}>Check Your Inbox</h1>
              <p style={{ color:"#6b7280", fontSize:".875rem", margin:0 }}>A password reset link has been sent to <strong>{email}</strong></p>
            </>
          )}
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:"1.25rem" }}>
              <label style={{ display:"block", fontSize:".72rem", fontWeight:600, color:"#374151", marginBottom:6, letterSpacing:".04em", textTransform:"uppercase" }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{ width:"100%", padding:".8rem 1rem", border:"1.5px solid #e5e7eb", borderRadius:12, fontSize:".9rem", fontFamily:"inherit", color:"#111827", background:"#fff", outline:"none", boxSizing:"border-box", transition:"border-color .2s" }}
                onFocus={e => e.target.style.borderColor="#dc2626"}
                onBlur={e => e.target.style.borderColor="#e5e7eb"}
              />
            </div>
            <button type="submit" disabled={loading} style={{ width:"100%", padding:".85rem", borderRadius:12, border:"none", background:"#dc2626", color:"#fff", fontSize:"1rem", fontWeight:700, fontFamily:"inherit", cursor:"pointer", boxShadow:"0 6px 20px rgba(220,38,38,.3)", opacity:loading?.7:1, transition:"all .2s" }}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <a href="https://gmail.com" target="_blank" rel="noreferrer" style={{ display:"block", padding:".75rem", borderRadius:12, background:"rgba(220,38,38,.06)", color:"#dc2626", border:"1px solid rgba(220,38,38,.2)", textAlign:"center", fontSize:".9rem", fontWeight:600, textDecoration:"none" }}>Open Gmail →</a>
            <button onClick={() => setSent(false)} style={{ padding:".75rem", borderRadius:12, background:"transparent", color:"#64748b", border:"1px solid #e5e7eb", fontSize:".875rem", fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>Try a different email</button>
          </div>
        )}

        <p style={{ textAlign:"center", marginTop:"1.5rem", fontSize:".875rem", color:"#6b7280" }}>
          Remember your password? <Link to="/login" style={{ color:"#dc2626", fontWeight:700, textDecoration:"none" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
