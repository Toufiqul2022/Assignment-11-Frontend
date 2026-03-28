import React, { useState } from "react";

const faqs = [
  { q:"Who can donate blood?", a:"Most healthy adults aged 18-65 who weigh at least 50kg can donate. You must not have donated in the last 3 months and must be free from certain medical conditions." },
  { q:"How often can I donate blood?", a:"Whole blood can be donated every 3 months (90 days). Platelets can be donated every 2 weeks, and plasma every 28 days." },
  { q:"Does donating blood hurt?", a:"You may feel a brief pinch when the needle is inserted, but the donation itself is generally painless. The entire process takes about 45–60 minutes." },
  { q:"How do I register as a donor on BloodUnity?", a:"Click 'Join Now', fill in your details including blood type and location, and your account will be activated within 24 hours." },
  { q:"What happens after I respond to a request?", a:"The requester receives your contact information and you'll be in direct contact to coordinate the donation at a hospital or blood bank." },
  { q:"Is my personal information safe?", a:"Yes. We only share your name and contact details with the requester when you accept a donation request. Your data is never sold or shared with third parties." },
  { q:"Can I donate if I have taken medication?", a:"It depends on the medication. Common medications like paracetamol don't affect eligibility. Please consult your doctor or contact us for specific cases." },
  { q:"What are the benefits of donating blood?", a:"Besides saving lives, regular donors get free health screenings. Donation also reduces iron levels, which can lower the risk of cardiovascular disease." },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"5rem 1.5rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');`}</style>
      <div style={{ maxWidth:720,margin:"0 auto" }}>
        <div style={{ textAlign:"center",marginBottom:"3.5rem" }}>
          <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:8 }}>Help center</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(2rem,4vw,2.8rem)",fontWeight:900,color:"#0f172a",letterSpacing:"-.02em",margin:0 }}>Frequently Asked Questions</h1>
        </div>

        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {faqs.map((faq,i) => (
            <div key={i} onClick={()=>setOpen(open===i?null:i)} style={{ background:"#fff",borderRadius:14,border:`1px solid ${open===i?"rgba(220,38,38,.25)":"rgba(0,0,0,.06)"}`,overflow:"hidden",cursor:"pointer",transition:"border-color .2s" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.1rem 1.4rem",background:open===i?"rgba(220,38,38,.02)":"transparent" }}>
                <span style={{ fontWeight:600,color:"#0f172a",fontSize:".95rem",flex:1,paddingRight:"1rem" }}>{faq.q}</span>
                <span style={{ width:24,height:24,borderRadius:"50%",background:open===i?"#dc2626":"rgba(220,38,38,.1)",color:open===i?"#fff":"#dc2626",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0,transition:"all .2s" }}>
                  {open===i?"−":"+"}
                </span>
              </div>
              {open===i && (
                <div style={{ padding:"0 1.4rem 1.1rem",color:"#64748b",fontSize:".9rem",lineHeight:1.7 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
