import React from "react";

const testimonials = [
  { name:"Rahim Uddin", role:"Blood Donor", blood:"O+", text:"I donated blood through BloodUnity and the experience was seamless. The platform made it easy to find a patient in need near me. Knowing I saved a life is the best feeling.", avatar:"RU" },
  { name:"Fatema Begum", role:"Patient's Family", blood:"A−", text:"My father needed blood urgently after surgery. Within 20 minutes of posting a request, we had 3 donors respond. BloodUnity literally saved my father's life.", avatar:"FB" },
  { name:"Tariq Hossain", role:"Regular Donor", blood:"B+", text:"I've donated 8 times through this platform. The interface is clean, responses are fast, and the team is very professional. Highly recommend to everyone.", avatar:"TH" },
  { name:"Dr. Nusrat Islam", role:"Hospital Partner", blood:"AB+", text:"As a doctor, I recommend BloodUnity to all my patients. The verified donor network has helped us find compatible blood types even in critical situations.", avatar:"NI" },
];

const TestimonialsSection = () => (
  <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"5rem 1.5rem",fontFamily:"'DM Sans',sans-serif" }}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');.tc{background:#fff;border-radius:20px;padding:2rem;border:1px solid rgba(0,0,0,.06);transition:all .3s;position:relative}.tc:hover{transform:translateY(-5px);box-shadow:0 20px 60px rgba(220,38,38,.09);border-color:rgba(220,38,38,.15)}`}</style>
    <div style={{ maxWidth:1100,margin:"0 auto" }}>
      <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
        <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8 }}>Community voices</p>
        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,2.8rem)",fontWeight:900,color:"#0f172a",letterSpacing:"-.02em",margin:0 }}>What Our Community Says</h1>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.25rem" }}>
        {testimonials.map(t => (
          <div key={t.name} className="tc">
            <div style={{ fontSize:"1.5rem",color:"#dc2626",marginBottom:"1rem",opacity:.4 }}>"</div>
            <p style={{ color:"#475569",lineHeight:1.75,fontSize:".9rem",marginBottom:"1.5rem" }}>{t.text}</p>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:44,height:44,borderRadius:"50%",background:"rgba(220,38,38,.1)",display:"flex",alignItems:"center",justifyContent:"center",color:"#dc2626",fontWeight:700,fontSize:".85rem",flexShrink:0 }}>{t.avatar}</div>
              <div>
                <div style={{ fontWeight:700,color:"#0f172a",fontSize:".875rem" }}>{t.name}</div>
                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <span style={{ fontSize:".75rem",color:"#94a3b8" }}>{t.role}</span>
                  <span style={{ background:"rgba(220,38,38,.1)",color:"#dc2626",padding:"1px 7px",borderRadius:50,fontSize:".68rem",fontWeight:700 }}>{t.blood}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TestimonialsSection;
