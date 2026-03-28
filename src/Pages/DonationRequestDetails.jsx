import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: req, isLoading, isError } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: () => axiosInstance.get(`/donation-requests/${id}`).then(r => r.data),
    enabled: !!user,
  });

  const donateMut = useMutation({
    mutationFn: () => axiosInstance.patch(`/donation-requests/${id}`, { donorName: user.displayName, donorEmail: user.email }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["donation-request", id] });
      setModalOpen(false);
      toast.success("Thank you! Your donation has been confirmed.");
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  if (isLoading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
      <div style={{ width:40, height:40, border:"3px solid #f3f3f3", borderTop:"3px solid #dc2626", borderRadius:"50%", animation:"spin .8s linear infinite" }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (isError || !req) return (
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"1rem" }}>
      <div style={{ fontSize:"3rem" }}>😔</div>
      <p style={{ color:"#64748b" }}>Request not found or you don't have access.</p>
      <button onClick={() => navigate("/requests")} style={{ padding:".65rem 1.5rem", borderRadius:10, background:"#dc2626", color:"#fff", border:"none", cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Browse Requests</button>
    </div>
  );

  const statusColors = { pending:"#fef3c7,#92400e,#f59e0b", inprogress:"#dbeafe,#1e40af,#3b82f6", done:"#dcfce7,#166534,#22c55e", canceled:"#fee2e2,#991b1b,#ef4444" };
  const [bg, col, dot] = (statusColors[req.status] || statusColors.pending).split(",");

  return (
    <div style={{ minHeight:"100vh", background:"#f8fafc", padding:"3rem 1.5rem", fontFamily:"'DM Sans',sans-serif" }}>
      <ToastContainer position="top-right" />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap'); .overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:50;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}`}</style>

      <div style={{ maxWidth:700, margin:"0 auto" }}>
        {/* Back */}
        <button onClick={() => navigate(-1)} style={{ display:"flex", alignItems:"center", gap:6, background:"none", border:"none", color:"#64748b", cursor:"pointer", fontFamily:"inherit", fontSize:".875rem", marginBottom:"1.5rem", padding:0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to requests
        </button>

        {/* Header card */}
        <div style={{ background:"#fff", borderRadius:20, border:"1px solid rgba(0,0,0,.06)", overflow:"hidden", marginBottom:"1.25rem" }}>
          <div style={{ background:"linear-gradient(135deg,#dc2626,#991b1b)", padding:"2rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"1rem" }}>
              <div>
                <p style={{ fontSize:".75rem", color:"rgba(255,255,255,.6)", fontWeight:600, textTransform:"uppercase", letterSpacing:".1em", marginBottom:6 }}>Blood Needed</p>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"4rem", fontWeight:900, color:"#fff", lineHeight:1 }}>{req.bloodGroup}</div>
              </div>
              <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"5px 14px", borderRadius:50, fontSize:".78rem", fontWeight:600, textTransform:"capitalize", background:bg, color:col }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:dot }}/>
                {req.status}
              </span>
            </div>
          </div>

          <div style={{ padding:"2rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem" }}>
            {[
              ["Recipient", req.recipientName],
              ["Hospital", req.hospital],
              ["Location", `${req.upazila}, ${req.district}`],
              ["Address", req.address],
              ["Date", req.donationDate],
              ["Time", req.donationTime],
              ["Requested by", req.requesterName],
              ["Contact", req.requesterEmail],
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize:".72rem", fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>{l}</div>
                <div style={{ fontSize:".9rem", fontWeight:500, color:"#0f172a" }}>{v || "—"}</div>
              </div>
            ))}
          </div>

          {req.message && (
            <div style={{ padding:"0 2rem 2rem" }}>
              <div style={{ fontSize:".72rem", fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".08em", marginBottom:6 }}>Message</div>
              <div style={{ background:"#f8fafc", borderRadius:12, padding:"1rem", fontSize:".9rem", color:"#475569", lineHeight:1.7, border:"1px solid #f1f5f9" }}>{req.message}</div>
            </div>
          )}
        </div>

        {/* Donor info if in progress */}
        {req.status === "inprogress" && req.donorName && (
          <div style={{ background:"#dbeafe", borderRadius:14, padding:"1.25rem", border:"1px solid #93c5fd", marginBottom:"1.25rem" }}>
            <p style={{ fontSize:".75rem", fontWeight:700, color:"#1e40af", textTransform:"uppercase", letterSpacing:".08em", marginBottom:4 }}>Donor Confirmed</p>
            <p style={{ color:"#1e3a8a", fontWeight:500 }}>{req.donorName} · {req.donorEmail}</p>
          </div>
        )}

        {/* Donate button */}
        {req.status === "pending" && (
          <button onClick={() => setModalOpen(true)} style={{ width:"100%", padding:".9rem", borderRadius:14, background:"#dc2626", color:"#fff", border:"none", fontSize:"1rem", fontWeight:700, fontFamily:"inherit", cursor:"pointer", boxShadow:"0 8px 30px rgba(220,38,38,.35)", transition:"all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#b91c1c"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#dc2626"; e.currentTarget.style.transform="translateY(0)"; }}>
            I Want to Donate Blood
          </button>
        )}
      </div>

      {/* Confirm Modal */}
      {modalOpen && (
        <div className="overlay" onClick={() => setModalOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:20, padding:"2rem", width:"100%", maxWidth:420, margin:"1rem" }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.5rem", fontWeight:700, color:"#0f172a", margin:"0 0 .5rem" }}>Confirm Donation</h2>
            <p style={{ color:"#64748b", fontSize:".875rem", marginBottom:"1.5rem" }}>Your details will be shared with the requester.</p>

            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:"1.5rem" }}>
              {[["Donor Name", user?.displayName], ["Donor Email", user?.email]].map(([l, v]) => (
                <div key={l}>
                  <label style={{ display:"block", fontSize:".72rem", fontWeight:600, color:"#374151", marginBottom:5, textTransform:"uppercase", letterSpacing:".04em" }}>{l}</label>
                  <input value={v || ""} readOnly style={{ width:"100%", padding:".75rem 1rem", background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:10, fontSize:".9rem", color:"#374151", fontFamily:"inherit", boxSizing:"border-box" }} />
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => donateMut.mutate()} disabled={donateMut.isPending} style={{ flex:1, padding:".8rem", borderRadius:10, border:"none", background:"#dc2626", color:"#fff", fontWeight:700, fontSize:".9rem", cursor:"pointer", fontFamily:"inherit" }}>
                {donateMut.isPending ? "Confirming..." : "Confirm Donation"}
              </button>
              <button onClick={() => setModalOpen(false)} style={{ flex:1, padding:".8rem", borderRadius:10, border:"1px solid #e5e7eb", background:"#fff", color:"#374151", fontWeight:600, fontSize:".9rem", cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
