import React, { useEffect, useState } from "react";
import { LuGitBranch, LuActivity, LuZap } from "react-icons/lu";
import useIsMobile from "../../utils/useIsMobile";

const BAR_COUNT = 14;

const FrequencyBars = () => {
  const [heights, setHeights] = useState(() =>
    Array.from({ length: BAR_COUNT }, () => Math.floor(Math.random() * 8) + 2)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setHeights(prev =>
        prev.map((h) => {
          const delta = Math.floor(Math.random() * 5) - 2;
          return Math.max(2, Math.min(10, h + delta));
        })
      );
    }, 140);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: 18 }}>
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: h * 1.7,
            background: i % 3 === 0 ? "#00D4FF" : "rgba(0,212,255,0.45)",
            boxShadow: i % 3 === 0 ? "0 0 4px rgba(0,212,255,0.6)" : "none",
            borderRadius: 1,
            transition: "height 0.12s ease",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
};

const UptimeClock = () => {
  const [sec, setSec] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(Math.floor(sec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return <span>{hh}:{mm}:{ss}</span>;
};

const Latency = () => {
  const [ms, setMs] = useState(17);
  useEffect(() => {
    const id = setInterval(() => setMs(Math.floor(Math.random() * 22) + 8), 2200);
    return () => clearInterval(id);
  }, []);
  return <span>{ms}MS</span>;
};

const UtcClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, "0");
      const mm = String(now.getUTCMinutes()).padStart(2, "0");
      const ss = String(now.getUTCSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time} UTC</span>;
};

const VSep = () => (
  <div style={{ width: 1, height: 18, background: "rgba(0,212,255,0.12)", flexShrink: 0 }} />
);

const SiteFooter = () => {
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(3,12,26,0.96)",
        borderTop: "1px solid rgba(0,212,255,0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        height: isMobile ? "auto" : 36,
        display: "flex",
        alignItems: "center",
        padding: isMobile ? "0.45rem 1rem" : "0 1.5rem",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "0.6rem" : "1rem",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        {/* ── Left: status badges ── */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.55rem" : "0.8rem", flexWrap: "wrap" }}>
          <div
            style={{
              border: "1px solid rgba(0,212,255,0.55)",
              borderRadius: 3,
              padding: "0.08rem 0.45rem",
              fontSize: "0.56rem",
              color: "#00D4FF",
              letterSpacing: "0.12em",
              boxShadow: "0 0 8px rgba(0,212,255,0.15)",
              fontWeight: 700,
            }}
          >
            PROD
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span
              style={{
                display: "inline-block", width: 5, height: 5, borderRadius: "50%",
                background: "#00D4FF", boxShadow: "0 0 6px #00D4FF",
                animation: "pulseDot 2.5s ease-in-out infinite",
              }}
            />
            <span style={{ fontSize: "0.56rem", color: "#00D4FF", letterSpacing: "0.09em" }}>STABLE</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#3D5166" }}>
            <LuGitBranch size={10} />
            <span style={{ fontSize: "0.56rem", letterSpacing: "0.09em" }}>MAIN_V5</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.28rem" }}>
            <span style={{ color: "#00D4FF", fontSize: "0.6rem" }}>✓</span>
            <span style={{ fontSize: "0.56rem", color: "#3D5166", letterSpacing: "0.07em" }}>0 ERRORS</span>
          </div>
        </div>

        {/* ── Center: frequency sync ── */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <FrequencyBars />
            <span style={{ fontSize: "0.5rem", color: "#3D5166", letterSpacing: "0.14em" }}>FREQUENCY_SYNC</span>
          </div>
        )}

        {/* ── Right: metrics ── */}
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.6rem" : "0.9rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <LuActivity size={10} style={{ color: "#3D5166" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 1 }}>
              <span style={{ fontSize: "0.44rem", color: "#3D5166", letterSpacing: "0.1em" }}>UPTIME</span>
              <span style={{ fontSize: "0.6rem", color: "#00D4FF", fontWeight: 600 }}><UptimeClock /></span>
            </div>
          </div>

          <VSep />

          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <LuZap size={10} style={{ color: "#3D5166" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 1 }}>
              <span style={{ fontSize: "0.44rem", color: "#3D5166", letterSpacing: "0.1em" }}>LATENCY</span>
              <span style={{ fontSize: "0.6rem", color: "#00D4FF", fontWeight: 600 }}><Latency /></span>
            </div>
          </div>

          {!isMobile && (
            <>
              <VSep />
              <span style={{ fontSize: "0.6rem", color: "#8892B0", whiteSpace: "nowrap" }}><UtcClock /></span>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
