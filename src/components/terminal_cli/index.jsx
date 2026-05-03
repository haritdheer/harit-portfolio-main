import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SESSION_START = Date.now();

const COLORS = {
  ok:   "#00D4FF",
  info: "#8892B0",
  err:  "#FF4444",
  warn: "#F6C90E",
  dim:  "#3D5166",
  cmd:  "#CCD6F6",
};

const GREETING = [
  { t: "ok",  v: "HARIT_CORE.V5 — Interactive Shell v1.0" },
  { t: "dim", v: `Initialized: ${new Date().toUTCString()}` },
  { t: "dim", v: "──────────────────────────────────────────────────────" },
  { t: "info",v: "Type  help  to see available commands." },
  { t: "dim", v: " " },
];

const PAGES = ["home", "about", "projects", "skills", "experience", "education", "contact"];

const ALL_CMDS = [
  "help", "whoami", "ls", "ls projects",
  "cat skills", "cat experience", "cat education",
  "contact", "github", "date", "uptime", "clear",
  "navigate ", "exit",
];

function buildCommands(navigate, close) {
  return {
    help: () => [
      { t: "dim", v: "┌─ COMMAND INDEX ──────────────────────────────────────┐" },
      { t: "cmd", v: "│  whoami              display operator profile         │" },
      { t: "cmd", v: "│  ls projects         list deployed repositories       │" },
      { t: "cmd", v: "│  cat skills          display tech clearances          │" },
      { t: "cmd", v: "│  cat experience      mission history                  │" },
      { t: "cmd", v: "│  cat education       academic records                 │" },
      { t: "cmd", v: "│  contact             open comm channel                │" },
      { t: "cmd", v: "│  navigate <page>     route to a page                  │" },
      { t: "cmd", v: "│  github              open GitHub profile              │" },
      { t: "cmd", v: "│  date                current UTC timestamp            │" },
      { t: "cmd", v: "│  uptime              session duration                 │" },
      { t: "cmd", v: "│  clear               clear terminal output            │" },
      { t: "cmd", v: "│  exit                close this terminal              │" },
      { t: "dim", v: "└──────────────────────────────────────────────────────┘" },
    ],
    whoami: () => [
      { t: "ok",   v: "  OPERATOR  ·  Harit Dheer" },
      { t: "info", v: "  ROLE      ·  Full Stack Developer" },
      { t: "info", v: "  CLEARANCE ·  AWS Certified · MERN · DevOps" },
      { t: "info", v: "  STATUS    ·  Open to opportunities" },
      { t: "info", v: "  LOCATION  ·  Bengaluru, India" },
      { t: "info", v: "  CHANNEL   ·  haritdheer@gmail.com" },
      { t: "info", v: "  GITHUB    ·  github.com/haritdheer" },
    ],
    ls: () => [
      { t: "dim", v: "  Tip: use  ls projects  to list repositories." },
    ],
    "ls projects": () => [
      { t: "dim",  v: "  drwxr-xr-x  haritdheer/projects/" },
      { t: "info", v: "  [1]  DevOps Utility Hub         ·  DEPLOYED  ·  2026" },
      { t: "info", v: "  [2]  Offline-First Mapping App  ·  DEPLOYED  ·  2026" },
      { t: "info", v: "  [3]  TimeWarp Browser DevTools  ·  DEPLOYED  ·  2026" },
      { t: "info", v: "  [4]  DueDash                   ·  ACTIVE    ·  2023—" },
      { t: "dim",  v: " " },
      { t: "dim",  v: "  → navigate projects  to view full details" },
    ],
    "cat skills": () => [
      { t: "ok",   v: "  LANGUAGES    TypeScript · JavaScript · Python · Java" },
      { t: "ok",   v: "  FRAMEWORKS   React · Node.js · Express · EJS" },
      { t: "ok",   v: "  DATABASES    PostgreSQL · MySQL · MongoDB · Redis" },
      { t: "ok",   v: "  DEVOPS       AWS · Docker · Linux · CI/CD · Git" },
      { t: "dim",  v: " " },
      { t: "dim",  v: "  → navigate skills  for full proficiency details" },
    ],
    "cat experience": () => [
      { t: "ok",   v: "  DueDash · Software Engineer · Aug 2023 — Present" },
      { t: "info", v: "  Full stack startup-investor deal management platform" },
      { t: "info", v: "  Node.js · SQL · EJS · REST APIs · Bitbucket CI" },
      { t: "dim",  v: " " },
      { t: "dim",  v: "  → navigate experience  for full history" },
    ],
    "cat education": () => [
      { t: "ok",   v: "  B.Tech · Computer Science & Engineering" },
      { t: "info", v: "  University Institute of Engineering & Technology" },
      { t: "info", v: "  CCSU, Meerut · 2020 — 2024" },
      { t: "dim",  v: " " },
      { t: "dim",  v: "  → navigate education  for academic records" },
    ],
    contact: () => { navigate("/contact"); close(); return []; },
    github: () => {
      window.open("https://github.com/haritdheer", "_blank");
      return [{ t: "ok", v: "  Opening github.com/haritdheer ..." }];
    },
    date: () => [{ t: "ok", v: `  ${new Date().toUTCString()}` }],
    uptime: () => {
      const s = Math.floor((Date.now() - SESSION_START) / 1000);
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      return [{ t: "ok", v: `  Session uptime: ${hh}:${mm}:${ss}` }];
    },
    "sudo make me a sandwich": () => [
      { t: "err",  v: "  sudo: Permission denied." },
      { t: "dim",  v: " " },
      { t: "ok",   v: "  Just kidding. 🥪 Here's your sandwich, operator." },
    ],
    "navigate home":       () => { navigate("/home");       close(); return []; },
    "navigate about":      () => { navigate("/about");      close(); return []; },
    "navigate projects":   () => { navigate("/projects");   close(); return []; },
    "navigate skills":     () => { navigate("/skills");     close(); return []; },
    "navigate experience": () => { navigate("/experience"); close(); return []; },
    "navigate education":  () => { navigate("/education");  close(); return []; },
    "navigate contact":    () => { navigate("/contact");    close(); return []; },
    exit:  () => { close(); return []; },
    close: () => { close(); return []; },
    quit:  () => { close(); return []; },
  };
}

const TerminalCLI = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [lines, setLines]       = useState(GREETING);
  const [input, setInput]       = useState("");
  const [history, setHistory]   = useState([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const inputRef  = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (!input) { setSuggestion(""); return; }
    const match = ALL_CMDS.find(c => c !== input && c.startsWith(input));
    setSuggestion(match ? match.slice(input.length) : "");
  }, [input]);

  const run = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory(h => [raw, ...h].slice(0, 50));
    setHistIdx(-1);
    setSuggestion("");

    const echo = { t: "dim", v: `$ ${raw}` };

    if (cmd === "clear") { setLines(GREETING); return; }

    const cmds = buildCommands(navigate, onClose);
    let output = [];

    if (cmd in cmds) {
      output = cmds[cmd]() || [];
    } else if (cmd.startsWith("navigate ")) {
      const page = cmd.slice(9).trim();
      if (PAGES.includes(page)) { navigate(`/${page}`); onClose(); return; }
      output = [
        { t: "err",  v: `  Unknown page: ${page}` },
        { t: "dim",  v: `  Available: ${PAGES.join(", ")}` },
      ];
    } else {
      output = [
        { t: "err",  v: `  Command not found: ${raw}` },
        { t: "dim",  v: "  Type  help  for available commands." },
      ];
    }

    setLines(prev => [...prev, echo, ...output, { t: "dim", v: " " }]);
  }, [navigate, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      run(input); setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(v => v + suggestion);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    } else if (e.key === "Escape") {
      onClose();
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setLines(GREETING);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "rgba(2,8,20,0.88)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        animation: "termFadeIn 0.15s ease",
      }}
    >
      <div
        style={{
          width: "min(760px, 100%)",
          height: "min(540px, 90vh)",
          background: "#020A16",
          border: "1px solid rgba(0,212,255,0.35)",
          borderRadius: "6px",
          boxShadow: "0 0 80px rgba(0,212,255,0.14), 0 0 160px rgba(0,212,255,0.06)",
          display: "flex", flexDirection: "column",
          fontFamily: "'JetBrains Mono', monospace",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div style={{
          height: 38, background: "rgba(0,212,255,0.05)",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
          display: "flex", alignItems: "center", padding: "0 1rem", gap: "0.5rem",
          flexShrink: 0, userSelect: "none",
        }}>
          {[["#FF4444", onClose], ["#F6C90E", null], ["#00FF88", null]].map(([color, fn], i) => (
            <span
              key={i} onClick={fn || undefined}
              style={{
                width: 10, height: 10, borderRadius: "50%",
                background: color, display: "inline-block",
                cursor: fn ? "pointer" : "default", flexShrink: 0,
              }}
            />
          ))}
          <span style={{ marginLeft: "0.75rem", fontSize: "0.62rem", color: "#3D5166", letterSpacing: "0.1em", flex: 1 }}>
            harit@mission-ctrl:~$
          </span>
          <span style={{ fontSize: "0.53rem", color: "#2A3A4A", letterSpacing: "0.07em" }}>
            ESC to close · Tab to autocomplete · ↑↓ history
          </span>
        </div>

        {/* Output */}
        <div
          ref={outputRef}
          style={{
            flex: 1, overflowY: "auto", padding: "0.8rem 1rem",
            display: "flex", flexDirection: "column",
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.7rem", lineHeight: 1.9,
                color: COLORS[line.t] || "#8892B0",
                whiteSpace: "pre-wrap", wordBreak: "break-all",
              }}
            >
              {line.v || " "}
            </div>
          ))}
        </div>

        {/* Input row */}
        <div style={{
          borderTop: "1px solid rgba(0,212,255,0.15)",
          padding: "0.55rem 1rem",
          display: "flex", alignItems: "center", gap: "0.5rem",
          flexShrink: 0, background: "rgba(0,212,255,0.02)",
        }}>
          <span style={{ fontSize: "0.72rem", color: "#00D4FF", flexShrink: 0 }}>❯</span>

          {/* Ghost text + real input stacked */}
          <div style={{ flex: 1, position: "relative", height: "1.1em", display: "flex", alignItems: "center" }}>
            {suggestion && (
              <div
                aria-hidden
                style={{
                  position: "absolute", inset: 0,
                  fontSize: "0.72rem", lineHeight: 1,
                  fontFamily: "'JetBrains Mono', monospace",
                  whiteSpace: "pre", pointerEvents: "none",
                  overflow: "hidden",
                }}
              >
                <span style={{ color: "transparent" }}>{input}</span>
                <span style={{ color: "#1A2D3D" }}>{suggestion}</span>
              </div>
            )}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                position: "absolute", inset: 0, width: "100%",
                background: "none", border: "none", outline: "none",
                fontSize: "0.72rem", color: "#CCD6F6",
                fontFamily: "'JetBrains Mono', monospace",
                caretColor: "#00D4FF",
              }}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalCLI;
