import React from "react";
import { Link } from "react-router";
import card4 from "../assets/card-4.png";
import card5 from "../assets/card-5.png";
import card6 from "../assets/card-6.png";

const posts = [
  { img:card4, tag:"Health", title:"The Science Behind Blood Types", date:"Jan 12, 2025", read:"4 min read", desc:"Understanding ABO and Rh blood group systems — why compatibility matters for safe transfusions." },
  { img:card5, tag:"Tips", title:"Before Your First Donation", date:"Jan 25, 2025", read:"3 min read", desc:"What to eat, what to avoid, and how to prepare physically and mentally before donating blood." },
  { img:card6, tag:"Stories", title:"How One Donor Saved Three Lives", date:"Feb 8, 2025", read:"5 min read", desc:"A remarkable true story from Chittagong where a single O− donation helped three trauma patients." },
];

const Blogs = () => (
  <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"5rem 1.5rem",fontFamily:"'DM Sans',sans-serif" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');.bc{background:#fff;border-radius:18px;overflow:hidden;border:1px solid rgba(0,0,0,.06);transition:all .35s}.bc:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(220,38,38,.1);border-color:rgba(220,38,38,.18)}.bc:hover .bi{transform:scale(1.05)}.bi{width:100%;height:200px;object-fit:cover;transition:transform .6s;display:block}`}</style>
    <div style={{ maxWidth:1100,margin:"0 auto" }}>
      <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
        <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8 }}>Latest articles</p>
        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,2.8rem)",fontWeight:900,color:"#0f172a",letterSpacing:"-.02em",margin:0 }}>Blog &amp; Resources</h1>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.5rem" }}>
        {posts.map(p => (
          <div key={p.title} className="bc">
            <img src={p.img} alt={p.title} className="bi" loading="lazy"/>
            <div style={{ padding:"1.5rem" }}>
              <div style={{ display:"flex",gap:10,alignItems:"center",marginBottom:"0.75rem" }}>
                <span style={{ background:"rgba(220,38,38,.09)",color:"#dc2626",padding:"2px 10px",borderRadius:50,fontSize:".7rem",fontWeight:700 }}>{p.tag}</span>
                <span style={{ fontSize:".72rem",color:"#94a3b8" }}>{p.date} · {p.read}</span>
              </div>
              <div style={{ fontSize:"1.05rem",fontWeight:700,color:"#0f172a",marginBottom:8,lineHeight:1.35 }}>{p.title}</div>
              <div style={{ fontSize:".875rem",color:"#64748b",lineHeight:1.65 }}>{p.desc}</div>
              <div style={{ marginTop:"1.25rem" }}>
                <Link to="/" style={{ color:"#dc2626",fontWeight:600,fontSize:".85rem",textDecoration:"none" }}>Read more →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Blogs;
