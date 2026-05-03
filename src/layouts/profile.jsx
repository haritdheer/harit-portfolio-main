import React, { useState, useEffect, useRef, useCallback } from "react";
import ProfileNavbar from "../components/navbar/profileNavbar";
import SiteFooter from "../components/footer";
import CosmosBackground from "../components/cosmos_background";
import TerminalCLI from "../components/terminal_cli";
import CursorTrail from "../components/cursor_trail";
import useIsMobile from "../utils/useIsMobile";

/* ─── Scroll progress bar ─────────────────────────────────────── */
const ScrollProgress = ({ mainRef }) => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setPct(scrollHeight <= clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [mainRef]);

  return (
    <div
      style={{
        position: "fixed", top: 48, left: 0, right: 0,
        height: 2, zIndex: 99,
        background: "rgba(0,212,255,0.08)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%", width: `${pct}%`,
          background: "linear-gradient(90deg, #00D4FF, rgba(0,212,255,0.6))",
          boxShadow: "0 0 8px rgba(0,212,255,0.7)",
          transition: "width 0.08s linear",
        }}
      />
    </div>
  );
};

/* ─── Konami easter egg screen ───────────────────────────────── */
const KONAMI_SEQ = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

const KonamiScreen = ({ active }) => {
  if (!active) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 11000,
        background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace",
        animation: "konamiIn 0.25s ease",
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage:
          "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 2rem" }}>
        <div style={{ color: "#3D5166", fontSize: "0.6rem", letterSpacing: "0.3em", marginBottom: "2rem" }}>
          ▓▒░ SECURITY OVERRIDE DETECTED ░▒▓
        </div>
        <div
          style={{
            fontSize: "clamp(2rem,8vw,4rem)",
            fontWeight: 700,
            color: "#00D4FF",
            letterSpacing: "0.25em",
            textShadow: "0 0 60px rgba(0,212,255,0.9), 0 0 120px rgba(0,212,255,0.4)",
            animation: "glitchText 0.18s infinite",
            lineHeight: 1.15,
          }}
        >
          ACCESS
        </div>
        <div
          style={{
            fontSize: "clamp(2rem,8vw,4rem)",
            fontWeight: 700,
            color: "#00D4FF",
            letterSpacing: "0.25em",
            textShadow: "0 0 60px rgba(0,212,255,0.9), 0 0 120px rgba(0,212,255,0.4)",
            lineHeight: 1.15,
          }}
        >
          GRANTED
        </div>
        <div style={{ marginTop: "2.5rem", color: "#00FF88", fontSize: "0.7rem", letterSpacing: "0.2em" }}>
          ✓  KONAMI SEQUENCE VERIFIED
        </div>
        <div style={{ marginTop: "0.6rem", color: "#3D5166", fontSize: "0.58rem", letterSpacing: "0.12em" }}>
          Welcome back, Commander Harit
        </div>
      </div>
    </div>
  );
};

/* ─── Terminal FAB ───────────────────────────────────────────── */
const TerminalFAB = ({ onClick }) => (
  <button
    onClick={onClick}
    title="Open Terminal  ( ` key )"
    style={{
      position: "fixed", bottom: 46, right: 14, zIndex: 60,
      width: 36, height: 36, borderRadius: 4,
      background: "rgba(0,212,255,0.07)",
      border: "1px solid rgba(0,212,255,0.28)",
      cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#00D4FF", fontSize: "0.7rem",
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: "0.05em",
      transition: "background 0.2s, box-shadow 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "rgba(0,212,255,0.15)";
      e.currentTarget.style.boxShadow  = "0 0 16px rgba(0,212,255,0.25)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(0,212,255,0.07)";
      e.currentTarget.style.boxShadow  = "none";
    }}
  >
    &gt;_
  </button>
);

/* ─── Profile layout ─────────────────────────────────────────── */
const ProfileLayout = ({ children }) => {
  const isMobile   = useIsMobile();
  const mainRef    = useRef(null);
  const konamiRef  = useRef(0);

  const [termOpen,    setTermOpen]    = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);

  /* Backtick key → open/close terminal */
  useEffect(() => {
    const handle = (e) => {
      if (e.key !== "`") return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      setTermOpen(v => !v);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  /* Konami code listener */
  useEffect(() => {
    const handle = (e) => {
      const key = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)
        ? e.key
        : e.key.toLowerCase();
      if (key === KONAMI_SEQ[konamiRef.current]) {
        konamiRef.current++;
        if (konamiRef.current === KONAMI_SEQ.length) {
          konamiRef.current = 0;
          setKonamiActive(true);
          setTimeout(() => setKonamiActive(false), 3500);
        }
      } else {
        konamiRef.current = key === KONAMI_SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const closeTerminal = useCallback(() => setTermOpen(false), []);

  return (
    <div
      className="scan-lines"
      style={{
        minHeight: "100vh",
        background: "#030C1A",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <CosmosBackground />
      <CursorTrail />

      <div style={{ position: "relative", zIndex: 10 }}>
        <ProfileNavbar />
      </div>

      <ScrollProgress mainRef={mainRef} />

      <main
        ref={mainRef}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: isMobile ? "1.25rem 1rem 3.5rem" : "2rem 5rem 3.5rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        {children}
      </main>

      <SiteFooter />

      {!isMobile && <TerminalFAB onClick={() => setTermOpen(true)} />}

      <TerminalCLI open={termOpen} onClose={closeTerminal} />
      <KonamiScreen active={konamiActive} />
    </div>
  );
};

export default ProfileLayout;
