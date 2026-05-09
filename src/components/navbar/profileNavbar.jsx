import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { LuGithub, LuLinkedin, LuMail, LuX, LuMenu, LuFileText } from "react-icons/lu";
import useIsMobile from "../../utils/useIsMobile";

const NAV_LINKS = [
  { label: "HOME",       path: "/" },
  { label: "ABOUT",      path: "/about" },
  { label: "EXPERIENCE", path: "/experience" },
  { label: "EDUCATION",  path: "/education" },
  { label: "SKILLS",     path: "/skills" },
  { label: "PROJECTS",   path: "/projects" },
  { label: "CONTACT",    path: "/contact" },
];

const LiveClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toTimeString().split(" ")[0]);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
};

const SysLoad = () => {
  const [load, setLoad] = useState(39);
  useEffect(() => {
    const id = setInterval(() => setLoad(Math.floor(Math.random() * 30) + 28), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <span style={{ fontSize: "0.5rem", color: "#3D5166", letterSpacing: "0.1em" }}>SYS_LOAD</span>
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <div style={{ width: 56, height: 3, background: "rgba(0,212,255,0.1)", borderRadius: 2 }}>
          <div
            style={{
              width: `${load}%`, height: "100%",
              background: "#00D4FF",
              boxShadow: "0 0 6px rgba(0,212,255,0.6)",
              borderRadius: 2,
              transition: "width 0.9s ease",
            }}
          />
        </div>
        <span style={{ fontSize: "0.55rem", color: "#00D4FF", fontWeight: 600 }}>{load}%</span>
      </div>
    </div>
  );
};

const Sep = () => (
  <div style={{ width: 1, height: 28, background: "rgba(0,212,255,0.1)", flexShrink: 0 }} />
);

const ProfileNavbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const isMobile  = useIsMobile();
  const isTablet  = useIsMobile(1100);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(3,12,26,0.92)",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isTablet ? "0.6rem" : "1rem",
            padding: isMobile ? "0.5rem 1rem" : "0.5rem 1.5rem",
            height: isMobile ? 52 : 48,
          }}
        >
          {/* ── Logo ── */}
          <button
            onClick={() => { navigate("/"); if (menuOpen) setMenuOpen(false); }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              display: "flex", gap: "0.55rem", alignItems: "center", flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 30, height: 30,
                border: "1px solid rgba(0,212,255,0.55)",
                borderRadius: 3,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#00D4FF", fontSize: "0.68rem", fontWeight: 700,
                boxShadow: "0 0 10px rgba(0,212,255,0.18)",
                flexShrink: 0,
              }}
            >
              &gt;_
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, lineHeight: 1 }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#E2E8F0", letterSpacing: "0.14em" }}>
                HARIT_CORE.V2
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span
                  style={{
                    display: "inline-block", width: 5, height: 5, borderRadius: "50%",
                    background: "#00D4FF", boxShadow: "0 0 6px #00D4FF",
                    animation: "pulseDot 2.5s ease-in-out infinite",
                  }}
                />
                <span style={{ fontSize: "0.48rem", color: "#3D5166", letterSpacing: "0.09em" }}>SESSION_ACTIVE</span>
              </div>
            </div>
          </button>

          {!isTablet && <Sep />}
          {!isTablet && <SysLoad />}
          {!isTablet && <Sep />}

          {/* ── Nav links (desktop) ── */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.1rem", flex: 1, justifyContent: "center" }}>
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <button
                    key={link.label}
                    onClick={() => navigate(link.path)}
                    style={{
                      background: active ? "#00D4FF" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: isTablet ? "0.28rem 0.5rem" : "0.3rem 0.65rem",
                      fontSize: isTablet ? "0.58rem" : "0.62rem",
                      letterSpacing: "0.1em",
                      color: active ? "#030C1A" : "#8892B0",
                      fontWeight: active ? 700 : 400,
                      borderRadius: 3,
                      fontFamily: "'JetBrains Mono', monospace",
                      transition: "all 0.18s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = "#00D4FF";
                        e.currentTarget.style.background = "rgba(0,212,255,0.08)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.color = "#8892B0";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Right group ── */}
          <div style={{ display: "flex", alignItems: "center", gap: isTablet ? "0.6rem" : "0.8rem", marginLeft: isMobile ? "auto" : 0, flexShrink: 0 }}>
            {!isMobile && (
              <>
                {[
                  { label: "𝕏",  href: "https://x.com/haritdheer", fontSize: "0.78rem" },
                  { icon: <LuLinkedin size={14} />, href: "https://linkedin.com/in/harit-dheer-612a28203" },
                  { icon: <LuGithub  size={14} />, href: "https://github.com/haritdheer" },
                  { icon: <LuMail   size={14} />, href: "mailto:haritdheer@gmail.com" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#3D5166", transition: "color 0.2s", display: "flex", alignItems: "center", fontSize: s.fontSize || "inherit" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#3D5166")}
                  >
                    {s.label || s.icon}
                  </a>
                ))}

                {!isTablet && (
                  <a
                    href="https://drive.google.com/file/d/1e7DAS7M5IYhzwzSLsddToNEqtOTSByL1/view?usp=drivesdk"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: "0.3rem",
                      fontSize: "0.6rem", color: "#3D5166", textDecoration: "none",
                      border: "1px solid rgba(61,81,102,0.4)", borderRadius: 2,
                      padding: "0.2rem 0.55rem", transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#00D4FF"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#3D5166"; e.currentTarget.style.borderColor = "rgba(61,81,102,0.4)"; }}
                  >
                    <LuFileText size={11} /> CV
                  </a>
                )}

                <Sep />

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, lineHeight: 1 }}>
                  <span style={{ fontSize: "0.65rem", color: "#E2E8F0", fontWeight: 600, letterSpacing: "0.04em" }}>
                    <LiveClock />
                  </span>
                  <span style={{ fontSize: "0.48rem", color: "#00D4FF", letterSpacing: "0.12em" }}>SYNC_SECURE</span>
                </div>
              </>
            )}

            {/* Mobile: clock + hamburger */}
            {isMobile && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1, lineHeight: 1 }}>
                  <span style={{ fontSize: "0.6rem", color: "#E2E8F0", fontWeight: 600 }}><LiveClock /></span>
                  <span style={{ fontSize: "0.45rem", color: "#00D4FF", letterSpacing: "0.1em" }}>SYNC_SECURE</span>
                </div>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{ color: "#00D4FF", background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}
                >
                  {menuOpen ? <LuX size={18} /> : <LuMenu size={18} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen drawer (portal → bypasses all stacking contexts) ── */}
      {menuOpen && ReactDOM.createPortal(
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "#030C1A",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
            animation: "lineIn 0.2s ease forwards",
          }}
        >
          <div style={{ marginBottom: "1.5rem", opacity: 0.6 }}>
            <SysLoad />
          </div>

          {NAV_LINKS.map((link) => {
            const active = location.pathname === link.path;
            return (
              <button
                key={link.label}
                onClick={() => { navigate(link.path); setMenuOpen(false); }}
                style={{
                  background: active ? "#00D4FF" : "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  letterSpacing: "0.18em",
                  color: active ? "#030C1A" : "#C8D8E8",
                  fontWeight: active ? 700 : 400,
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: "0.6rem 2.5rem",
                  borderRadius: 3,
                  width: "100%",
                  maxWidth: 280,
                  textAlign: "center",
                  transition: "all 0.15s",
                }}
              >
                {link.label}
              </button>
            );
          })}

          <div style={{ display: "flex", gap: "1.4rem", marginTop: "2rem" }}>
            {[
              { icon: <LuLinkedin size={18} />, href: "https://linkedin.com/in/harit-dheer-612a28203" },
              { icon: <LuGithub   size={18} />, href: "https://github.com/haritdheer" },
              { icon: <LuMail     size={18} />, href: "mailto:haritdheer@gmail.com" },
            ].map((s, i) => (
              <a
                key={i} href={s.href} target="_blank" rel="noreferrer"
                style={{ color: "#3D5166", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3D5166")}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <a
            href="https://drive.google.com/file/d/1e7DAS7M5IYhzwzSLsddToNEqtOTSByL1/view?usp=drivesdk"
            target="_blank"
            rel="noreferrer"
            className="mc-btn"
            style={{ marginTop: "0.75rem", fontSize: "0.75rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <LuFileText size={13} /> Resume ↗
          </a>
        </div>,
        document.body
      )}
    </>
  );
};

export default ProfileNavbar;
