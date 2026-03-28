import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

/* ALL routes visible in center */
const allLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/requests", label: "Donations" },
  { to: "/search", label: "Find Donor" },
  { to: "/emergencyReq", label: "Emergency" },
  { to: "/features", label: "Features" },
  { to: "/statistics", label: "Statistics" },
  { to: "/highlights", label: "Highlights" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/blogs", label: "Blogs" },
  { to: "/faq", label: "FAQ" },
];

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isDark = theme === "dark";
  const isActive = (to, exact) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  const links = user
    ? [...allLinks, { to: "/funding", label: "Funding" }]
    : allLinks;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        .nb-root {
          font-family: 'DM Sans', sans-serif;
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all .35s;
          ${scrolled
            ? `background:${isDark ? "rgba(7,7,16,.96)" : "rgba(255,255,255,.96)"};
               backdrop-filter:blur(20px);
               border-bottom:1px solid rgba(220,38,38,.12);
               box-shadow:0 2px 24px rgba(220,38,38,.07);`
            : `background:transparent;`}
        }

        /* ── TOP BAR ── */
        .nb-top {
          height: 60px;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          gap: 12px;
        }

        /* Logo */
        .nb-logo {
          display: flex; align-items: center; gap: 7px;
          text-decoration: none; flex-shrink: 0;
        }
        .nb-logo-drop { animation: nbPulse 2.8s ease-in-out infinite; }
        @keyframes nbPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        .nb-logo-text {
          font-size: 1.15rem; font-weight: 900;
          color: #dc2626; letter-spacing: -.025em; line-height: 1;
        }
        .nb-logo-text b { color: ${isDark ? "#fff" : "#0f172a"}; font-weight: 900; }

        /* ── SCROLLING LINKS ROW (center) ── */
        .nb-links-wrap {
          flex: 1;
          min-width: 0;
          overflow: hidden;
          position: relative;
        }
        .nb-links-wrap::before,
        .nb-links-wrap::after {
          content: '';
          position: absolute; top: 0; bottom: 0; width: 28px;
          z-index: 2; pointer-events: none;
        }
        .nb-links-wrap::before {
          left: 0;
          background: linear-gradient(to right,
            ${isDark ? (scrolled ? "rgba(7,7,16,.96)" : "transparent") : (scrolled ? "rgba(255,255,255,.96)" : "transparent")},
            transparent);
        }
        .nb-links-wrap::after {
          right: 0;
          background: linear-gradient(to left,
            ${isDark ? (scrolled ? "rgba(7,7,16,.96)" : "transparent") : (scrolled ? "rgba(255,255,255,.96)" : "transparent")},
            transparent);
        }

        .nb-links {
          display: flex;
          align-items: center;
          gap: 2px;
          overflow-x: auto;
          padding: 0 6px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }
        .nb-links::-webkit-scrollbar { display: none; }

        .nb-link {
          position: relative;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          padding: 5px 11px;
          border-radius: 8px;
          font-size: .8rem;
          font-weight: 500;
          color: ${isDark ? "rgba(255,255,255,.62)" : "rgba(15,15,30,.62)"};
          text-decoration: none;
          transition: all .18s;
          white-space: nowrap;
          border: 1px solid transparent;
        }
        .nb-link:hover {
          color: #dc2626;
          background: rgba(220,38,38,.07);
        }
        .nb-link.active {
          color: #dc2626;
          background: rgba(220,38,38,.09);
          border-color: rgba(220,38,38,.2);
          font-weight: 600;
        }
        .nb-link.active::after {
          content: '';
          position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px; border-radius: 50%; background: #dc2626;
        }

        /* ── RIGHT BUTTONS ── */
        .nb-right {
          display: flex; align-items: center; gap: 8px; flex-shrink: 0;
        }

        .nb-theme {
          width: 30px; height: 30px; border-radius: 50%;
          border: 1.5px solid rgba(220,38,38,.25);
          background: transparent; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: ${isDark ? "#fbbf24" : "#374151"};
          transition: all .2s;
        }
        .nb-theme:hover { background: rgba(220,38,38,.07); border-color: #dc2626; }

        .nb-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          border: 2px solid #dc2626; object-fit: cover;
          cursor: pointer; transition: box-shadow .2s; flex-shrink: 0;
        }
        .nb-avatar:hover { box-shadow: 0 0 0 3px rgba(220,38,38,.2); }

        .nb-btn-pri {
          display: inline-flex; align-items: center;
          background: #dc2626; color: #fff; border: none;
          padding: .42rem 1.05rem; border-radius: 50px;
          font-size: .8rem; font-weight: 700; cursor: pointer;
          box-shadow: 0 4px 14px rgba(220,38,38,.28);
          text-decoration: none; transition: all .2s;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }
        .nb-btn-pri:hover { background: #b91c1c; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(220,38,38,.38); }

        .nb-btn-out {
          display: inline-flex; align-items: center;
          background: transparent;
          border: 1.5px solid rgba(220,38,38,.38); color: #dc2626;
          padding: .4rem .95rem; border-radius: 50px;
          font-size: .8rem; font-weight: 600; cursor: pointer;
          transition: all .2s; text-decoration: none;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }
        .nb-btn-out:hover { background: rgba(220,38,38,.07); border-color: #dc2626; }

        /* Hamburger */
        .nb-ham {
          background: none; border: none; cursor: pointer;
          padding: 3px; display: flex; flex-direction: column;
          gap: 5px; flex-shrink: 0;
        }
        .nb-ham span {
          display: block; width: 20px; height: 2px;
          background: ${isDark ? "#fff" : "#0f172a"};
          border-radius: 2px; transition: all .28s;
        }
        .nb-ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nb-ham.open span:nth-child(2) { opacity: 0; }
        .nb-ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE DRAWER ── */
        .nb-drawer {
          background: ${isDark ? "rgba(6,6,14,.98)" : "rgba(255,255,255,.98)"};
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(220,38,38,.1);
          padding: .75rem 1rem 1.25rem;
          animation: nbSlide .25s ease;
          max-height: calc(100vh - 60px);
          overflow-y: auto;
        }
        @keyframes nbSlide {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .nb-mob-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          margin-bottom: .75rem;
        }

        .nb-mob-link {
          display: flex; align-items: center;
          padding: .6rem .85rem; border-radius: 9px;
          font-size: .875rem; font-weight: 500;
          color: ${isDark ? "rgba(255,255,255,.68)" : "rgba(15,15,30,.68)"};
          text-decoration: none; transition: all .15s;
          border: 1px solid transparent;
        }
        .nb-mob-link:hover, .nb-mob-link.active {
          background: rgba(220,38,38,.08);
          color: #dc2626;
          border-color: rgba(220,38,38,.14);
        }

        .nb-mob-tag {
          font-size: .65rem; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase;
          color: ${isDark ? "rgba(255,255,255,.25)" : "rgba(15,15,30,.28)"};
          padding: .6rem .85rem .25rem;
        }
        .nb-divider { height: 1px; background: rgba(220,38,38,.09); margin: .5rem 0; }

        /* hide/show helpers */
        @media (min-width: 1024px) {
          .mob-only { display: none !important; }
        }
        @media (max-width: 1023px) {
          .desk-only { display: none !important; }
        }
      `}</style>

      <nav className="nb-root">
        <div className="nb-top">

          {/* Logo */}
          <Link to="/" className="nb-logo">
            <svg className="nb-logo-drop" width="22" height="28" viewBox="0 0 28 34" fill="none">
              <path d="M14 0C14 0 0 16 0 22C0 29.7 6.3 34 14 34C21.7 34 28 29.7 28 22C28 16 14 0 14 0Z" fill="#dc2626"/>
              <path d="M10 24C10 21 12 18 14 16C16 18 18 21 18 24C18 26.2 16.2 28 14 28C11.8 28 10 26.2 10 24Z" fill="rgba(255,255,255,.3)"/>
            </svg>
            <span className="nb-logo-text">Blood<b>Unity</b></span>
          </Link>

          {/* ── ALL LINKS IN CENTER (desktop) ── */}
          <div className="nb-links-wrap desk-only" ref={scrollRef}>
            <div className="nb-links">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`nb-link ${isActive(l.to, l.exact) ? "active" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="nb-right">
            {/* Theme toggle */}
            <button className="nb-theme" onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
              {isDark
                ? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm-1-4a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0V3zm0 17a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0v-1zM4.22 5.64a1 1 0 0 1 1.42-1.42l.7.71a1 1 0 0 1-1.41 1.41l-.71-.7zm12.72 12.72a1 1 0 0 1 1.41 1.41l-.7.71a1 1 0 0 1-1.42-1.42l.71-.7zM3 11a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2h1zm18 0a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2h1z"/></svg>
                : <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>

            {/* Desktop auth */}
            {!user ? (
              <>
                <Link to="/login" className="nb-btn-out desk-only">Sign In</Link>
                <Link to="/register" className="nb-btn-pri desk-only">Join Now</Link>
              </>
            ) : (
              <>
                <button className="nb-btn-out desk-only" onClick={() => navigate("/dashboard")}>Dashboard</button>
                {user.photoURL && (
                  <img src={user.photoURL} alt="" className="nb-avatar desk-only" onClick={() => navigate("/dashboard/profile")} />
                )}
                <button className="nb-btn-pri desk-only" onClick={() => signOut(auth)}>Logout</button>
              </>
            )}

            {/* Hamburger */}
            <button
              className={`nb-ham mob-only ${mobileOpen ? "open" : ""}`}
              onClick={() => setMobileOpen(o => !o)}
            >
              <span/><span/><span/>
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        {mobileOpen && (
          <div className="nb-drawer mob-only">
            <p className="nb-mob-tag">All Pages</p>
            <div className="nb-mob-grid">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`nb-mob-link ${isActive(l.to, l.exact) ? "active" : ""}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="nb-divider"/>
            <p className="nb-mob-tag">Account</p>

            {!user ? (
              <div style={{ display:"flex", gap:8, padding:"0 .5rem" }}>
                <Link to="/login" className="nb-btn-out" style={{ flex:1, justifyContent:"center" }}>Sign In</Link>
                <Link to="/register" className="nb-btn-pri" style={{ flex:1, justifyContent:"center" }}>Join Now</Link>
              </div>
            ) : (
              <>
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:".4rem .85rem .8rem" }}>
                  {user.photoURL && (
                    <img src={user.photoURL} alt="" className="nb-avatar" style={{ width:36, height:36 }} />
                  )}
                  <div>
                    <div style={{ fontSize:".82rem", fontWeight:600, color: isDark ? "#fff" : "#0f172a" }}>{user.displayName}</div>
                    <div style={{ fontSize:".72rem", color:"#94a3b8" }}>{user.email}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, padding:"0 .5rem" }}>
                  <button className="nb-btn-out" style={{ flex:1, justifyContent:"center" }} onClick={() => navigate("/dashboard")}>Dashboard</button>
                  <button className="nb-btn-pri" style={{ flex:1, justifyContent:"center" }} onClick={() => signOut(auth)}>Logout</button>
                </div>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div style={{ height: 60 }} />
    </>
  );
};

export default Navbar;
