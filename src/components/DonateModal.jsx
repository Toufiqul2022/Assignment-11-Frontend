import React, { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const DonateModal = ({ requestId, closeModal, refresh }) => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const handleConfirm = async () => {
    try {
      const token = await user.getIdToken();
      await axiosInstance.patch(
        `/donation-requests/${requestId}`,
        { donorName: user.displayName, donorEmail: user.email },
        { headers: { authorization: `Bearer ${token}` } }
      );
      toast.success("Donation confirmed!");
      closeModal();
      refresh();
    } catch {
      toast.error("Failed to confirm donation.");
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.5)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50 }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"2rem", width:"100%", maxWidth:420, margin:"1rem", fontFamily:"'DM Sans',sans-serif" }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", fontWeight:700, color:"#0f172a", margin:"0 0 .5rem" }}>Confirm Donation</h3>
        <p style={{ color:"#64748b", fontSize:".875rem", marginBottom:"1.5rem" }}>Your contact details will be shared with the requester.</p>

        {[["Donor Name", user?.displayName], ["Donor Email", user?.email]].map(([l, v]) => (
          <div key={l} style={{ marginBottom:"0.85rem" }}>
            <label style={{ display:"block", fontSize:".72rem", fontWeight:600, color:"#374151", marginBottom:4, textTransform:"uppercase", letterSpacing:".04em" }}>{l}</label>
            <input value={v || ""} readOnly style={{ width:"100%", padding:".75rem 1rem", background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:10, fontSize:".875rem", color:"#374151", fontFamily:"inherit", boxSizing:"border-box" }}/>
          </div>
        ))}

        <div style={{ display:"flex", gap:10, marginTop:"1.25rem" }}>
          <button onClick={handleConfirm} style={{ flex:1, padding:".8rem", borderRadius:10, border:"none", background:"#dc2626", color:"#fff", fontWeight:700, fontSize:".9rem", cursor:"pointer", fontFamily:"inherit", boxShadow:"0 4px 15px rgba(220,38,38,.3)" }}>Confirm</button>
          <button onClick={closeModal} style={{ flex:1, padding:".8rem", borderRadius:10, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontWeight:600, fontSize:".9rem", cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DonateModal;
