import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const { registerWithEmailPassword, setUser, handleGoogleSignIn } =
    useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/districts.json")
      .then((r) => setDistricts(r.data.districts || []));
    axios.get("/upazila.json").then((r) => setUpazilas(r.data.upazilas || []));
  }, []);

  const handleGoogle = async () => {
    try {
      const r = await handleGoogleSignIn();
      setUser(r.user);
      await axios.post("https://assignment-11-backend-alpha.vercel.app/users", {
        name: r.user.displayName,
        email: r.user.email,
        photoURL: r.user.photoURL,
        blood: "",
        district: "",
        upazila: "",
        createdAt: new Date(),
      });
      toast.success("Google sign-in successful!");
      navigate("/");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    const email = f.email.value,
      password = f.password.value,
      confirm = f.confirmPassword.value,
      name = f.name.value,
      blood = f.blood.value;
    const photo = f.photo.files[0];

    if (password !== confirm) return toast.error("Passwords do not match");
    if (password.length < 6)
      return toast.warning("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password))
      return toast.warning("Password needs an uppercase letter");
    if (!/[0-9]/.test(password))
      return toast.warning("Password needs a number");

    setSubmitting(true);
    try {
      let imgURL = "";
      if (photo) {
        const fd = new FormData();
        fd.append("image", photo);
        const res = await axios.post(
          "https://api.imgbb.com/1/upload?key=08e5b231ab2fe3f893b40a2ca856d6d1",
          fd,
        );
        imgURL = res.data.data.display_url;
      }
      const result = await registerWithEmailPassword(email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: imgURL,
      });
      setUser({ ...result.user, displayName: name, photoURL: imgURL });
      await axios.post("https://assignment-11-backend-alpha.vercel.app/users", {
        name,
        email,
        photoURL: imgURL,
        blood,
        district, // ✅ now stores "Mymensingh" not "10"
        upazila,
        createdAt: new Date(),
      });
      toast.success("Account created!");
      setTimeout(() => navigate("/"), 1500);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <ToastContainer position="top-right" />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Playfair+Display:wght@700;900&display=swap');.fi{width:100%;padding:.75rem 1rem;border:1.5px solid #e5e7eb;border-radius:12px;font-size:.9rem;font-family:inherit;color:#111827;background:#fff;outline:none;transition:all .2s;box-sizing:border-box}.fi:focus{border-color:#dc2626;box-shadow:0 0 0 3px rgba(220,38,38,.1)}.fl{display:block;font-size:.72rem;font-weight:600;color:#374151;margin-bottom:5px;letter-spacing:.04em;text-transform:uppercase}`}</style>

      <div style={{ width: "100%", maxWidth: 640 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              marginBottom: "1.25rem",
            }}
          >
            <svg width="24" height="30" viewBox="0 0 28 34" fill="none">
              <path
                d="M14 0C14 0 0 16 0 22C0 29.7 6.3 34 14 34C21.7 34 28 29.7 28 22C28 16 14 0 14 0Z"
                fill="#dc2626"
              />
            </svg>
            <span
              style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a" }}
            >
              BloodUnity
            </span>
          </Link>
          <h1
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "2rem",
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: "-.02em",
              margin: "0 0 .5rem",
            }}
          >
            Create your account
          </h1>
          <p style={{ color: "#6b7280", fontSize: ".9rem" }}>
            Already have one?{" "}
            <Link
              to="/login"
              style={{
                color: "#dc2626",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            border: "1px solid rgba(0,0,0,.06)",
            padding: "2rem",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {[
                [
                  { label: "Full Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                ],
                [
                  { label: "Password", name: "password", type: "password" },
                  {
                    label: "Confirm Password",
                    name: "confirmPassword",
                    type: "password",
                  },
                ],
              ]
                .flat()
                .map((f) => (
                  <div key={f.name}>
                    <label className="fl">{f.label}</label>
                    <input
                      className="fi"
                      type={f.type}
                      name={f.name}
                      required
                    />
                  </div>
                ))}

              <div>
                <label className="fl">Profile Photo</label>
                <input
                  className="fi"
                  type="file"
                  name="photo"
                  accept="image/*"
                  style={{ padding: ".6rem 1rem" }}
                />
              </div>

              <div>
                <label className="fl">Blood Group</label>
                <select className="fi" name="blood" required defaultValue="">
                  <option value="" disabled>
                    Select group
                  </option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (g) => (
                      <option key={g}>{g}</option>
                    ),
                  )}
                </select>
              </div>

              {/* ✅ FIXED: value={d.name} instead of value={String(d.id)} */}
              <div>
                <label className="fl">District</label>
                <select
                  className="fi"
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setUpazila("");
                  }}
                  required
                >
                  <option value="">Select district</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ FIXED: filter by district name match instead of ID */}
              <div>
                <label className="fl">Upazila</label>
                <select
                  className="fi"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  required
                >
                  <option value="">Select upazila</option>
                  {upazilas
                    .filter((u) => {
                      const d = districts.find((d) => d.name === district);
                      return d && String(u.district_id) === String(d.id);
                    })
                    .map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1", paddingTop: ".5rem" }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: ".85rem",
                    borderRadius: 12,
                    border: "none",
                    background: "#dc2626",
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 6px 20px rgba(220,38,38,.3)",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? "Creating account..." : "Create Account"}
                </button>
              </div>
            </div>
          </form>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "1.25rem 0",
              color: "#9ca3af",
              fontSize: ".8rem",
            }}
          >
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} /> or{" "}
            <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          </div>

          <button
            onClick={handleGoogle}
            style={{
              width: "100%",
              padding: ".8rem",
              background: "#fff",
              color: "#374151",
              border: "1.5px solid #e5e7eb",
              borderRadius: 12,
              fontSize: ".95rem",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
