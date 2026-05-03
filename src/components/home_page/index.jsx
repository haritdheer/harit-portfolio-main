import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuGithub, LuLinkedin, LuInstagram } from "react-icons/lu";
import useIsMobile from "../../utils/useIsMobile";

/* ─── Typewriter ─────────────────────────────────────────────── */
const ROLES = [
  "Full Stack Developer",
  "AI Specialist",
  "Cloud Architect",
  "Software Engineer",
  "AWS Practitioner",
];

const useTypewriter = (words, speed = 80, pause = 1800) => {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const delay = deleting ? speed / 2 : charIdx === current.length ? pause : speed;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setWordIdx(w => (w + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
};

/* ─── Mission log ─────────────────────────────────────────────── */
const LOG_LINES = [
  { ts: "0.00s", text: "Mapping Synaptic Weights [Confidence: 99.42%]...", color: "#8892B0" },
  { ts: "0.72s", text: "Authenticating harit@intelligence.sys",             color: "#8892B0" },
  { ts: "1.44s", text: "Calculating Trajectory Vectors...",                  color: "#8892B0" },
  { ts: "2.16s", text: "Payload Check: Integrity Verified.",                 color: "#00FF88" },
  { ts: "2.88s", text: "T-Minus 0: Igniting Engine...",                      color: "#F6C90E" },
  { ts: "3.60s", text: "Ready for Uplink.",                                  color: "#00D4FF" },
];

const MissionLog = () => {
  const [visible, setVisible]       = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [cycle, setCycle]           = useState(0);

  useEffect(() => {
    let cancelled = false;
    setVisible([]);
    setShowPrompt(false);

    (async () => {
      for (let i = 0; i < LOG_LINES.length; i++) {
        await new Promise(r => setTimeout(r, 700));
        if (cancelled) return;
        setVisible(v => [...v, LOG_LINES[i]]);
      }
      await new Promise(r => setTimeout(r, 500));
      if (!cancelled) setShowPrompt(true);
      await new Promise(r => setTimeout(r, 4500));
      if (!cancelled) setCycle(c => c + 1);
    })();

    return () => { cancelled = true; };
  }, [cycle]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem", minHeight: 185 }}>
      {visible.map((line, i) => (
        <div
          key={`${cycle}-${i}`}
          style={{
            display: "flex",
            gap: "0.6rem",
            fontSize: "0.68rem",
            lineHeight: 1.95,
            animation: "lineIn 0.18s ease forwards",
          }}
        >
          <span style={{ color: "#3D5166", flexShrink: 0 }}>[{line.ts}]</span>
          <span style={{ color: line.color }}>{line.text}</span>
        </div>
      ))}
      {showPrompt && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.72rem",
            marginTop: "0.25rem",
            animation: "lineIn 0.18s ease forwards",
          }}
        >
          <span style={{ color: "#00D4FF", fontWeight: 600 }}>harit@mission_control:~$</span>
          <span className="cursor-blink" />
        </div>
      )}
    </div>
  );
};

/* ─── Live metric bar ─────────────────────────────────────────── */
const MetricBar = ({ label, base, color, variance = 8 }) => {
  const [value,    setValue]    = useState(base);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setAnimated(true), 400);
    const id  = setInterval(() => {
      setValue(Math.min(99, Math.max(5, base + (Math.random() - 0.5) * variance * 2)));
    }, 2800);
    return () => { clearTimeout(t0); clearInterval(id); };
  }, [base, variance]);

  return (
    <div style={{ marginBottom: "0.9rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
        <span style={{ fontSize: "0.6rem", color: "#3D5166", letterSpacing: "0.1em" }}>{label}</span>
        <span style={{ fontSize: "0.6rem", color, fontWeight: 600 }}>{Math.round(value)}%</span>
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: animated ? `${Math.round(value)}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}66)`,
            boxShadow: `0 0 8px ${color}77`,
            borderRadius: "2px",
            transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
};

/* ─── Right panel ─────────────────────────────────────────────── */
const RightPanel = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <div className="term-window mc-panel-glow">
      <div className="term-titlebar">
        <span className="term-dot" style={{ background: "#FF4444" }} />
        <span className="term-dot" style={{ background: "#F6C90E" }} />
        <span className="term-dot" style={{ background: "#00FF88" }} />
        <span style={{ marginLeft: "0.5rem" }}>mission_log.sys</span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span className="status-dot" style={{ width: 5, height: 5 }} />
          <span style={{ fontSize: "0.6rem", color: "#00FF88" }}>LIVE</span>
        </span>
      </div>
      <div className="term-body"><MissionLog /></div>
    </div>

    <div className="term-window">
      <div className="term-titlebar">
        <span className="term-dot" style={{ background: "#FF4444" }} />
        <span className="term-dot" style={{ background: "#F6C90E" }} />
        <span className="term-dot" style={{ background: "#00FF88" }} />
        <span style={{ marginLeft: "0.5rem" }}>sys_metrics.conf</span>
      </div>
      <div className="term-body" style={{ paddingBottom: "0.9rem" }}>
        <div style={{ fontSize: "0.63rem", color: "#3D5166", marginBottom: "1rem" }}>
          <span style={{ color: "#00D4FF" }}>$</span> watch -n 3 cat /proc/metrics
        </div>
        <MetricBar label="ORBITAL_VELOCITY"  base={94} color="#00FF88" variance={4} />
        <MetricBar label="PAYLOAD_BALANCE"   base={74} color="#00D4FF" variance={6} />
        <MetricBar label="FUEL_OPTIMIZATION" base={44} color="#9B5CF6" variance={9} />
        <MetricBar label="SIGNAL_STRENGTH"   base={22} color="#CC44FF" variance={7} />
      </div>
    </div>
  </div>
);

/* ─── Homepage ────────────────────────────────────────────────── */
const Homepage = () => {
  const navigate  = useNavigate();
  const isMobile  = useIsMobile();
  const role      = useTypewriter(ROLES);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPrompt(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 90px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: isMobile ? "1.25rem" : "1.8rem",
        paddingTop: isMobile ? "1rem" : "2rem",
        paddingBottom: isMobile ? "1.5rem" : "2rem",
      }}
    >
      {/* ── Two-column grid (stacks on mobile) ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? "1rem" : "1.5rem",
          alignItems: "stretch",
        }}
      >
        {/* LEFT — identity terminal */}
        <div className="term-window mc-panel-glow">
          <div className="term-titlebar">
            <span className="term-dot" style={{ background: "#FF4444" }} />
            <span className="term-dot" style={{ background: "#F6C90E" }} />
            <span className="term-dot" style={{ background: "#00FF88" }} />
            <span style={{ marginLeft: "0.5rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {isMobile ? "~/harit.dheer" : "operator@mission-ctrl: ~/harit.dheer"}
            </span>
            <span style={{ marginLeft: "auto", flexShrink: 0 }}>bash</span>
          </div>

          <div className="term-body" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ fontSize: "0.68rem", color: "#3D5166" }}>
              # HARIT_OS v2.0.6 — identity manifest loaded
            </div>
            <div style={{ fontSize: "0.75rem", color: "#00D4FF" }}>$ cat identity.cfg</div>

            <div style={{ marginTop: "0.3rem", paddingLeft: "0.5rem", borderLeft: "2px solid rgba(0,212,255,0.2)" }}>
              <div style={{ fontSize: "0.65rem", color: "#3D5166", marginBottom: "0.6rem" }}>
                Hi, my name is
              </div>
              <h1
                style={{
                  fontSize: isMobile ? "clamp(1.8rem, 9vw, 2.6rem)" : "clamp(1.8rem, 4vw, 3.6rem)",
                  fontWeight: 700,
                  color: "#E2E8F0",
                  letterSpacing: "0.03em",
                  lineHeight: 1.1,
                  marginBottom: "0.45rem",
                }}
                className="glitch-hover"
              >
                Harit Dheer<span style={{ color: "#00D4FF" }}>.</span>
              </h1>

              <h2
                style={{
                  fontSize: isMobile ? "clamp(0.85rem, 4vw, 1.1rem)" : "clamp(0.85rem, 2vw, 1.45rem)",
                  color: "#4A5A6A",
                  letterSpacing: "0.03em",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.3rem",
                }}
              >
                <span style={{ color: "#8892B0" }}>ROLE::</span>
                <span style={{ color: "#00D4FF" }}>{role}</span>
                <span className="cursor-blink" />
              </h2>

              <p style={{ fontSize: isMobile ? "0.74rem" : "0.76rem", color: "#8892B0", lineHeight: 1.8 }}>
                Full Stack Developer &amp; AI Specialist building scalable
                applications, intuitive interfaces, and robust backend systems.
                Passionate about cloud architecture and the limits of what software can do.
              </p>
            </div>

            <div style={{ fontSize: "0.75rem", color: "#00D4FF" }}>
              {prompt && (
                <span>
                  $ <span style={{ color: "#3D5166" }}>run --profile --interactive</span>
                  <span className="cursor-blink" />
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.7rem", marginTop: "0.6rem", flexWrap: "wrap" }}>
              <button className="mc-btn" onClick={() => navigate("/about")} style={{ fontSize: "0.7rem" }}>
                ▶ EXPLORE PROFILE
              </button>
              <button
                className="mc-btn"
                onClick={() => navigate("/contact")}
                style={{ fontSize: "0.7rem", borderColor: "rgba(0,212,255,0.25)", color: "#8892B0" }}
              >
                ⟶ OPEN CHANNEL
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — mission log + metrics */}
        <RightPanel />
      </div>

      {/* ── Status row ── */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span className="status-dot" />
          <span style={{ fontSize: "0.62rem", color: "#3D5166", letterSpacing: "0.08em" }}>
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>
        <div style={{ height: "1px", flex: 1, background: "rgba(0,212,255,0.07)", minWidth: 20 }} />
        <div style={{ display: "flex", gap: "1rem" }}>
          {[
            { icon: <LuGithub size={14} />,   href: "https://github.com/haritdheer" },
            { icon: <LuLinkedin size={14} />,  href: "https://linkedin.com/in/harit-dheer-612a28203" },
            { icon: <LuInstagram size={14} />, href: "https://instagram.com/harit_dheer" },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer"
              style={{ color: "#3D5166", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00D4FF")}
              onMouseLeave={e => (e.currentTarget.style.color = "#3D5166")}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── Quick stats ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : "repeat(auto-fit, minmax(120px, 1fr))",
          gap: isMobile ? "0.5rem" : "0.6rem",
        }}
      >
        {[
          { label: "EXPERIENCE", value: "1+ yrs" },
          { label: "COMPANIES",  value: "3" },
          { label: "TECH_STACK", value: "MERN+TS" },
          { label: "LOCATION",   value: "Bengaluru" },
        ].map(stat => (
          <div
            key={stat.label}
            style={{
              border: "1px solid rgba(0,212,255,0.09)",
              borderRadius: "4px",
              padding: isMobile ? "0.5rem 0.7rem" : "0.55rem 0.8rem",
              background: "rgba(3,12,26,0.45)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div style={{ fontSize: "0.52rem", color: "#3D5166", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "0.78rem", color: "#00D4FF", fontWeight: 600 }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
