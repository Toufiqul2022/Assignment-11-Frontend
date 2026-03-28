import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const sc = { pending:"#fef3c7,#92400e,#f59e0b", inprogress:"#dbeafe,#1e40af,#3b82f6", done:"#dcfce7,#166534,#22c55e", canceled:"#fee2e2,#991b1b,#ef4444" };

const AllRequest = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const size = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-requests", page],
    queryFn: () => axiosSecure.get(`/admin/requests?page=${page}&size=${size}`).then(r => r.data),
    keepPreviousData: true,
  });

  const requests = data?.requests || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / size);

  const statusMut = useMutation({
    mutationFn: ({ id, status }) => axiosSecure.patch(`/admin/requests/status/${id}`, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-requests"] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/admin/requests/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-requests"] });
      Swal.fire({ title:"Deleted!", icon:"success", timer:1500, showConfirmButton:false });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({ title:"Delete this request?", icon:"warning", showCancelButton:true, confirmButtonColor:"#d33", confirmButtonText:"Yes, delete!" })
      .then(r => { if (r.isConfirmed) deleteMut.mutate(id); });
  };

  if (isLoading) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh" }}><div style={{ width:36,height:36,border:"3px solid #f3f3f3",borderTop:"3px solid #dc2626",borderRadius:"50%",animation:"spin .8s linear infinite" }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
  if (isError) return <div style={{ padding:"2rem",color:"#dc2626",textAlign:"center" }}>Failed to load. Please try again.</div>;

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"2rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');.dt{width:100%;border-collapse:collapse}.dt th{text-align:left;font-size:.7rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;padding:.75rem 1rem;border-bottom:1px solid #f1f5f9}.dt td{padding:.9rem 1rem;font-size:.875rem;color:#374151;border-bottom:1px solid #f8fafc}.dt tr:hover td{background:#fafafa}.ab{padding:.38rem .8rem;border-radius:7px;border:none;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}.ab:hover{transform:translateY(-1px)}`}</style>

      <div style={{ marginBottom:"1.75rem" }}>
        <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:4 }}>Admin</p>
        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.9rem",fontWeight:700,color:"#0f172a",margin:0 }}>All Blood Donation Requests</h1>
        <p style={{ color:"#64748b",marginTop:6,fontSize:".875rem" }}>{total} total requests</p>
      </div>

      <div style={{ background:"#fff",borderRadius:20,border:"1px solid rgba(0,0,0,.06)",overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table className="dt">
            <thead><tr><th>#</th><th>Patient</th><th>Blood</th><th>Location</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {requests.length === 0
                ? <tr><td colSpan={7} style={{ textAlign:"center",padding:"3rem",color:"#94a3b8",fontStyle:"italic" }}>No requests found</td></tr>
                : requests.map((req, i) => {
                    const [bg,col,dot] = (sc[req.status]||sc.pending).split(",");
                    return (
                      <tr key={req._id}>
                        <td style={{ color:"#94a3b8",fontSize:".78rem" }}>{(page-1)*size+i+1}</td>
                        <td style={{ fontWeight:500,color:"#0f172a" }}>{req.recipientName||req.patientName}</td>
                        <td><span style={{ background:"rgba(220,38,38,.08)",color:"#dc2626",padding:"2px 10px",borderRadius:6,fontWeight:700,fontSize:".82rem" }}>{req.bloodGroup}</span></td>
                        <td style={{ color:"#64748b" }}>{req.district}, {req.upazila}</td>
                        <td style={{ color:"#94a3b8",fontSize:".78rem" }}>{new Date(req.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</td>
                        <td><span style={{ display:"inline-flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:50,fontSize:".7rem",fontWeight:600,textTransform:"capitalize",background:bg,color:col }}><span style={{ width:5,height:5,borderRadius:"50%",background:dot }}/>{req.status}</span></td>
                        <td>
                          <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                            {req.status==="inprogress" && <>
                              <button className="ab" style={{ background:"#dcfce7",color:"#166534" }} onClick={()=>statusMut.mutate({id:req._id,status:"done"})}>Done</button>
                              <button className="ab" style={{ background:"#fef3c7",color:"#92400e" }} onClick={()=>statusMut.mutate({id:req._id,status:"canceled"})}>Cancel</button>
                            </>}
                            <button className="ab" style={{ background:"#fee2e2",color:"#991b1b" }} onClick={()=>handleDelete(req._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div style={{ display:"flex",justifyContent:"center",gap:8,marginTop:"1.5rem",alignItems:"center" }}>
          <button onClick={()=>setPage(p=>Math.max(p-1,1))} disabled={page===1} style={{ padding:".4rem .9rem",borderRadius:8,border:"1px solid #e5e7eb",background:"#fff",cursor:"pointer",fontSize:".82rem",fontFamily:"inherit",opacity:page===1?.5:1 }}>Prev</button>
          {[...Array(totalPages).keys()].map(n=>(
            <button key={n} onClick={()=>setPage(n+1)} style={{ padding:".4rem .75rem",borderRadius:8,border:"1px solid",borderColor:page===n+1?"#dc2626":"#e5e7eb",background:page===n+1?"#dc2626":"#fff",color:page===n+1?"#fff":"#374151",cursor:"pointer",fontSize:".82rem",fontWeight:600,fontFamily:"inherit" }}>{n+1}</button>
          ))}
          <button onClick={()=>setPage(p=>Math.min(p+1,totalPages))} disabled={page===totalPages} style={{ padding:".4rem .9rem",borderRadius:8,border:"1px solid #e5e7eb",background:"#fff",cursor:"pointer",fontSize:".82rem",fontFamily:"inherit",opacity:page===totalPages?.5:1 }}>Next</button>
        </div>
      )}
    </div>
  );
};

export default AllRequest;
