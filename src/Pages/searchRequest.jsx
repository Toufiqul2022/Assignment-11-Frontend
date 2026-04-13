import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

const SearchRequest = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selDistrict, setSelDistrict] = useState("");
  const [selUpazila, setSelUpazila] = useState("");
  const [selBlood, setSelBlood] = useState("");

  useEffect(() => {
    axios
      .get("/districts.json")
      .then((r) => setDistricts(r.data.districts || []));
    axios.get("/upazila.json").then((r) => setUpazilas(r.data.upazilas || []));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get(
        `${API_URL}/search-requests?bloodGroup=${encodeURIComponent(selBlood)}&district=${encodeURIComponent(selDistrict)}&upazila=${encodeURIComponent(selUpazila)}`,
      );
      setResults(res.data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "3rem 1.5rem",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');
        .fi { padding: .8rem 1rem; border: 1.5px solid #e5e7eb; border-radius: 12px; font-size: .9rem; font-family: inherit; color: #111827; background: #fff; outline: none; transition: all .2s; box-sizing: border-box; }
        .fi:focus { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220,38,38,.1); }
        .rc { background: #fff; border-radius: 16px; border: 1px solid rgba(0,0,0,.06); padding: 1.4rem; transition: all .3s; }
        .rc:hover { transform: translateY(-4px); box-shadow: 0 16px 50px rgba(220,38,38,.09); border-color: rgba(220,38,38,.18); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p
            style={{
              fontSize: ".78rem",
              color: "#dc2626",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".12em",
              marginBottom: 8,
            }}
          >
            Donor search
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: "-.02em",
              margin: 0,
            }}
          >
            Find a Blood Donor
          </h1>
        </div>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          style={{
            background: "#fff",
            borderRadius: 20,
            border: "1px solid rgba(0,0,0,.06)",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: ".72rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 5,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                }}
              >
                Blood Group
              </label>
              <select
                className="fi"
                style={{ width: "100%" }}
                value={selBlood}
                onChange={(e) => setSelBlood(e.target.value)}
                required
              >
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: ".72rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 5,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                }}
              >
                District
              </label>
              <select
                className="fi"
                style={{ width: "100%" }}
                value={selDistrict}
                onChange={(e) => {
                  setSelDistrict(e.target.value);
                  setSelUpazila("");
                }}
              >
                <option value="">All Districts</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: ".72rem",
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 5,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                }}
              >
                Upazila
              </label>
              <select
                className="fi"
                style={{ width: "100%" }}
                value={selUpazila}
                onChange={(e) => setSelUpazila(e.target.value)}
              >
                <option value="">All Upazilas</option>
                {upazilas
                  .filter((u) => {
                    const d = districts.find((d) => d.name === selDistrict);
                    return d && String(u.district_id) === String(d.id);
                  })
                  .map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            style={{
              padding: ".75rem 2.5rem",
              borderRadius: 50,
              border: "none",
              background: "#dc2626",
              color: "#fff",
              fontSize: ".95rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 6px 20px rgba(220,38,38,.3)",
            }}
          >
            Search Donors
          </button>
        </form>

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "3rem",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                border: "3px solid #f3f3f3",
                borderTop: "3px solid #dc2626",
                borderRadius: "50%",
                animation: "spin .8s linear infinite",
              }}
            />
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              background: "#fff",
              borderRadius: 20,
              border: "1px solid rgba(0,0,0,.06)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>🔍</div>
            <p style={{ color: "#64748b" }}>
              No donors found matching your criteria. Try broadening your
              search.
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            <p
              style={{
                fontSize: ".82rem",
                color: "#64748b",
                marginBottom: "1rem",
              }}
            >
              {results.length} donor{results.length !== 1 ? "s" : ""} found
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: "1rem",
              }}
            >
              {results.map((r) => (
                <div key={r._id} className="rc">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "rgba(220,38,38,.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "1.1rem",
                        fontWeight: 900,
                        color: "#dc2626",
                        flexShrink: 0,
                      }}
                    >
                      {r.bloodGroup}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#0f172a",
                          fontSize: ".9rem",
                        }}
                      >
                        {r.recipientName}
                      </div>
                      <div style={{ fontSize: ".75rem", color: "#94a3b8" }}>
                        {r.upazila}, {r.district}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: ".8rem",
                      color: "#475569",
                      marginBottom: ".5rem",
                    }}
                  >
                    🏥 {r.hospital}
                  </div>
                  <div
                    style={{
                      fontSize: ".78rem",
                      color: "#64748b",
                      marginBottom: ".75rem",
                    }}
                  >
                    📅 {r.donationDate} at {r.donationTime}
                  </div>
                  {r.message && (
                    <div
                      style={{
                        fontSize: ".78rem",
                        color: "#64748b",
                        fontStyle: "italic",
                        marginBottom: ".75rem",
                      }}
                    >
                      "{r.message}"
                    </div>
                  )}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 12px",
                      borderRadius: 50,
                      background: "rgba(220,38,38,.08)",
                      color: "#dc2626",
                      fontWeight: 700,
                      fontSize: ".85rem",
                    }}
                  >
                    🩸 {r.bloodGroup}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRequest;
