import React from "react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const StatisticsSection = () => {
  const axiosInstance = useAxios();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: () => axiosInstance.get("/dashboard-stats").then(r => r.data),
  });

  const items = [
    { label:"Total Donors", value:stats.totalUsers||"—", icon:"👥", desc:"Verified registered donors" },
    { label:"Blood Requests", value:stats.totalRequests||"—", icon:"🩸", desc:"Total requests created" },
    { label:"Total Funding", value:stats.totalFunding?`$${stats.totalFunding}`:"—", icon:"💰", desc:"Raised through platform" },
    { label:"Districts Covered", value:"64", icon:"📍", desc:"Across all Bangladesh" },
  ];

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"5rem 1.5rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');.sc{background:#fff;border-radius:20px;padding:2.25rem;border:1px solid rgba(0,0,0,.06);transition:all .3s;text-align:center}.sc:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(220,38,38,.1);border-color:rgba(220,38,38,.2)}`}</style>

      <div style={{ maxWidth:1000,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
          <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8 }}>Impact</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,2.8rem)",fontWeight:900,color:"#0f172a",letterSpacing:"-.02em",margin:0 }}>Our Numbers Tell the Story</h1>
        </div>

        {isLoading ? (
          <div style={{ display:"flex",justifyContent:"center",padding:"4rem" }}><div style={{ width:36,height:36,border:"3px solid #f3f3f3",borderTop:"3px solid #dc2626",borderRadius:"50%",animation:"spin .8s linear infinite" }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>
        ) : (
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1.5rem" }}>
            {items.map(s => (
              <div key={s.label} className="sc">
                <div style={{ fontSize:"2rem",marginBottom:".75rem" }}>{s.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"2.5rem",fontWeight:900,color:"#dc2626",lineHeight:1,marginBottom:6 }}>{s.value}</div>
                <div style={{ fontSize:".9rem",fontWeight:700,color:"#0f172a",marginBottom:4 }}>{s.label}</div>
                <div style={{ fontSize:".8rem",color:"#94a3b8" }}>{s.desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsSection;
