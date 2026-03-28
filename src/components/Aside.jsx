import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const I = {
  home:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  add:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  list:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1" fill="currentColor"/><circle cx="3" cy="12" r="1" fill="currentColor"/><circle cx="3" cy="18" r="1" fill="currentColor"/></svg>,
  users:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  heart:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  person:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  back:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  out:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  x:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

const roleMenus = {
  donor: [
    { to:"/dashboard/donor", label:"Dashboard", icon:I.home, end:true },
    { to:"/dashboard/add-request", label:"New Request", icon:I.add },
    { to:"/dashboard/my-request", label:"My Requests", icon:I.list },
  ],
  admin: [
    { to:"/dashboard/admin", label:"Dashboard", icon:I.home, end:true },
    { to:"/dashboard/all-users", label:"All Users", icon:I.users },
    { to:"/dashboard/all-requests", label:"All Requests", icon:I.list },
  ],
  volunteer: [
    { to:"/dashboard/volunteer", label:"Dashboard", icon:I.home, end:true },
    { to:"/dashboard/all-blood-donation-request", label:"All Donations", icon:I.heart },
  ],
};

const roleBadge = { admin:"#dc2626", donor:"#2563eb", volunteer:"#16a34a" };

const Sidebar = () => {
  const { role, user } = useContext(AuthContext);
  const [mob, setMob] = useState(false);

  const lk = ({ isActive }) => ({
    display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10,
    textDecoration:"none", fontSize:"0.875rem", fontWeight: isActive ? 600 : 400,
    color: isActive ? "#fff" : "rgba(255,255,255,.5)",
    background: isActive ? "rgba(220,38,38,.18)" : "transparent",
    borderLeft: isActive ? "2px solid #dc2626" : "2px solid transparent",
    transition:"all .2s",
  });

  const Nav = () => (
    <div style={{ display:"flex",flexDirection:"column",height:"100%",fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ padding:"1.25rem 1.25rem 1rem",borderBottom:"1px solid rgba(255,255,255,.06)" }}>
        <Link to="/" style={{ display:"flex",alignItems:"center",gap:8,textDecoration:"none" }}>
          <svg width="22" height="28" viewBox="0 0 28 34" fill="none"><path d="M14 0C14 0 0 16 0 22C0 29.7 6.3 34 14 34C21.7 34 28 29.7 28 22C28 16 14 0 14 0Z" fill="#dc2626"/><path d="M10 24C10 21 12 18 14 16C16 18 18 21 18 24C18 26.2 16.2 28 14 28C11.8 28 10 26.2 10 24Z" fill="rgba(255,255,255,.3)"/></svg>
          <span style={{ fontSize:"1.05rem",fontWeight:800,color:"#fff" }}>BloodUnity</span>
        </Link>
      </div>

      {user && (
        <div style={{ padding:"1rem 1.25rem",borderBottom:"1px solid rgba(255,255,255,.06)",display:"flex",alignItems:"center",gap:10 }}>
          <img src={user.photoURL||`https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName||"U")}&background=7f1d1d&color=fff`} alt="" style={{ width:36,height:36,borderRadius:"50%",objectFit:"cover",border:"2px solid rgba(220,38,38,.5)",flexShrink:0 }}/>
          <div style={{ overflow:"hidden",flex:1 }}>
            <div style={{ fontSize:".82rem",fontWeight:600,color:"#f1f5f9",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{user.displayName||"User"}</div>
            <span style={{ fontSize:".68rem",background:roleBadge[role]||"#475569",color:"#fff",padding:"1px 8px",borderRadius:50,fontWeight:600,textTransform:"capitalize" }}>{role}</span>
          </div>
        </div>
      )}

      <nav style={{ flex:1,padding:"1rem .75rem",display:"flex",flexDirection:"column",gap:2,overflowY:"auto" }}>
        {(roleMenus[role]||[]).map(item => (
          <NavLink key={item.to} to={item.to} end={item.end} style={lk} onClick={()=>setMob(false)}>
            {item.icon}{item.label}
          </NavLink>
        ))}
        <div style={{ borderTop:"1px solid rgba(255,255,255,.06)",margin:"6px 0" }}/>
        <NavLink to="/dashboard/profile" style={lk} onClick={()=>setMob(false)}>{I.person} Profile</NavLink>
        <Link to="/" style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,textDecoration:"none",fontSize:".875rem",color:"rgba(255,255,255,.4)",transition:"all .2s" }} onClick={()=>setMob(false)}>{I.back} Back to Site</Link>
      </nav>

      <div style={{ padding:".75rem",borderTop:"1px solid rgba(255,255,255,.06)" }}>
        <button onClick={()=>signOut(auth)} style={{ width:"100%",display:"flex",alignItems:"center",gap:10,padding:"9px 12px",borderRadius:10,background:"transparent",border:"none",color:"rgba(255,100,100,.7)",fontSize:".875rem",cursor:"pointer",fontFamily:"inherit",transition:"all .2s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(220,38,38,.1)";e.currentTarget.style.color="#f87171"}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,100,100,.7)"}}>
          {I.out} Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex" style={{ width:240,minHeight:"100vh",background:"#0d1117",flexShrink:0,borderRight:"1px solid rgba(255,255,255,.06)",flexDirection:"column" }}>
        <Nav/>
      </aside>

      <button className="lg:hidden" onClick={()=>setMob(o=>!o)} style={{ position:"fixed",top:12,left:12,zIndex:60,width:42,height:42,borderRadius:10,background:"#0d1117",border:"1px solid rgba(255,255,255,.1)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
        {mob?I.x:I.menu}
      </button>

      {mob && <div className="lg:hidden" onClick={()=>setMob(false)} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.6)",zIndex:40,backdropFilter:"blur(4px)" }}/>}

      <aside className="lg:hidden" style={{ position:"fixed",top:0,left:0,bottom:0,width:250,background:"#0d1117",zIndex:50,transform:mob?"translateX(0)":"translateX(-100%)",transition:"transform .3s cubic-bezier(.4,0,.2,1)",borderRight:"1px solid rgba(255,255,255,.06)",display:"flex",flexDirection:"column" }}>
        <Nav/>
      </aside>
    </>
  );
};

export default Sidebar;
