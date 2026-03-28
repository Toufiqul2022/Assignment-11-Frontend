import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const sc = { pending:"#fef3c7,#92400e,#f59e0b", inprogress:"#dbeafe,#1e40af,#3b82f6", done:"#dcfce7,#166534,#22c55e", canceled:"#fee2e2,#991b1b,#ef4444" };

const VolunteerAllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [filter, setFilter] = useState("all");

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["volunteer-requests", filter],
    queryFn: () => axiosSecure.get("/volunteer/requests", { params: filter!=="all"?{status:filter}:undefined }).then(r => r.data),
  });

  const statusMut = useMutation({
    mutationFn: ({ id, status }) => axiosSecure.patch(`/volunteer/requests/status/${id}`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["volunteer-requests"] }),
  });

  if (isLoading) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh" }}><div style={{ width:36,height:36,border:"3px solid #f3f3f3",borderTop:"3px solid #dc2626",borderRadius:"50%",animation:"spin .8s linear infinite" }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"2rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');.dt{width:100%;border-collapse:collapse}.dt th{text-align:left;font-size:.7rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;padding:.75rem 1rem;border-bottom:1px solid #f1f5f9}.dt td{padding:.9rem 1rem;font-size:.875rem;color:#374151;border-bottom:1px solid #f8fafc}.dt tr:hover td{background:#fafafa}.ab{padding:.38rem .85rem;border-radius:8px;border:none;font-size:.75rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}.ab:hover{transform:translateY(-1px)}`}</style>

      <div style={{ marginBottom:"1.75rem",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1rem" }}>
        <div>
          <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:4 }}>Volunteer</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.9rem",fontWeight:700,color:"#0f172a",margin:0 }}>All Donation Requests</h1>
        </div>
        <div style={{ display:"flex",gap:8,alignItems:"center",flexWrap:"wrap" }}>
          <span style={{ fontSize:".78rem",color:"#64748b" }}>{requests.length} results</span>
          <select value={filter} onChange={e=>setFilter(e.target.value)} style={{ padding:".4rem .85rem",borderRadius:9,border:"1px solid #e5e7eb",background:"#fff",fontSize:".82rem",fontFamily:"inherit",outline:"none",cursor:"pointer" }}>
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div style={{ background:"#fff",borderRadius:20,border:"1px solid rgba(0,0,0,.06)",overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table className="dt">
            <thead><tr><th>Requester</th><th>Blood</th><th>District</th><th>Upazila</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {requests.length === 0
                ? <tr><td colSpan={7} style={{ textAlign:"center",padding:"3rem",color:"#94a3b8",fontStyle:"italic" }}>No requests found</td></tr>
                : requests.map(req => {
                    const [bg,col,dot] = (sc[req.status]||sc.pending).split(",");
                    return (
                      <tr key={req._id}>
                        <td style={{ fontWeight:500,color:"#0f172a" }}>{req.requesterName}</td>
                        <td><span style={{ background:"rgba(220,38,38,.08)",color:"#dc2626",padding:"2px 10px",borderRadius:6,fontWeight:700,fontSize:".82rem" }}>{req.bloodGroup}</span></td>
                        <td style={{ color:"#64748b" }}>{req.district}</td>
                        <td style={{ color:"#64748b" }}>{req.upazila}</td>
                        <td style={{ color:"#94a3b8",fontSize:".78rem" }}>{new Date(req.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</td>
                        <td><span style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:50,fontSize:".7rem",fontWeight:600,textTransform:"capitalize",background:bg,color:col }}><span style={{ width:5,height:5,borderRadius:"50%",background:dot }}/>{req.status}</span></td>
                        <td>
                          {req.status==="inprogress" && (
                            <div style={{ display:"flex",gap:6 }}>
                              <button className="ab" style={{ background:"#dcfce7",color:"#166534" }} onClick={()=>statusMut.mutate({id:req._id,status:"done"})}>Done</button>
                              <button className="ab" style={{ background:"#fee2e2",color:"#991b1b" }} onClick={()=>statusMut.mutate({id:req._id,status:"canceled"})}>Cancel</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VolunteerAllRequests;
