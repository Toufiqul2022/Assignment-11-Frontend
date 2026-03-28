import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["all-users"],
    queryFn: () => axiosSecure.get("/users").then(r => r.data),
  });

  const statusMut = useMutation({
    mutationFn: ({ email, newStatus }) => axiosSecure.patch(`/update/user/status?email=${email}&status=${newStatus}`),
    onSuccess: (_, { newStatus }) => {
      qc.invalidateQueries({ queryKey: ["all-users"] });
      Swal.fire({ title:"Updated!", text:`Status set to ${newStatus}.`, icon:"success", timer:1500, showConfirmButton:false });
    },
  });

  const roleMut = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/users/make-volunteer/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-users"] });
      Swal.fire({ title:"Promoted!", text:"User is now a Volunteer.", icon:"success", timer:1500, showConfirmButton:false });
    },
  });

  const handleStatus = (email, current) => {
    const next = current === "active" ? "blocked" : "active";
    Swal.fire({ title:"Are you sure?", text:`This will ${next} the user.`, icon:"warning", showCancelButton:true, confirmButtonColor:"#3085d6", cancelButtonColor:"#d33", confirmButtonText:`Yes, ${next}!` })
      .then(r => { if (r.isConfirmed) statusMut.mutate({ email, newStatus: next }); });
  };

  const handleVolunteer = (u) => {
    Swal.fire({ title:"Promote to Volunteer?", text:`${u.name} will become a volunteer.`, icon:"info", showCancelButton:true, confirmButtonColor:"#3085d6", cancelButtonColor:"#d33", confirmButtonText:"Yes, Promote!" })
      .then(r => { if (r.isConfirmed) roleMut.mutate(u._id); });
  };

  if (isLoading) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh" }}><div style={{ width:36,height:36,border:"3px solid #f3f3f3",borderTop:"3px solid #dc2626",borderRadius:"50%",animation:"spin .8s linear infinite" }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
  if (isError) return <div style={{ padding:"2rem",color:"#dc2626",textAlign:"center" }}>Failed to load users.</div>;

  const roleBg = { admin:"rgba(220,38,38,.12)", donor:"rgba(37,99,235,.1)", volunteer:"rgba(22,163,74,.1)" };
  const roleCol = { admin:"#dc2626", donor:"#1d4ed8", volunteer:"#15803d" };

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"2rem",fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');.dt{width:100%;border-collapse:collapse}.dt th{text-align:left;font-size:.7rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em;padding:.75rem 1rem;border-bottom:1px solid #f1f5f9}.dt td{padding:.9rem 1rem;font-size:.875rem;color:#374151;border-bottom:1px solid #f8fafc}.dt tr:hover td{background:#fafafa}.ab{padding:.38rem .85rem;border-radius:8px;border:none;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}.ab:hover{transform:translateY(-1px)}`}</style>

      <div style={{ marginBottom:"1.75rem",display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1rem" }}>
        <div>
          <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:4 }}>Admin</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.9rem",fontWeight:700,color:"#0f172a",margin:0 }}>All Users</h1>
        </div>
        <span style={{ background:"rgba(220,38,38,.08)",color:"#dc2626",border:"1px solid rgba(220,38,38,.2)",padding:".35rem .9rem",borderRadius:50,fontSize:".82rem",fontWeight:700 }}>{users.length} registered</span>
      </div>

      <div style={{ background:"#fff",borderRadius:20,border:"1px solid rgba(0,0,0,.06)",overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table className="dt">
            <thead><tr><th>#</th><th>User</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {users.length === 0
                ? <tr><td colSpan={5} style={{ textAlign:"center",padding:"3rem",color:"#94a3b8",fontStyle:"italic" }}>No users found</td></tr>
                : users.map((u, i) => (
                    <tr key={u._id}>
                      <td style={{ color:"#94a3b8",fontSize:".78rem" }}>{i+1}</td>
                      <td>
                        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                          <img src={u.photoURL||`https://ui-avatars.com/api/?name=${encodeURIComponent(u.name||"U")}&background=7f1d1d&color=fff`} alt="" style={{ width:38,height:38,borderRadius:"50%",objectFit:"cover",border:"2px solid #f1f5f9",flexShrink:0 }}/>
                          <div>
                            <div style={{ fontWeight:600,color:"#0f172a",fontSize:".875rem" }}>{u.name||u.displayName}</div>
                            <div style={{ fontSize:".75rem",color:"#94a3b8" }}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ background:roleBg[u.role]||roleBg.donor,color:roleCol[u.role]||roleCol.donor,padding:"3px 10px",borderRadius:50,fontSize:".72rem",fontWeight:700,textTransform:"capitalize" }}>{u.role||"donor"}</span>
                      </td>
                      <td>
                        <span style={{ background:u.status==="blocked"?"#fee2e2":"#dcfce7",color:u.status==="blocked"?"#991b1b":"#166534",padding:"3px 10px",borderRadius:50,fontSize:".72rem",fontWeight:700,textTransform:"capitalize" }}>{u.status||"active"}</span>
                      </td>
                      <td>
                        <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                          <button className="ab" style={{ background:u.status==="active"?"#fee2e2":"#dcfce7",color:u.status==="active"?"#991b1b":"#166534" }} onClick={()=>handleStatus(u.email,u.status)}>
                            {u.status==="active"?"Block":"Unblock"}
                          </button>
                          {u.role==="donor" && (
                            <button className="ab" style={{ background:"#dbeafe",color:"#1e40af" }} onClick={()=>handleVolunteer(u)}>Make Volunteer</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
