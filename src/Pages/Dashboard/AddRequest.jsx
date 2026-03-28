import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddRequest = () => {
  const { user, useStatus } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get("/districts.json").then(r => setDistricts(r.data.districts||[]));
    axios.get("/upazila.json").then(r => setUpazilas(r.data.upazilas||[]));
  }, []);

  if (useStatus === "blocked") return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh" }}>
      <div style={{ background:"#fee2e2",color:"#991b1b",padding:"1.5rem 2rem",borderRadius:14,border:"1px solid rgba(220,38,38,.3)",textAlign:"center" }}>
        <div style={{ fontSize:"2rem",marginBottom:".5rem" }}>🚫</div>
        <p style={{ fontWeight:600 }}>Your account is blocked. You cannot create donation requests.</p>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!district || !upazila) return toast.warning("Please select district and upazila.");
    setSubmitting(true);
    const form = e.target;
    try {
      await axiosSecure.post("/requests", {
        requesterName: user?.displayName,
        requesterEmail: user?.email,
        recipientName: form.recipientName.value,
        district, upazila,
        hospital: form.hospital.value,
        address: form.address.value,
        bloodGroup: form.blood.value,
        donationDate: form.date.value,
        donationTime: form.time.value,
        message: form.message.value,
        status: "pending",
        createdAt: new Date(),
      });
      toast.success("Donation request created!");
      form.reset();
      setDistrict(""); setUpazila("");
    } catch {
      toast.error("Failed to create request. Please try again.");
    } finally { setSubmitting(false); }
  };

  return (
    <div style={{ minHeight:"100vh",background:"#f8fafc",padding:"2rem",fontFamily:"'DM Sans',sans-serif" }}>
      <ToastContainer position="top-right"/>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');.fi{width:100%;padding:.8rem 1rem;border:1.5px solid #e5e7eb;border-radius:12px;font-size:.9rem;font-family:inherit;color:#111827;background:#fff;outline:none;transition:all .2s;box-sizing:border-box}.fi:focus{border-color:#dc2626;box-shadow:0 0 0 3px rgba(220,38,38,.1)}.fi:disabled{background:#f8fafc;color:#64748b}.fl{display:block;font-size:.72rem;font-weight:600;color:#374151;margin-bottom:5px;letter-spacing:.04em;text-transform:uppercase}`}</style>

      <div style={{ maxWidth:760,margin:"0 auto" }}>
        <div style={{ marginBottom:"1.75rem" }}>
          <p style={{ fontSize:".78rem",color:"#dc2626",fontWeight:700,textTransform:"uppercase",letterSpacing:".12em",marginBottom:4 }}>Donor</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.9rem",fontWeight:700,color:"#0f172a",margin:0 }}>Create Donation Request</h1>
        </div>

        <div style={{ background:"#fff",borderRadius:20,border:"1px solid rgba(0,0,0,.06)",padding:"2rem" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
              {[{label:"Requester Name",value:user?.displayName,disabled:true},{label:"Requester Email",value:user?.email,disabled:true,type:"email"}].map(f=>(
                <div key={f.label}>
                  <label className="fl">{f.label}</label>
                  <input className="fi" type={f.type||"text"} value={f.value||""} disabled readOnly style={{ background:"#f8fafc",color:"#64748b" }}/>
                </div>
              ))}

              <div>
                <label className="fl">Recipient Name</label>
                <input className="fi" type="text" name="recipientName" required/>
              </div>

              <div>
                <label className="fl">Blood Group</label>
                <select className="fi" name="blood" required defaultValue="">
                  <option value="" disabled>Select blood group</option>
                  {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(g=><option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label className="fl">District</label>
                <select className="fi" value={district} onChange={e=>{setDistrict(e.target.value);setUpazila("");}} required>
                  <option value="">Select district</option>
                  {districts.map(d=><option key={d.id} value={String(d.id)}>{d.name}</option>)}
                </select>
              </div>

              <div>
                <label className="fl">Upazila</label>
                <select className="fi" value={upazila} onChange={e=>setUpazila(e.target.value)} required>
                  <option value="">Select upazila</option>
                  {upazilas.filter(u=>String(u.district_id)===district).map(u=><option key={u.id} value={u.name}>{u.name}</option>)}
                </select>
              </div>

              <div>
                <label className="fl">Hospital Name</label>
                <input className="fi" type="text" name="hospital" required/>
              </div>

              <div>
                <label className="fl">Full Address</label>
                <input className="fi" type="text" name="address" required/>
              </div>

              <div>
                <label className="fl">Donation Date</label>
                <input className="fi" type="date" name="date" min={new Date().toISOString().split("T")[0]} required/>
              </div>

              <div>
                <label className="fl">Donation Time</label>
                <input className="fi" type="time" name="time" required/>
              </div>

              <div style={{ gridColumn:"1 / -1" }}>
                <label className="fl">Request Message</label>
                <textarea className="fi" name="message" rows={4} required style={{ resize:"vertical" }}/>
              </div>

              <div style={{ gridColumn:"1 / -1",paddingTop:".5rem" }}>
                <button type="submit" disabled={submitting||!district||!upazila} style={{ padding:".8rem 2.5rem",borderRadius:50,border:"none",background:"#dc2626",color:"#fff",fontSize:".95rem",fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 6px 20px rgba(220,38,38,.3)",transition:"all .2s",opacity:submitting||!district||!upazila?.65:1 }}>
                  {submitting?"Submitting...":"Request Blood Donation"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;
