import React from "react";
import { Link } from "react-router";

const HighlightsSection = () => {
  const highlights = [
    { emoji:"🏆", title:"Most Active District", value:"Dhaka", desc:"Over 3,200 successful donations" },
    { emoji:"⚡", title:"Fastest Response", value:"4 min", desc:"Average time from request to donor response" },
    { emoji:"🌟", title:"Top Donor", value:"100+", desc:"Donations by our most active member" },
    { emoji:"📈", title:"Growth This Year", value:"+240%", desc:"Increase in registered donors" },
    { emoji:"🤝", title:"Hospital Partners", value:"150+", desc:"Hospitals and clinics in our network" },
    { emoji:"💉", title:"Rarest Blood", value:"AB−", desc:"Donors ready to respond immediately" },
  ];
  return (
    <div style={{ minHeight:"100vh",background:"#0a0e14",padding:"5rem 1.5rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');.hc{border:1px solid rgba(220,38,38,.2);border-radius:18px;padding:2rem;background:rgba(220,38,38,.04);transition:all .3s}.hc:hover{background:rgba(220,38,38,.08);border-color:rgba(220,38,38,.4);transform:translateY(-4px)}`}</style>

      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
          <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8 }}>Milestones</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,2.8rem)",fontWeight:900,color:"#fff",letterSpacing:"-.02em",margin:"0 0 1rem" }}>Our Highlights</h1>
          <p style={{ color:"rgba(255,255,255,.5)",fontSize:"1rem" }}>The numbers that define our impact across Bangladesh.</p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"1.25rem" }}>
          {highlights.map(h => (
            <div key={h.title} className="hc">
              <div style={{ fontSize:"2rem",marginBottom:".75rem" }}>{h.emoji}</div>
              <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"2.2rem",fontWeight:900,color:"#dc2626",lineHeight:1,marginBottom:6 }}>{h.value}</div>
              <div style={{ fontSize:".95rem",fontWeight:700,color:"#fff",marginBottom:6 }}>{h.title}</div>
              <div style={{ fontSize:".82rem",color:"rgba(255,255,255,.45)",lineHeight:1.6 }}>{h.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center",marginTop:"3rem" }}>
          <Link to="/register" style={{ display:"inline-block",padding:".85rem 2.5rem",borderRadius:50,background:"#dc2626",color:"#fff",fontWeight:700,fontSize:"1rem",textDecoration:"none",boxShadow:"0 8px 30px rgba(220,38,38,.35)" }}>Join Our Community</Link>
        </div>
      </div>
    </div>
  );
};

export default HighlightsSection;
