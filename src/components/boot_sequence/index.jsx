import React, { useEffect, useState } from "react";

const LINES = [
  { text: "HARIT_OS v2.0.6  ──  MISSION CONTROL SYSTEM", type: "header" },
  { text: "POST: CPU 8-core @ 3.8GHz  RAM 16GB  OK",     type: "ok",   delay: 220 },
  { text: "Mounting React 18 fiber tree...",               type: "info", delay: 420 },
  { text: "React fiber tree           [ READY ]",          type: "ok",   delay: 580 },
  { text: "Compiling Tailwind styles  [ READY ]",          type: "ok",   delay: 720 },
  { text: "Loading i18n engine  (EN · DE · HI)",           type: "ok",   delay: 860 },
  { text: "Syncing GitHub telemetry...",                   type: "info", delay: 1020 },
  { text: "GitHub telemetry           [ SYNCED ]",         type: "ok",   delay: 1180 },
  { text: "Establishing secure session...",                type: "info", delay: 1320 },
  { text: "TLS 1.3  ECDHE-RSA-AES256  [ SECURE ]",        type: "ok",   delay: 1460 },
  { text: "Deploying portfolio payload [ LIVE ]",          type: "ok",   delay: 1580 },
  { text: "All systems nominal.  Welcome, Operator.",      type: "launch",delay: 1740 },
];

const BootSequence = ({ onComplete }) => {
  const [visible, setVisible]   = useState([]);
  const [exiting, setExiting]   = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (sessionStorage.getItem("mc_boot")) { onComplete(); return; }

    const timers = LINES.map((line, i) =>
      setTimeout(() => {
        setVisible(prev => [...prev, line]);
        if (i === LINES.length - 1) {
          setTimeout(() => {
            setExiting(true);
            setTimeout(() => {
              sessionStorage.setItem("mc_boot", "1");
              onComplete();
            }, 550);
          }, 500);
        }
      }, line.delay ?? i * 160)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      className={`boot-screen${exiting ? " boot-exit" : ""}`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        padding: isMobile ? "1.5rem 1.25rem" : "3rem 4rem",
      }}
    >
      <div style={{ maxWidth: 700, width: "100%" }}>
        <div
          className="boot-logo"
          style={{ fontSize: isMobile ? "0.95rem" : "1.3rem" }}
        >
          ▶ MISSION_CTRL.exe
        </div>

        {visible.map((line, i) => (
          <div key={i} className="boot-line">
            {line.type === "ok" && (
              <span style={{ color: "#00FF88", marginRight: "0.6rem", fontWeight: 600 }}>
                [ OK ]
              </span>
            )}
            {line.type === "launch" && (
              <span style={{ color: "#00D4FF", marginRight: "0.6rem" }}>[ ▶▶ ]</span>
            )}
            {line.type === "info" && (
              <span style={{ color: "#3D5166", marginRight: "0.6rem" }}>{" ─── "}</span>
            )}
            {line.type === "header" && (
              <span style={{ color: "#00D4FF", marginRight: "0.6rem" }}>{">>>"}</span>
            )}
            <span
              style={{
                color:
                  line.type === "header" ? "#00D4FF"
                  : line.type === "launch" ? "#C8D8E8"
                  : "#8892B0",
                fontSize: isMobile ? "0.65rem" : "0.72rem",
              }}
            >
              {line.text}
            </span>
          </div>
        ))}

        {visible.length === LINES.length && (
          <div className="boot-line" style={{ marginTop: "0.5rem" }}>
            <span className="cursor-blink" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BootSequence;
