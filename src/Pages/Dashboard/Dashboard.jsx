import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const sc = { pending:"#fef3c7,#92400e,#f59e0b", inprogress:"#dbeafe,#1e40af,#3b82f6", done:"#dcfce7,#166534,#22c55e", canceled:"#fee2e2,#991b1b,#ef4444" };

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["donor-recent"],
    queryFn: () => axiosInstance.get("/my-requests?size=3&page=1").then(r => r.data),
  });
  const requests = data?.requests || [];

  const statusMut = useMutation({
    mutationFn: ({ id, status }) => axiosInstance.patch(`/requests/status/${id}`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["donor-recent"] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/requests/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["donor-recent"] });
      Swal.fire({ title:"Deleted!", icon:"success", timer:1500, showConfirmButton:false });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({ title:"Delete this request?", icon:"warning", showCancelButton:true, confirmButtonColor:"#d33", confirmButtonText:"Yes, delete!" })
      .then(r => { if (r.isConfirmed) deleteMut.mutate(id); });
  };

  if (isLoading) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh" }}><div style={{ width:36,height:36,border:"3px solid #f3f3f3",borderTop:"3px solid #dc2626",borderRadius:"50%",animation:"spin .8s linear infinite" }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"2rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');.dt{width:100%;border-collapse:collapse}.dt th{text-align:left;font-size:.7rem;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:.08em;padding:.85rem 1.1rem;background:#dc2626}.dt td{padding:.9rem 1.1rem;font-size:.875rem;color:#374151;border-bottom:1px solid #f8fafc}.dt tr:hover td{background:#fafafa}.ab{padding:.38rem .85rem;border-radius:8px;border:none;font-size:.75rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}.ab:hover{transform:translateY(-1px)}`}</style>

      <div style={{ marginBottom:"2rem" }}>
        <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:4 }}>Donor Dashboard</p>
        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,color:"#0f172a",letterSpacing:"-.02em",margin:0 }}>
          Welcome, {user?.displayName?.split(" ")[0]||"Donor"} 👋
        </h1>
        <p style={{ color:"#64748b",marginTop:6,fontSize:".9rem" }}>Here are your 3 most recent donation requests.</p>
      </div>

      {requests.length > 0 ? (
        <div style={{ background:"#fff",borderRadius:20,border:"1px solid rgba(0,0,0,.06)",overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table className="dt">
              <thead><tr><th>Recipient</th><th>Location</th><th>Date</th><th>Blood</th><th>Status</th><th>Donor</th><th>Actions</th></tr></thead>
              <tbody>
                {requests.map(req => {
                  const [bg,col,dot] = (sc[req.status]||sc.pending).split(",");
                  return (
                    <tr key={req._id}>
                      <td style={{ fontWeight:500,color:"#0f172a" }}>{req.recipientName}</td>
                      <td style={{ color:"#64748b" }}>{req.district}, {req.upazila}</td>
                      <td style={{ color:"#94a3b8",fontSize:".78rem" }}>{req.donationDate}</td>
                      <td><span style={{ background:"rgba(220,38,38,.08)",color:"#dc2626",padding:"2px 10px",borderRadius:6,fontWeight:700,fontSize:".82rem" }}>{req.bloodGroup}</span></td>
                      <td><span style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:50,fontSize:".7rem",fontWeight:600,textTransform:"capitalize",background:bg,color:col }}><span style={{ width:5,height:5,borderRadius:"50%",background:dot }}/>{req.status}</span></td>
                      <td style={{ fontSize:".78rem",color:"#64748b" }}>{req.status==="inprogress"?`${req.donorName}`:"—"}</td>
                      <td>
                        <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                          {req.status==="inprogress" && <>
                            <button className="ab" style={{ background:"#dcfce7",color:"#166534" }} onClick={()=>statusMut.mutate({id:req._id,status:"done"})}>Done</button>
                            <button className="ab" style={{ background:"#fee2e2",color:"#991b1b" }} onClick={()=>statusMut.mutate({id:req._id,status:"canceled"})}>Cancel</button>
                          </>}
                          <button className="ab" style={{ background:"#fef3c7",color:"#92400e" }} onClick={()=>handleDelete(req._id)}>Delete</button>
                          <button className="ab" style={{ background:"#dbeafe",color:"#1e40af" }} onClick={()=>navigate(`/requests/${req._id}`)}>View</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding:"1rem 1.25rem",borderTop:"1px solid #f1f5f9",display:"flex",gap:10 }}>
            <button onClick={()=>navigate("/dashboard/my-request")} style={{ padding:".45rem 1.1rem",borderRadius:9,border:"1px solid rgba(220,38,38,.3)",background:"transparent",color:"#dc2626",fontSize:".82rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>View All Requests</button>
            <button onClick={()=>navigate("/dashboard/add-request")} style={{ padding:".45rem 1.1rem",borderRadius:9,border:"none",background:"#dc2626",color:"#fff",fontSize:".82rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>+ New Request</button>
          </div>
        </div>
      ) : (
        <div style={{ background:"#fff",borderRadius:20,border:"1px solid rgba(0,0,0,.06)",padding:"4rem",textAlign:"center" }}>
          <div style={{ fontSize:"3rem",marginBottom:"1rem" }}>🩸</div>
          <p style={{ color:"#64748b",marginBottom:"1.25rem",fontSize:"1rem" }}>No donation requests yet.</p>
          <button onClick={()=>navigate("/dashboard/add-request")} style={{ padding:".7rem 1.75rem",borderRadius:50,border:"none",background:"#dc2626",color:"#fff",fontSize:".9rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 6px 20px rgba(220,38,38,.3)" }}>Create Your First Request</button>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
