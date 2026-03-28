import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const S = () => (
  <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh" }}>
    <div style={{ width:36,height:36,border:"3px solid #f3f3f3",borderTop:"3px solid #dc2626",borderRadius:"50%",animation:"spin .8s linear infinite" }}/>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const VolunteerDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["volunteer-dashboard"],
    queryFn: () => axiosInstance.get("/volunteer/requests").then(r => r.data),
  });

  if (isLoading) return <S/>;

  const pending = requests.filter(r => r.status === "pending").length;
  const inprog  = requests.filter(r => r.status === "inprogress").length;
  const done    = requests.filter(r => r.status === "done").length;

  const sc = { pending:"#fef3c7,#92400e,#f59e0b", inprogress:"#dbeafe,#1e40af,#3b82f6", done:"#dcfce7,#166534,#22c55e", canceled:"#fee2e2,#991b1b,#ef4444" };

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"2rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700&display=swap');.vc{background:#fff;border-radius:20px;padding:1.75rem;border:1px solid rgba(0,0,0,.06);transition:all .3s}.vc:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,.08)}.dt{width:100%;border-collapse:collapse}.dt th{text-align:left;font-size:.7rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;padding:.75rem 1rem;border-bottom:1px solid #f1f5f9}.dt td{padding:.9rem 1rem;font-size:.875rem;color:#374151;border-bottom:1px solid #f8fafc}.dt tr:hover td{background:#fafafa}`}</style>

      <div style={{ marginBottom:"2rem" }}>
        <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:4 }}>Volunteer Panel</p>
        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,color:"#0f172a",letterSpacing:"-.02em",margin:0 }}>
          Welcome, {user?.displayName?.split(" ")[0]||"Volunteer"} 👋
        </h1>
        <p style={{ color:"#64748b",marginTop:6,fontSize:".9rem" }}>Thank you for your service. Here's the current overview.</p>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1.25rem",marginBottom:"2rem" }}>
        {[["⏳","Pending",pending,"#3b82f6"],["🔄","In Progress",inprog,"#f59e0b"],["✅","Completed",done,"#22c55e"]].map(([ic,l,v,c])=>(
          <div key={l} className="vc">
            <div style={{ fontSize:"1.5rem",marginBottom:".75rem" }}>{ic}</div>
            <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,color:"#0f172a",lineHeight:1 }}>{v}</div>
            <div style={{ fontSize:".78rem",color:"#64748b",marginTop:6,fontWeight:500 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff",borderRadius:20,border:"1px solid rgba(0,0,0,.06)",overflow:"hidden" }}>
        <div style={{ padding:"1.5rem",borderBottom:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div>
            <h2 style={{ fontSize:"1rem",fontWeight:700,color:"#0f172a",margin:0 }}>Recent Requests</h2>
            <p style={{ fontSize:".78rem",color:"#94a3b8",margin:"2px 0 0" }}>{requests.length} total</p>
          </div>
          <Link to="/dashboard/all-blood-donation-request" style={{ background:"rgba(220,38,38,.06)",color:"#dc2626",border:"1px solid rgba(220,38,38,.2)",padding:".4rem 1rem",borderRadius:8,fontSize:".8rem",fontWeight:600,textDecoration:"none" }}>View All</Link>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table className="dt">
            <thead><tr><th>Requester</th><th>Blood</th><th>District</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {requests.slice(0,6).map(req => {
                const [bg,col,dot] = (sc[req.status]||sc.pending).split(",");
                return (
                  <tr key={req._id}>
                    <td style={{ fontWeight:500,color:"#0f172a" }}>{req.requesterName}</td>
                    <td><span style={{ background:"rgba(220,38,38,.08)",color:"#dc2626",padding:"2px 10px",borderRadius:6,fontWeight:700,fontSize:".82rem" }}>{req.bloodGroup}</span></td>
                    <td style={{ color:"#64748b" }}>{req.district}</td>
                    <td><span style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:50,fontSize:".7rem",fontWeight:600,textTransform:"capitalize",background:bg,color:col }}><span style={{ width:5,height:5,borderRadius:"50%",background:dot }}/>{req.status}</span></td>
                    <td style={{ color:"#94a3b8",fontSize:".78rem" }}>{new Date(req.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</td>
                  </tr>
                );
              })}
              {requests.length===0 && <tr><td colSpan={5} style={{ textAlign:"center",padding:"3rem",color:"#94a3b8",fontStyle:"italic" }}>No requests found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
