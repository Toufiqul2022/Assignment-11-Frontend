import React from "react";
import Card1 from "../assets/Card_1.jpg";
import Card2 from "../assets/Card_2.jpg";
import Card3 from "../assets/Card_3.png";
import { Link } from "react-router";

const FeaturesSection = () => {
  const features = [
    { img:Card1, tag:"Community", title:"Support Campaigns", desc:"Join donation drives and special initiatives that directly save lives across Bangladesh." },
    { img:Card2, tag:"Education", title:"Blood Donation Facts", desc:"Learn about blood types, eligibility criteria, and how a single donation can help up to 3 patients." },
    { img:Card3, tag:"Impact", title:"Real Success Stories", desc:"Stories from donors and recipients showing the life-saving impact of blood donation." },
    { tag:"Emergency", title:"Emergency Alerts", desc:"Get real-time alerts for emergency blood requests near your location. Respond in minutes.", emoji:"🚨" },
    { tag:"Search", title:"Smart Donor Search", desc:"Find compatible donors by blood type, district, and upazila with instant results.", emoji:"🔍" },
    { tag:"Security", title:"Verified Donors", desc:"All donors are verified through our secure registration process for maximum safety.", emoji:"✅" },
  ];

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"5rem 1.5rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');.fc{background:#fff;border-radius:18px;overflow:hidden;border:1px solid rgba(0,0,0,.06);transition:all .35s}.fc:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(220,38,38,.1);border-color:rgba(220,38,38,.18)}.fc:hover .fi{transform:scale(1.05)}.fi{width:100%;height:190px;object-fit:cover;transition:transform .6s;display:block}.ep{background:#fff;border-radius:18px;border:1px solid rgba(0,0,0,.06);padding:2rem;transition:all .35s;position:relative;overflow:hidden}.ep::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:#dc2626;transform:scaleX(0);transform-origin:left;transition:transform .4s}.ep:hover::before{transform:scaleX(1)}.ep:hover{box-shadow:0 20px 60px rgba(220,38,38,.08);transform:translateY(-4px)}`}</style>

      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
          <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8 }}>Platform features</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,2.8rem)",fontWeight:900,color:"#0f172a",letterSpacing:"-.02em",margin:"0 0 1rem" }}>Everything You Need</h1>
          <p style={{ color:"#64748b",fontSize:"1rem",maxWidth:480,margin:"0 auto" }}>BloodUnity provides all the tools needed to connect donors with patients quickly and safely.</p>
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.25rem" }}>
          {features.map(f => f.img ? (
            <div key={f.title} className="fc">
              <img src={f.img} alt={f.title} className="fi" loading="lazy"/>
              <div style={{ padding:"1.4rem" }}>
                <div style={{ fontSize:".72rem",fontWeight:700,color:"#dc2626",textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>{f.tag}</div>
                <div style={{ fontSize:"1.05rem",fontWeight:700,color:"#0f172a",marginBottom:8 }}>{f.title}</div>
                <div style={{ fontSize:".875rem",color:"#64748b",lineHeight:1.65 }}>{f.desc}</div>
              </div>
            </div>
          ) : (
            <div key={f.title} className="ep">
              <div style={{ fontSize:"2rem",marginBottom:".75rem" }}>{f.emoji}</div>
              <div style={{ fontSize:".72rem",fontWeight:700,color:"#dc2626",textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>{f.tag}</div>
              <div style={{ fontSize:"1.05rem",fontWeight:700,color:"#0f172a",marginBottom:8 }}>{f.title}</div>
              <div style={{ fontSize:".875rem",color:"#64748b",lineHeight:1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center",marginTop:"3rem" }}>
          <Link to="/register" style={{ display:"inline-block",padding:".85rem 2.5rem",borderRadius:50,background:"#dc2626",color:"#fff",fontWeight:700,fontSize:"1rem",textDecoration:"none",boxShadow:"0 8px 30px rgba(220,38,38,.35)" }}>Get Started Free</Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
