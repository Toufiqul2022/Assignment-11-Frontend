import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const statusColors = {
  pending: { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  inprogress: { bg: "#dbeafe", color: "#1e40af", dot: "#3b82f6" },
  done: { bg: "#dcfce7", color: "#166534", dot: "#22c55e" },
  canceled: { bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
};

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [showAll, setShowAll] = useState(false);

  const { data: stats = { totalUsers: 0, totalFunding: 0, totalRequests: 0 }, isLoading: sL } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => axiosInstance.get("/dashboard-stats").then(r => r.data),
  });

  const { data: requests = [], isLoading: rL } = useQuery({
    queryKey: ["all-donation-requests"],
    queryFn: () => axiosInstance.get("/donation-requests").then(r => r.data),
  });

  const displayed = showAll ? requests : requests.slice(0, 8);
  const isLoading = sL || rL;

  if (isLoading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f8fafc" }}>
      <div style={{ textAlign: "center" }}>
        <svg width="40" height="48" viewBox="0 0 28 34" fill="none" style={{ animation: "pulse 1.5s ease-in-out infinite", margin: "0 auto 1rem" }}>
          <path d="M14 0C14 0 0 16 0 22C0 29.7 6.3 34 14 34C21.7 34 28 29.7 28 22C28 16 14 0 14 0Z" fill="#dc2626"/>
        </svg>
        <div style={{ color: "#64748b", fontSize: "0.9rem" }}>Loading dashboard...</div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "2rem", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .stat-card {
          background: #fff;
          border-radius: 20px;
          padding: 1.75rem;
          border: 1px solid rgba(0,0,0,0.06);
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }
        .stat-card::after {
          content: '';
          position: absolute;
          top: -20px; right: -20px;
          width: 100px; height: 100px;
          border-radius: 50%;
          opacity: 0.06;
        }
        .stat-card.red::after { background: #dc2626; }
        .stat-card.blue::after { background: #2563eb; }
        .stat-card.green::after { background: #16a34a; }
        .dash-table { width: 100%; border-collapse: collapse; }
        .dash-table th {
          text-align: left;
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .dash-table td {
          padding: 1rem;
          font-size: 0.875rem;
          color: #374151;
          border-bottom: 1px solid #f8fafc;
        }
        .dash-table tr:hover td { background: #fafafa; }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 50px;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: capitalize;
        }
        .status-dot { width: 5px; height: 5px; border-radius: 50%; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontSize: "0.8rem", color: "#dc2626", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "4px" }}>Admin Panel</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.02em", margin: 0 }}>
          Good morning, {user?.displayName?.split(" ")[0] || "Admin"} 👋
        </h1>
        <p style={{ color: "#64748b", marginTop: "6px", fontSize: "0.9rem" }}>
          Here's what's happening with BloodUnity today.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
        {[
          { label: "Total Users", value: stats.totalUsers, cls: "blue", icon: "👥", change: "+12% this month" },
          { label: "Blood Requests", value: stats.totalRequests, cls: "red", icon: "🩸", change: "+8% this week" },
          { label: "Total Funding", value: `$${stats.totalFunding}`, cls: "green", icon: "💰", change: "+5% this month" },
        ].map((s) => (
          <div key={s.label} className={`stat-card ${s.cls}`}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{s.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "6px", fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontSize: "0.72rem", color: "#22c55e", marginTop: "4px", fontWeight: 600 }}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Requests table */}
      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", margin: 0 }}>Recent Blood Requests</h2>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: "2px 0 0" }}>{requests.length} total requests</p>
          </div>
          {requests.length > 8 && (
            <button onClick={() => setShowAll(s => !s)}
              style={{ background: "rgba(220,38,38,0.06)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)", padding: "0.4rem 1rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              {showAll ? "Show Less" : "View All"}
            </button>
          )}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Requester</th>
                <th>Blood Group</th>
                <th>District</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length > 0 ? displayed.map((req) => {
                const sc = statusColors[req.status] || statusColors.pending;
                return (
                  <tr key={req._id}>
                    <td style={{ fontWeight: 500, color: "#0f172a" }}>{req.requesterName}</td>
                    <td>
                      <span style={{ background: "rgba(220,38,38,0.08)", color: "#dc2626", padding: "2px 10px", borderRadius: "6px", fontWeight: 700, fontSize: "0.85rem" }}>
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td style={{ color: "#64748b" }}>{req.district}</td>
                    <td>
                      <span className="status-badge" style={{ background: sc.bg, color: sc.color }}>
                        <span className="status-dot" style={{ background: sc.dot }} />
                        {req.status}
                      </span>
                    </td>
                    <td style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                      {new Date(req.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan={5} style={{ textAlign: "center", padding: "3rem", color: "#94a3b8", fontStyle: "italic" }}>No requests found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
