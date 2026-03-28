import React from "react";
import { Link } from "react-router";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const EmergencyRequests = () => {
  const axiosInstance = useAxios();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["emergency-requests"],
    queryFn: () => axiosInstance.get("/donation-requests?status=pending").then(r => r.data),
    refetchInterval: 30000,
  });

  return (
    <div style={{ minHeight:"100vh",background:"#0a0008",padding:"3rem 1.5rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');@keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}@keyframes spin{to{transform:rotate(360deg)}}.ec{background:rgba(255,255,255,.04);border:1px solid rgba(220,38,38,.2);border-radius:16px;padding:1.4rem;transition:all .3s}.ec:hover{background:rgba(220,38,38,.06);border-color:rgba(220,38,38,.4);transform:translateY(-3px)}`}</style>

      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:"3rem" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,38,38,.15)",border:"1px solid rgba(220,38,38,.35)",borderRadius:50,padding:"5px 16px",fontSize:".78rem",fontWeight:600,color:"#fca5a5",marginBottom:"1.25rem" }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:"#dc2626",display:"inline-block",animation:"blink 1s ease-in-out infinite" }}/>
            LIVE EMERGENCY BOARD
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:900,color:"#fff",letterSpacing:"-.02em",margin:"0 0 .75rem" }}>Emergency Requests</h1>
          <p style={{ color:"rgba(255,255,255,.5)",fontSize:"1rem" }}>These patients need blood urgently. Please respond immediately.</p>
        </div>

        {isLoading && <div style={{ display:"flex",justifyContent:"center",padding:"4rem" }}><div style={{ width:36,height:36,border:"3px solid rgba(255,255,255,.1)",borderTop:"3px solid #dc2626",borderRadius:"50%",animation:"spin .8s linear infinite" }}/></div>}

        {!isLoading && requests.length === 0 && (
          <div style={{ textAlign:"center",padding:"4rem",color:"rgba(255,255,255,.4)" }}>
            <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>✅</div>
            <p>No emergency requests at this time.</p>
          </div>
        )}

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1rem" }}>
          {requests.map(req => (
            <div key={req._id} className="ec">
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem" }}>
                <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"2.2rem",fontWeight:900,color:"#dc2626",lineHeight:1 }}>{req.bloodGroup}</span>
                <span style={{ background:"rgba(220,38,38,.2)",color:"#fca5a5",border:"1px solid rgba(220,38,38,.35)",padding:"3px 10px",borderRadius:50,fontSize:".7rem",fontWeight:600 }}>URGENT</span>
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:7,marginBottom:"1.25rem" }}>
                {[["Recipient",req.recipientName],["Hospital",req.hospital],["Location",`${req.upazila}, ${req.district}`],["Date",req.donationDate]].map(([l,v])=>(
                  <div key={l} style={{ display:"flex",gap:8,fontSize:".82rem" }}>
                    <span style={{ color:"rgba(255,255,255,.35)",minWidth:80 }}>{l}</span>
                    <span style={{ color:"rgba(255,255,255,.8)",fontWeight:500 }}>{v}</span>
                  </div>
                ))}
              </div>
              <Link to={`/requests/${req._id}`} style={{ display:"block",width:"100%",padding:".65rem",borderRadius:10,border:"1.5px solid rgba(220,38,38,.4)",background:"rgba(220,38,38,.12)",color:"#fca5a5",fontSize:".85rem",fontWeight:600,textAlign:"center",textDecoration:"none",transition:"all .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="#dc2626";e.currentTarget.style.color="#fff"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(220,38,38,.12)";e.currentTarget.style.color="#fca5a5"}}>
                Respond Now →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequests;
