import React, { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const qc = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axiosSecure.get("/profile").then(r => r.data),
    onSuccess: d => { if (!form) setForm(d); },
  });

  const mut = useMutation({
    mutationFn: (data) => axiosSecure.patch("/profile", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      setIsEdit(false);
      toast.success("Profile updated!");
    },
    onError: () => toast.error("Failed to save. Try again."),
  });

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleEdit = () => { setForm(profile); setIsEdit(true); };
  const handleCancel = () => { setForm(profile); setIsEdit(false); };

  if (isLoading) return <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh" }}><div style={{ width:36,height:36,border:"3px solid #f3f3f3",borderTop:"3px solid #dc2626",borderRadius:"50%",animation:"spin .8s linear infinite" }}/><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  const d = isEdit ? form : profile;

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"2rem",fontFamily:"'DM Sans',sans-serif" }}>
      <ToastContainer position="top-right" autoClose={3000}/>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');.pi{width:100%;padding:.8rem 1rem;border:1.5px solid #e5e7eb;border-radius:12px;font-size:.9rem;font-family:inherit;color:#111827;background:#fff;outline:none;transition:all .2s;box-sizing:border-box}.pi:focus{border-color:#dc2626;box-shadow:0 0 0 3px rgba(220,38,38,.1)}.pi:disabled{background:#f8fafc;color:#64748b}`}</style>

      <div style={{ maxWidth:680,margin:"0 auto" }}>
        {/* Header card */}
        <div style={{ background:"linear-gradient(135deg,#dc2626,#991b1b)",borderRadius:20,padding:"2rem",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem",marginBottom:"1.5rem" }}>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <img src={d?.avatar||user?.photoURL||`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName||"U")}&background=7f1d1d&color=fff`} alt="" style={{ width:64,height:64,borderRadius:"50%",border:"3px solid rgba(255,255,255,.4)",objectFit:"cover" }}/>
            <div style={{ color:"#fff" }}>
              <div style={{ fontSize:"1.15rem",fontWeight:700 }}>{d?.name||"My Profile"}</div>
              <div style={{ fontSize:".82rem",opacity:.75 }}>{user?.email}</div>
            </div>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            {!isEdit ? (
              <button onClick={handleEdit} style={{ background:"rgba(255,255,255,.18)",color:"#fff",border:"1px solid rgba(255,255,255,.3)",padding:".45rem 1.1rem",borderRadius:9,fontSize:".82rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>✏️ Edit</button>
            ) : (
              <>
                <button onClick={()=>mut.mutate(form)} disabled={mut.isPending} style={{ background:"#fff",color:"#dc2626",border:"none",padding:".45rem 1.1rem",borderRadius:9,fontSize:".82rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit" }}>
                  {mut.isPending?"Saving...":"💾 Save"}
                </button>
                <button onClick={handleCancel} style={{ background:"transparent",color:"rgba(255,255,255,.8)",border:"1px solid rgba(255,255,255,.3)",padding:".45rem 1.1rem",borderRadius:9,fontSize:".82rem",fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>Cancel</button>
              </>
            )}
          </div>
        </div>

        {/* Info sections */}
        {[
          { title:"Personal Information", fields:[
            { label:"Full Name", name:"name", type:"text", placeholder:"Your name" },
            { label:"Email", name:"email", type:"email", value:user?.email, disabled:true },
          ]},
          { title:"Location", fields:[
            { label:"District", name:"district", type:"text", placeholder:"Your district" },
            { label:"Upazila", name:"upazila", type:"text", placeholder:"Your upazila" },
          ]},
        ].map(sec => (
          <div key={sec.title} style={{ background:"#fff",borderRadius:16,border:"1px solid rgba(0,0,0,.06)",padding:"1.5rem",marginBottom:"1rem" }}>
            <h3 style={{ fontSize:".95rem",fontWeight:700,color:"#0f172a",marginBottom:"1.1rem",paddingBottom:".75rem",borderBottom:"1px solid #f1f5f9" }}>{sec.title}</h3>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              {sec.fields.map(f => (
                <div key={f.name}>
                  <label style={{ display:"block",fontSize:".72rem",fontWeight:600,color:"#374151",marginBottom:5,letterSpacing:".04em",textTransform:"uppercase" }}>{f.label}</label>
                  <input className="pi" type={f.type} name={f.name} value={f.value!==undefined?f.value:(d?.[f.name]||"")} onChange={handleChange} disabled={!isEdit||f.disabled} placeholder={f.placeholder}/>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Blood group */}
        <div style={{ background:"#fff",borderRadius:16,border:"1px solid rgba(0,0,0,.06)",padding:"1.5rem",marginBottom:"1rem" }}>
          <h3 style={{ fontSize:".95rem",fontWeight:700,color:"#0f172a",marginBottom:"1.1rem",paddingBottom:".75rem",borderBottom:"1px solid #f1f5f9" }}>Blood Group</h3>
          <select name="blood" value={d?.blood||""} onChange={handleChange} disabled={!isEdit} className="pi" style={{ maxWidth:200 }}>
            <option value="">Select Blood Group</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g=><option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Avatar URL */}
        <div style={{ background:"#fff",borderRadius:16,border:"1px solid rgba(0,0,0,.06)",padding:"1.5rem" }}>
          <h3 style={{ fontSize:".95rem",fontWeight:700,color:"#0f172a",marginBottom:"1.1rem",paddingBottom:".75rem",borderBottom:"1px solid #f1f5f9" }}>Profile Picture</h3>
          <input className="pi" name="avatar" type="url" value={d?.avatar||""} onChange={handleChange} disabled={!isEdit} placeholder="Paste image URL here"/>
          {d?.avatar && <img src={d.avatar} alt="" style={{ width:80,height:80,borderRadius:"50%",objectFit:"cover",marginTop:"1rem",border:"2px solid #e5e7eb" }}/>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
