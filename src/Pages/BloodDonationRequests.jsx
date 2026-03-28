import React, { useContext } from "react";
import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";

const sc = { pending:"#fef3c7,#92400e,#f59e0b", inprogress:"#dbeafe,#1e40af,#3b82f6", done:"#dcfce7,#166534,#22c55e", canceled:"#fee2e2,#991b1b,#ef4444" };

const BloodDonationRequests = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: requests = [], isLoading, isError } = useQuery({
    queryKey: ["blood-requests"],
    queryFn: () => axiosInstance.get("/donation-requests").then(r => r.data),
  });

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"3rem 1.5rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');.rc{background:#fff;border-radius:18px;border:1px solid rgba(0,0,0,.06);padding:1.5rem;transition:all .35s;cursor:pointer}.rc:hover{transform:translateY(-5px);box-shadow:0 20px 60px rgba(220,38,38,.1);border-color:rgba(220,38,38,.2)}`}</style>

      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:"3rem" }}>
          <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8 }}>Live board</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:900,color:"#0f172a",letterSpacing:"-.02em",margin:"0 0 .75rem" }}>Blood Donation Requests</h1>
          <p style={{ color:"#64748b",fontSize:"1rem",maxWidth:460,margin:"0 auto" }}>Active requests from patients across Bangladesh. Your blood can save a life today.</p>
        </div>

        {isLoading && (
          <div style={{ display:"flex",justifyContent:"center",padding:"4rem" }}>
            <div style={{ width:40,height:40,border:"3px solid #f3f3f3",borderTop:"3px solid #dc2626",borderRadius:"50%",animation:"spin .8s linear infinite" }}/>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {isError && <div style={{ textAlign:"center",padding:"4rem",color:"#dc2626" }}>Failed to load requests. Please check back later.</div>}

        {!isLoading && !isError && requests.length === 0 && (
          <div style={{ textAlign:"center",padding:"4rem" }}>
            <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>🩸</div>
            <p style={{ color:"#64748b",fontSize:"1rem" }}>No pending requests at the moment.</p>
          </div>
        )}

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.25rem" }}>
          {requests.map(req => {
            const [bg,col,dot] = (sc[req.status]||sc.pending).split(",");
            return (
              <div key={req._id} className="rc" onClick={()=>navigate(user?`/requests/${req._id}`:"/login")}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem" }}>
                  <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:900,color:"#dc2626",lineHeight:1 }}>{req.bloodGroup}</span>
                  <span style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:50,fontSize:".7rem",fontWeight:600,textTransform:"capitalize",background:bg,color:col }}><span style={{ width:5,height:5,borderRadius:"50%",background:dot }}/>{req.status}</span>
                </div>
                <div style={{ display:"flex",flexDirection:"column",gap:6,marginBottom:"1.25rem" }}>
                  {[["👤 Recipient",req.recipientName],["🏥 Hospital",req.hospital],["📍 Location",`${req.upazila}, ${req.district}`],["📅 Date",req.donationDate]].map(([l,v])=>(
                    <div key={l} style={{ display:"flex",gap:8,fontSize:".82rem" }}>
                      <span style={{ color:"#94a3b8",minWidth:90 }}>{l}</span>
                      <span style={{ color:"#374151",fontWeight:500 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={e=>{e.stopPropagation();navigate(user?`/requests/${req._id}`:"/login")}} style={{ width:"100%",padding:".65rem",borderRadius:10,border:"1.5px solid rgba(220,38,38,.3)",background:"transparent",color:"#dc2626",fontSize:".85rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all .2s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#dc2626";e.currentTarget.style.color="#fff"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#dc2626"}}>
                  View Details →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BloodDonationRequests;
