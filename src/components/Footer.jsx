import React from "react";
import { Link } from "react-router";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background:"#080c10", color:"#94a3b8", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap'); .fl{color:#64748b;text-decoration:none;font-size:.875rem;display:block;padding:3px 0;transition:color .2s}.fl:hover{color:#dc2626}.sb{width:36px;height:36px;border-radius:9px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);display:flex;align-items:center;justify-content:center;color:#64748b;cursor:pointer;transition:all .2s;text-decoration:none}.sb:hover{background:rgba(220,38,38,.15);border-color:rgba(220,38,38,.4);color:#dc2626;transform:translateY(-2px)}`}</style>

      {/* CTA Band */}
      <div style={{ borderTop:"1px solid rgba(220,38,38,.18)", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",padding:"2.5rem 1.5rem",display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:"1.5rem" }}>
          <div>
            <p style={{ fontSize:".75rem",color:"#dc2626",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",marginBottom:4 }}>Ready to save a life?</p>
            <h3 style={{ fontSize:"1.5rem",fontWeight:800,color:"#fff",letterSpacing:"-.02em",margin:0 }}>Every drop counts. Donate today.</h3>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <Link to="/register" style={{ background:"#dc2626",color:"#fff",padding:".6rem 1.4rem",borderRadius:50,fontWeight:700,fontSize:".875rem",textDecoration:"none" }}>Become a Donor</Link>
            <Link to="/search" style={{ border:"1.5px solid rgba(255,255,255,.15)",color:"#fff",padding:".6rem 1.4rem",borderRadius:50,fontWeight:600,fontSize:".875rem",textDecoration:"none" }}>Find Blood</Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"3.5rem 1.5rem 2rem" }}>
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"2.5rem",flexWrap:"wrap" }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:"1rem" }}>
              <svg width="22" height="28" viewBox="0 0 28 34" fill="none"><path d="M14 0C14 0 0 16 0 22C0 29.7 6.3 34 14 34C21.7 34 28 29.7 28 22C28 16 14 0 14 0Z" fill="#dc2626"/><path d="M10 24C10 21 12 18 14 16C16 18 18 21 18 24C18 26.2 16.2 28 14 28C11.8 28 10 26.2 10 24Z" fill="rgba(255,255,255,.3)"/></svg>
              <span style={{ fontSize:"1.25rem",fontWeight:800,color:"#fff" }}>BloodUnity</span>
            </div>
            <p style={{ fontSize:".875rem",lineHeight:1.7,color:"#64748b",marginBottom:"1.25rem",maxWidth:230 }}>Connecting donors with patients across Bangladesh. Every donation saves up to 3 lives.</p>
            <div style={{ display:"flex",gap:8 }}>
              {[
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>,
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
              ].map((icon, i) => <a key={i} href="#" className="sb">{icon}</a>)}
            </div>
          </div>
          {[["Platform",["/search|Find Donors","/requests|Requests","/emergencyReq|Emergency","/funding|Funding"]],["Company",["/blogs|Blogs","/faq|FAQ","/statistics|Statistics","/features|Features"]],["Account",["/register|Register","/login|Login","/dashboard|Dashboard","/dashboard/profile|Profile"]]].map(([h,ls])=>(
            <div key={h}>
              <p style={{ fontSize:".72rem",fontWeight:700,color:"#fff",letterSpacing:".1em",textTransform:"uppercase",marginBottom:"1rem" }}>{h}</p>
              {ls.map(l=>{const[to,label]=l.split("|");return <Link key={to} to={to} className="fl">{label}</Link>})}
            </div>
          ))}
        </div>

        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",margin:"2.5rem 0",maxWidth:520 }}>
          {[["10,000+","Donors"],["5,000+","Lives Saved"],["64","Districts"]].map(([v,l])=>(
            <div key={l} style={{ border:"1px solid rgba(220,38,38,.15)",borderRadius:12,padding:"1rem 1.25rem",background:"rgba(220,38,38,.03)",textAlign:"center" }}>
              <div style={{ fontSize:"1.4rem",fontWeight:800,color:"#dc2626",letterSpacing:"-.02em" }}>{v}</div>
              <div style={{ fontSize:".72rem",color:"#64748b",marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"1.25rem",display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:"1rem" }}>
          <p style={{ fontSize:".8rem",color:"#475569" }}>© {year} BloodUnity. All rights reserved.</p>
          <div style={{ display:"flex",gap:"1.25rem" }}>
            {["Privacy Policy","Terms","Contact"].map(t=><a key={t} href="#" style={{ fontSize:".8rem",color:"#475569",textDecoration:"none" }}>{t}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
