import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { auth } from "../Firebase/Firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { setUser, handleGoogleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    if (!password) return toast.warning("Enter your password");
    setLoading(true);
    try {
      const r = await signInWithEmailAndPassword(auth, email, password);
      setUser(r.user);
      toast.success("Welcome back!", { autoClose: 1500 });
      setTimeout(() => navigate(location.state || "/"), 1500);
    } catch {
      toast.error("Invalid email or password.");
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    try {
      const r = await handleGoogleSignIn();
      setUser(r.user);
      navigate(location.state || "/");
    } catch (e) { toast.error(e.message); }
  };

  return (
    <div style={{ minHeight:"100vh",display:"flex",fontFamily:"'DM Sans',sans-serif" }}>
      <ToastContainer position="top-right"/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&family=Playfair+Display:wght@700;900&display=swap');
        .ll{flex:1;background:linear-gradient(160deg,#1a0505,#3d0000 40%,#7f1d1d);display:flex;flex-direction:column;justify-content:center;padding:4rem;position:relative;overflow:hidden}
        .ll::before,.ll::after{content:'';position:absolute;border-radius:50%;border:1px solid rgba(220,38,38,.18)}
        .ll::before{top:-100px;right:-100px;width:380px;height:380px;background:rgba(220,38,38,.08)}
        .ll::after{bottom:-150px;left:-80px;width:480px;height:480px;background:rgba(220,38,38,.05)}
        .lr{flex:1;display:flex;align-items:center;justify-content:center;padding:3rem 2rem;background:#fafafa}
        .fi{width:100%;padding:.8rem 1rem;border:1.5px solid #e5e7eb;border-radius:12px;font-size:.95rem;font-family:inherit;color:#111827;background:#fff;outline:none;transition:all .2s;box-sizing:border-box}
        .fi:focus{border-color:#dc2626;box-shadow:0 0 0 3px rgba(220,38,38,.1)}
        .bs{width:100%;padding:.88rem;background:#dc2626;color:#fff;border:none;border-radius:12px;font-size:1rem;font-weight:700;font-family:inherit;cursor:pointer;transition:all .3s;box-shadow:0 6px 20px rgba(220,38,38,.3)}
        .bs:hover:not(:disabled){background:#b91c1c;transform:translateY(-2px);box-shadow:0 10px 30px rgba(220,38,38,.4)}
        .bs:disabled{opacity:.7;cursor:not-allowed}
        .bg{width:100%;padding:.8rem;background:#fff;color:#374151;border:1.5px solid #e5e7eb;border-radius:12px;font-size:.95rem;font-weight:600;font-family:inherit;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:10px}
        .bg:hover{border-color:#d1d5db;background:#f9fafb;box-shadow:0 2px 12px rgba(0,0,0,.06)}
        @keyframes fd{0%{width:80px;height:80px;opacity:.3}50%{opacity:.15}100%{width:80px;height:80px;opacity:.3}}
      `}</style>

      {/* Left */}
      <div className="ll" style={{ display:"none" }} ref={el => { if (el) el.style.display = window.innerWidth >= 1024 ? "flex" : "none" }}>
        <div className="ll" style={{ position:"static",padding:0,background:"none" }}>
        </div>
      </div>
      <div className="hidden lg:flex" style={{ flex:1,background:"linear-gradient(160deg,#1a0505,#3d0000 40%,#7f1d1d)",flexDirection:"column",justifyContent:"center",padding:"4rem",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-100,right:-100,width:380,height:380,borderRadius:"50%",border:"1px solid rgba(220,38,38,.18)",background:"rgba(220,38,38,.08)" }}/>
        <div style={{ position:"absolute",bottom:-150,left:-80,width:480,height:480,borderRadius:"50%",border:"1px solid rgba(220,38,38,.12)",background:"rgba(220,38,38,.05)" }}/>
        <div style={{ position:"relative",zIndex:2 }}>
          <Link to="/" style={{ display:"flex",alignItems:"center",gap:8,textDecoration:"none",marginBottom:"3rem" }}>
            <svg width="28" height="34" viewBox="0 0 28 34" fill="none"><path d="M14 0C14 0 0 16 0 22C0 29.7 6.3 34 14 34C21.7 34 28 29.7 28 22C28 16 14 0 14 0Z" fill="#dc2626"/><path d="M10 24C10 21 12 18 14 16C16 18 18 21 18 24C18 26.2 16.2 28 14 28C11.8 28 10 26.2 10 24Z" fill="rgba(255,255,255,.3)"/></svg>
            <span style={{ fontSize:"1.4rem",fontWeight:800,color:"#fff" }}>BloodUnity</span>
          </Link>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2.8rem",fontWeight:900,color:"#fff",lineHeight:1.08,letterSpacing:"-.02em",marginBottom:"1.25rem" }}>Every drop<br/>saves a life</h2>
          <p style={{ color:"rgba(255,255,255,.6)",lineHeight:1.75,fontSize:"1rem",maxWidth:320,marginBottom:"2.5rem" }}>Join 12,000+ verified donors across Bangladesh. Sign in to respond to requests near you.</p>
          {["10,000+ donors registered","5,800+ lives saved","64 districts covered"].map(t=>(
            <div key={t} style={{ display:"flex",alignItems:"center",gap:10,color:"rgba(255,255,255,.65)",fontSize:".9rem",marginBottom:"0.65rem" }}>
              <span style={{ width:6,height:6,borderRadius:"50%",background:"#dc2626",flexShrink:0 }}/>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="lr">
        <div style={{ width:"100%",maxWidth:400 }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:900,color:"#111827",letterSpacing:"-.02em",marginBottom:".5rem" }}>Welcome back</h1>
          <p style={{ color:"#6b7280",fontSize:".9rem",marginBottom:"2rem" }}>Don't have an account? <Link to="/register" style={{ color:"#dc2626",fontWeight:700,textDecoration:"none" }}>Sign up free</Link></p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:"1rem" }}>
              <label style={{ display:"block",fontSize:".78rem",fontWeight:600,color:"#374151",marginBottom:6,letterSpacing:".04em",textTransform:"uppercase" }}>Email</label>
              <input className="fi" type="email" name="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
            </div>
            <div style={{ marginBottom:"1.25rem" }}>
              <label style={{ display:"flex",justifyContent:"space-between",fontSize:".78rem",fontWeight:600,color:"#374151",marginBottom:6,letterSpacing:".04em",textTransform:"uppercase" }}>
                Password
                <button type="button" onClick={()=>email?navigate(`/forget/${encodeURIComponent(email)}`):toast.warning("Enter email first")}
                  style={{ background:"none",border:"none",color:"#dc2626",fontSize:".8rem",fontWeight:600,cursor:"pointer",padding:0,textTransform:"none",letterSpacing:"normal" }}>
                  Forgot password?
                </button>
              </label>
              <div style={{ position:"relative" }}>
                <input className="fi" type={showPw?"text":"password"} name="password" placeholder="••••••••" style={{ paddingRight:"2.75rem" }} required/>
                <button type="button" onClick={()=>setShowPw(s=>!s)} style={{ position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9ca3af",display:"flex",padding:4 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPw?<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                  </svg>
                </button>
              </div>
            </div>
            <button type="submit" className="bs" disabled={loading}>{loading?"Signing in...":"Sign In"}</button>
          </form>

          <div style={{ display:"flex",alignItems:"center",gap:12,margin:"1.25rem 0",color:"#9ca3af",fontSize:".8rem" }}>
            <div style={{ flex:1,height:1,background:"#e5e7eb" }}/> or continue with <div style={{ flex:1,height:1,background:"#e5e7eb" }}/>
          </div>

          <button className="bg" onClick={handleGoogle}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
