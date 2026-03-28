import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Donate from "../assets/Donate.jpg";
import Card1 from "../assets/Card_1.jpg";
import Card2 from "../assets/Card_2.jpg";
import Card3 from "../assets/Card_3.png";

const Counter = ({ to, suffix="" }) => {
  const [v, setV] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let n = 0;
      const step = to / 60;
      const id = setInterval(() => {
        n += step;
        if (n >= to) { setV(to); clearInterval(id); } else setV(Math.floor(n));
      }, 16);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
};

const Home = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const handleContact = (e) => {
    e.preventDefault();
    toast.success("Message received! We'll get back to you soon.");
    formRef.current.reset();
  };

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif",overflowX:"hidden" }}>
      <ToastContainer position="top-right" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
        @keyframes slowZoom{from{transform:scale(1.04)}to{transform:scale(1.12)}}
        @keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.4}}
        .hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,7vw,5.5rem);font-weight:900;color:#fff;line-height:1.05;letter-spacing:-.02em;margin:0 0 1.5rem}
        .hero-title span{color:#f87171}
        .btn-p{background:#dc2626;color:#fff;border:none;padding:.85rem 2rem;border-radius:50px;font-size:1rem;font-weight:700;cursor:pointer;transition:all .3s;box-shadow:0 8px 30px rgba(220,38,38,.4);text-decoration:none;display:inline-block;font-family:inherit}
        .btn-p:hover{background:#b91c1c;transform:translateY(-3px);box-shadow:0 14px 40px rgba(220,38,38,.5)}
        .btn-s{background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.3);padding:.85rem 2rem;border-radius:50px;font-size:1rem;font-weight:600;cursor:pointer;transition:all .3s;text-decoration:none;display:inline-block;font-family:inherit}
        .btn-s:hover{background:rgba(255,255,255,.2);transform:translateY(-2px)}
        .sec-tag{font-size:.75rem;font-weight:700;color:#dc2626;text-transform:uppercase;letter-spacing:.15em;display:block;margin-bottom:.75rem}
        .sec-h{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.1;letter-spacing:-.02em;margin:0 0 1rem}
        .fc{border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,.07);transition:all .4s;border:1px solid rgba(0,0,0,.06)}
        .fc:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(220,38,38,.12);border-color:rgba(220,38,38,.2)}
        .fc:hover .fi{transform:scale(1.06)}
        .fi{width:100%;height:200px;object-fit:cover;transition:transform .6s;display:block}
        .wc{padding:2.25rem;border-radius:18px;background:#fff;border:1px solid rgba(0,0,0,.06);transition:all .3s;position:relative;overflow:hidden}
        .wc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:#dc2626;transform:scaleX(0);transform-origin:left;transition:transform .4s}
        .wc:hover::before{transform:scaleX(1)}
        .wc:hover{box-shadow:0 20px 60px rgba(220,38,38,.1);transform:translateY(-4px)}
        .sc{border-radius:16px;padding:2rem;background:#fff;border:1px solid rgba(0,0,0,.07);display:flex;gap:1.5rem;align-items:flex-start;transition:all .3s}
        .sc:hover{border-color:rgba(220,38,38,.2);box-shadow:0 10px 40px rgba(220,38,38,.08);transform:translateX(6px)}
        .bt{border:1.5px solid rgba(220,38,38,.22);border-radius:12px;padding:.9rem;text-align:center;background:rgba(220,38,38,.02);cursor:pointer;transition:all .2s;text-decoration:none;display:block}
        .bt:hover{background:rgba(220,38,38,.09);border-color:#dc2626;transform:scale(1.04)}
        .ci{width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:.85rem 1.1rem;color:#fff;font-size:.9rem;outline:none;transition:border-color .2s;box-sizing:border-box;font-family:inherit}
        .ci::placeholder{color:rgba(255,255,255,.3)}
        .ci:focus{border-color:rgba(220,38,38,.6)}
        textarea.ci{min-height:120px;resize:vertical}
      `}</style>

      {/* HERO */}
      <section style={{ minHeight:"100vh",position:"relative",display:"flex",alignItems:"center",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:`url(${Donate})`,backgroundSize:"cover",backgroundPosition:"center",filter:"brightness(.32) saturate(.8)",animation:"slowZoom 20s ease-in-out infinite alternate" }}/>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(100,0,0,.6),rgba(0,0,0,.25) 50%,rgba(0,0,20,.7))" }}/>
        <div style={{ position:"relative",zIndex:2,maxWidth:1200,margin:"0 auto",padding:"6rem 1.5rem 8rem",width:"100%" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(220,38,38,.18)",border:"1px solid rgba(220,38,38,.38)",borderRadius:50,padding:"5px 15px",fontSize:".78rem",fontWeight:600,color:"#fca5a5",letterSpacing:".08em",textTransform:"uppercase",marginBottom:"1.5rem" }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:"#dc2626",display:"inline-block",animation:"pulseDot 1.5s ease-in-out infinite" }}/>
            Bangladesh's #1 Blood Donation Network
          </div>
          <h1 className="hero-title">Your Blood.<br/><span>Someone's</span><br/>Second Chance.</h1>
          <p style={{ fontSize:"1.1rem",color:"rgba(255,255,255,.7)",maxWidth:500,lineHeight:1.75,marginBottom:"2.5rem" }}>Connect with thousands of verified donors across 64 districts. Every 2 seconds someone needs blood — be the reason they survive.</p>
          <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
            <button className="btn-p" onClick={()=>navigate("/register")}>Become a Donor</button>
            <button className="btn-s" onClick={()=>navigate("/search")}>Find Blood Now</button>
          </div>
          <div style={{ display:"flex",gap:8,marginTop:"2.5rem",flexWrap:"wrap" }}>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bt=>(
              <span key={bt} style={{ background:"rgba(220,38,38,.18)",border:"1px solid rgba(220,38,38,.38)",color:"#fca5a5",borderRadius:8,padding:"4px 12px",fontSize:".85rem",fontWeight:700 }}>{bt}</span>
            ))}
          </div>
        </div>
        <div style={{ position:"absolute",bottom:"2rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,color:"rgba(255,255,255,.45)",fontSize:".7rem",letterSpacing:".1em",textTransform:"uppercase" }}>
          <div style={{ width:1,height:38,background:"linear-gradient(to bottom,rgba(255,255,255,.5),transparent)",animation:"scrollLine 1.6s ease-in-out infinite" }}/>
          <span>Scroll</span>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:"#0a0e14",borderTop:"1px solid rgba(220,38,38,.18)",borderBottom:"1px solid rgba(255,255,255,.04)" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)" }}>
          {[[12000,"+","Registered Donors"],[5800,"+","Lives Saved"],[64,"","Districts"],[98,"%","Success Rate"]].map(([n,s,l])=>(
            <div key={l} style={{ textAlign:"center",padding:"2.5rem 1rem",borderRight:"1px solid rgba(255,255,255,.04)" }}>
              <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"2.8rem",fontWeight:900,color:"#dc2626",display:"block",lineHeight:1 }}><Counter to={n} suffix={s}/></span>
              <span style={{ fontSize:".75rem",color:"#64748b",textTransform:"uppercase",letterSpacing:".1em",marginTop:6,display:"block" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding:"6rem 1.5rem",background:"#f8fafc" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ marginBottom:"3rem" }}>
            <span className="sec-tag">What we offer</span>
            <h2 className="sec-h" style={{ color:"#0f172a" }}>Everything you need to<br/>donate or receive blood</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem" }}>
            {[
              { img:Card1, tag:"Community", title:"Support Campaigns", desc:"Join donation drives and initiatives that save lives across Bangladesh." },
              { img:Card2, tag:"Education", title:"Blood Donation Facts", desc:"Learn everything about blood types, eligibility, and the donation process." },
              { img:Card3, tag:"Impact", title:"Real Success Stories", desc:"Stories from donors and recipients — the human impact of your generosity." },
            ].map(f=>(
              <div key={f.title} className="fc">
                <img src={f.img} alt={f.title} className="fi" loading="lazy"/>
                <div style={{ padding:"1.4rem" }}>
                  <div style={{ fontSize:".72rem",fontWeight:700,color:"#dc2626",textTransform:"uppercase",letterSpacing:".1em",marginBottom:6 }}>{f.tag}</div>
                  <div style={{ fontSize:"1.05rem",fontWeight:700,color:"#0f172a",marginBottom:8 }}>{f.title}</div>
                  <div style={{ fontSize:".875rem",color:"#64748b",lineHeight:1.65 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center",marginTop:"2.5rem" }}>
            <Link to="/features" className="btn-p">Explore All Features</Link>
          </div>
        </div>
      </section>

      {/* BLOOD TYPES */}
      <section style={{ padding:"5rem 1.5rem",background:"#fff" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center" }}>
          <div>
            <span className="sec-tag">Search by blood type</span>
            <h2 className="sec-h" style={{ color:"#0f172a" }}>All blood types,<br/>one platform</h2>
            <p style={{ color:"#64748b",lineHeight:1.75,marginBottom:"2rem",fontSize:"1rem" }}>We have verified donors for every blood type. Search by district, upazila, and availability — find the right match in minutes.</p>
            <Link to="/search" className="btn-p">Search Donors Now</Link>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12 }}>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bt=>(
              <Link key={bt} to={`/search?blood=${bt}`} className="bt">
                <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:700,color:"#dc2626" }}>{bt}</div>
                <div style={{ fontSize:".7rem",color:"#94a3b8",marginTop:3 }}>Available</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:"6rem 1.5rem",background:"#f8fafc" }}>
        <div style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center" }}>
          <div>
            <span className="sec-tag">How it works</span>
            <h2 className="sec-h" style={{ color:"#0f172a" }}>Save a life in<br/>3 simple steps</h2>
            <p style={{ color:"#64748b",lineHeight:1.75,marginBottom:"2.5rem" }}>Getting started as a donor takes less than 5 minutes. Once registered, you respond to emergency requests instantly.</p>
            <Link to="/register" className="btn-p">Start Today</Link>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:"1rem" }}>
            {[["01","Register","Create your free account with your blood type and location."],["02","Get Verified","Your profile is reviewed and activated within 24 hours."],["03","Respond & Save","Receive emergency alerts and respond to save a life near you."]].map(([n,t,d])=>(
              <div key={n} className="sc">
                <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"2.2rem",fontWeight:900,color:"rgba(220,38,38,.15)",lineHeight:1,minWidth:52 }}>{n}</div>
                <div><div style={{ fontSize:"1.05rem",fontWeight:700,color:"#0f172a",marginBottom:6 }}>{t}</div><div style={{ fontSize:".875rem",color:"#64748b",lineHeight:1.65 }}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DONATE */}
      <section style={{ padding:"6rem 1.5rem",background:"#fff" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:"3rem" }}>
            <span className="sec-tag">The impact</span>
            <h2 className="sec-h" style={{ color:"#0f172a" }}>Why donate blood?</h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:"1.5rem" }}>
            {[["🩸","Save 3 Lives","One donation can be split into components to help up to 3 patients."],["💪","Stay Healthy","Regular donation reduces iron levels and can lower heart disease risk."],["🏘️","Community First","Your donation stays local, helping patients in your district."],["⚡","Emergency Ready","Patients receive blood within minutes when donors are pre-registered."]].map(([ic,t,d])=>(
              <div key={t} className="wc">
                <div style={{ width:50,height:50,background:"rgba(220,38,38,.07)",borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",marginBottom:"1.1rem" }}>{ic}</div>
                <div style={{ fontSize:"1rem",fontWeight:700,color:"#0f172a",marginBottom:8 }}>{t}</div>
                <div style={{ fontSize:".875rem",color:"#64748b",lineHeight:1.65 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ padding:"6rem 1.5rem",background:"#080c14" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"center" }}>
          <div>
            <span className="sec-tag">Contact us</span>
            <h2 className="sec-h" style={{ color:"#fff" }}>Let's make a<br/>difference together</h2>
            <p style={{ color:"#64748b",lineHeight:1.75,marginBottom:"2rem" }}>Have questions? Our team responds within 2 hours.</p>
            <div style={{ display:"flex",flexDirection:"column",gap:"1rem" }}>
              {[["📧","Email","info@bloodunity.com"],["📞","Hotline","(+880) 123 456 586"],["📍","Office","Dhaka, Bangladesh"]].map(([ic,l,v])=>(
                <div key={l} style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <span style={{ fontSize:"1.2rem" }}>{ic}</span>
                  <div>
                    <div style={{ fontSize:".7rem",color:"#475569",textTransform:"uppercase",letterSpacing:".08em" }}>{l}</div>
                    <div style={{ color:"#e2e8f0",fontWeight:500 }}>{v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form ref={formRef} onSubmit={handleContact} style={{ display:"flex",flexDirection:"column",gap:12 }}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              <input className="ci" type="text" name="firstName" placeholder="First name" required/>
              <input className="ci" type="text" name="lastName" placeholder="Last name"/>
            </div>
            <input className="ci" type="email" name="email" placeholder="Email address" required/>
            <input className="ci" type="tel" name="phone" placeholder="Phone number"/>
            <textarea className="ci" name="message" placeholder="Your message..." required/>
            <button type="submit" className="btn-p" style={{ border:"none",width:"100%",cursor:"pointer" }}>Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
