import React, { useState } from "react";
import PageHeader from "../page_header";

const PROJECTS = [
  {
    id: "devops-hub",
    name: "DevOps Utility Hub",
    description:
      "All-in-one DevOps workspace built out of frustration with constant tab-switching. Brings YAML/JSON validation, JWT decoding, cron testing, Docker/K8s inspection, env comparison, log analysis, and a full Postman-style API tester — into one clean dashboard.",
    status: "DEPLOYED",
    branch: "main",
    build: "passing",
    stack: ["TypeScript", "React", "Plugin Architecture", "Ctrl+K Palette", "Vercel"],
    year: "2026",
    githubUrl: "https://github.com/haritdheer/Devops-Hub",
    liveUrl: "https://devops-hub-blitzkrieg.vercel.app",
    highlights: [
      "YAML & JSON validation · JWT decoding with expiry insights",
      "Cron testing with human-readable schedules",
      "Docker & Kubernetes manifest inspection",
      "Env file comparison · Log analysis (errors, retries, patterns)",
      "cURL → fetch / axios conversion",
      "Postman-style API tester with cURL import",
      "Plugin architecture — tools auto-register across UI",
      "Ctrl+K command palette (VS Code style) · Local persistence",
    ],
    log: [
      { type: "ok",   text: "tsc — 0 errors, parser-first design validated" },
      { type: "ok",   text: "plugin registry: 8 tools auto-registered" },
      { type: "ok",   text: "Ctrl+K command palette initialised" },
      { type: "ok",   text: "local persistence layer active" },
      { type: "ok",   text: "deploy → Vercel: LIVE ✓" },
    ],
  },
  {
    id: "offline-map",
    name: "Offline-First No-Backend Mapping App",
    description:
      "Fully client-side, privacy-focused mapping application with zero backend, database, or server dependency. AES-GCM encrypted map sharing, offline PWA via Service Workers, and LZ-String-compressed shareable URLs.",
    status: "DEPLOYED",
    branch: "main",
    build: "passing",
    stack: ["JavaScript", "Leaflet.js", "PWA", "Crypto API", "LZ-String", "Service Workers"],
    year: "2026",
    githubUrl: "https://github.com/haritdheer/maps-no-db",
    liveUrl: "https://maps-no-db.vercel.app",
    highlights: [
      "Zero backend, database, or server dependency",
      "AES-GCM encryption & password-protected sharing",
      "Offline-first via Service Workers + LocalStorage auto-sync",
      "Lightweight shareable URLs via LZ-String compression",
      "OpenStreetMap + Open Routing Service for navigation",
    ],
    log: [
      { type: "ok",   text: "service worker registered — offline cache ready" },
      { type: "ok",   text: "AES-GCM encryption module initialised" },
      { type: "ok",   text: "OpenStreetMap + Open Routing Service integrated" },
      { type: "ok",   text: "LZ-String compression: URL payload reduced 78%" },
      { type: "ok",   text: "PWA manifest validated — installable" },
    ],
  },
  {
    id: "timewarp-devtools",
    name: "TimeWarp Browser DevTools",
    description:
      "Chrome extension and React dashboard that records real-time browser execution timelines. Instruments native fetch/XHR, async events, and UI interactions — full request/response inspection with performance metrics, fully local, zero backend.",
    status: "DEPLOYED",
    branch: "main",
    build: "passing",
    stack: ["TypeScript", "React", "Chrome Extensions", "Manifest V3", "postMessage API"],
    year: "2026",
    githubUrl: "https://github.com/haritdheer/Timewarp-devtools",
    liveUrl: "https://timewarp-devtools-harit.vercel.app",
    highlights: [
      "Records real-time browser execution timelines",
      "Instruments fetch/XHR, async events & UI interactions",
      "Deterministic event correlation via postMessage",
      "Full request/response inspection with perf metrics",
      "Zero backend — all data processed locally",
    ],
    log: [
      { type: "ok",   text: "tsc — 0 errors, 0 warnings" },
      { type: "ok",   text: "Chrome Manifest V3 validated" },
      { type: "ok",   text: "native fetch/XHR instrumentation active" },
      { type: "ok",   text: "postMessage event correlation established" },
      { type: "ok",   text: "deploy → Vercel: LIVE ✓" },
    ],
  },
  {
    id: "duedash",
    name: "DueDash",
    description:
      "Platform connecting startups and investors with tools for deal management, financial tracking, and investment workflows. Dynamic SSR dashboards powered by Node.js, SQL databases, and real-time data rendering.",
    status: "ACTIVE",
    branch: "main",
    build: "passing",
    stack: ["JavaScript", "Node.js", "SQL", "EJS", "REST APIs", "Bitbucket CI"],
    year: "Aug 2023 — Present",
    githubUrl: null,
    liveUrl: "https://demo.duedash.app",
    highlights: [
      "Startup-investor deal management & financial tracking",
      "Dynamic dashboards with SSR via EJS + Node.js",
      "Real-time data rendering for investment tracking",
      "SQL-based secure financial data backend",
    ],
    log: [
      { type: "ok",   text: "database migrations applied — schema v4" },
      { type: "ok",   text: "EJS templates compiled — SSR active" },
      { type: "info", text: "deal management + investment tracking modules live" },
      { type: "ok",   text: "CI pipeline (Bitbucket) — build passing" },
    ],
  },
];

const BuildBadge = ({ build }) => (
  <span
    style={{
      fontSize: "0.58rem",
      letterSpacing: "0.08em",
      padding: "0.12rem 0.45rem",
      borderRadius: "2px",
      border: `1px solid ${build === "passing" ? "rgba(0,255,136,0.3)" : "rgba(255,68,68,0.3)"}`,
      color: build === "passing" ? "#00FF88" : "#FF4444",
    }}
  >
    build {build}
  </span>
);

const StatusBadge = ({ status }) => {
  const colors = {
    DEPLOYED:  { color: "#00FF88", border: "rgba(0,255,136,0.3)" },
    ACTIVE:    { color: "#F6C90E", border: "rgba(246,201,14,0.3)" },
    THIS_SITE: { color: "#00D4FF", border: "rgba(0,212,255,0.3)" },
  };
  const c = colors[status] || colors.DEPLOYED;
  return (
    <span
      style={{
        fontSize: "0.58rem",
        letterSpacing: "0.08em",
        padding: "0.12rem 0.45rem",
        borderRadius: "2px",
        border: `1px solid ${c.border}`,
        color: c.color,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
      }}
    >
      {status === "ACTIVE" && (
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#F6C90E", boxShadow: "0 0 4px #F6C90E", display: "inline-block", flexShrink: 0 }} />
      )}
      {status === "DEPLOYED" && <span className="status-dot" style={{ width: 5, height: 5 }} />}
      {status.replace("_", " ")}
    </span>
  );
};

const ProjectCard = ({ project, featured }) => {
  const [logOpen, setLogOpen] = useState(false);
  const [tilt, setTilt]       = useState(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -5, y: dx * 5 });
  };

  const handleMouseLeave = () => setTilt(null);

  return (
    <div
      className="project-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "flex",
        flexDirection: "column",
        ...(tilt && {
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`,
          transition: "transform 0.08s ease-out, border-color 0.3s, box-shadow 0.3s",
        }),
        ...(featured && {
          border: "1px solid rgba(0,212,255,0.35)",
          boxShadow: "0 0 40px rgba(0,212,255,0.06)",
        }),
      }}
    >
      {/* header */}
      <div
        style={{
          padding: "0.9rem 1rem 0.6rem",
          borderBottom: "1px solid rgba(0,212,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div>
          <div style={{ fontSize: "0.6rem", color: "#3D5166" }}>
            haritdheer / <span style={{ color: "#3D5166" }}>{project.year}</span>
            {featured && (
              <span style={{ marginLeft: "0.5rem", color: "#F6C90E", fontSize: "0.58rem", border: "1px solid rgba(246,201,14,0.3)", padding: "0.1rem 0.4rem", borderRadius: "2px" }}>
                ★ FEATURED
              </span>
            )}
          </div>
          <div style={{ color: "#00D4FF", fontWeight: 600, fontSize: "0.88rem", marginTop: "0.15rem" }}>
            {project.name}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          <StatusBadge status={project.status} />
          <BuildBadge  build={project.build} />
        </div>
      </div>

      {/* body */}
      <div style={{ padding: "0.8rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        <p style={{ fontSize: "0.75rem", color: "#8892B0", lineHeight: 1.75, margin: 0 }}>
          {project.description}
        </p>

        {/* highlights */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          {project.highlights.map((h, i) => (
            <div key={i} style={{ fontSize: "0.68rem", color: "#8892B0", display: "flex", gap: "0.5rem" }}>
              <span style={{ color: "#00D4FF", flexShrink: 0 }}>▸</span>
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.stack.map((t) => (
            <span key={t} className="tech-tag" style={{ fontSize: "0.58rem" }}>{t}</span>
          ))}
        </div>

        {/* build log */}
        <div>
          <button
            onClick={() => setLogOpen(!logOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "0.65rem", color: "#3D5166", padding: 0,
              fontFamily: "'JetBrains Mono', monospace",
              display: "flex", alignItems: "center", gap: "0.4rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00D4FF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#3D5166")}
          >
            <span>{logOpen ? "▾" : "▸"}</span> build.log
          </button>

          {logOpen && (
            <div
              style={{
                marginTop: "0.4rem",
                background: "rgba(3,12,26,0.8)",
                border: "1px solid rgba(0,212,255,0.1)",
                borderRadius: "3px",
                padding: "0.6rem 0.8rem",
              }}
            >
              {project.log.map((l, i) => {
                const colors = { ok: "#00FF88", info: "#8892B0", warn: "#F6C90E", err: "#FF4444" };
                const prefix = { ok: "✓", info: "·", warn: "!", err: "✗" };
                return (
                  <div key={i} style={{ fontSize: "0.65rem", lineHeight: 1.75, color: colors[l.type] || "#8892B0", display: "flex", gap: "0.5rem" }}>
                    <span>{prefix[l.type]}</span>
                    <span>{l.text}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* footer */}
      <div
        style={{
          padding: "0.6rem 1rem",
          borderTop: "1px solid rgba(0,212,255,0.08)",
          display: "flex",
          justifyContent: "flex-end",
          gap: "0.5rem",
        }}
      >
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "0.65rem", color: "#3D5166", textDecoration: "none",
              padding: "0.2rem 0.55rem",
              border: "1px solid rgba(61,81,102,0.4)", borderRadius: "2px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#00D4FF"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#3D5166"; e.currentTarget.style.borderColor = "rgba(61,81,102,0.4)"; }}
          >
            Code ↗
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: "0.65rem", color: "#00D4FF", textDecoration: "none",
              padding: "0.2rem 0.55rem",
              border: "1px solid rgba(0,212,255,0.35)", borderRadius: "2px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 10px rgba(0,212,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectsPage = () => (
  <PageHeader heading="Deployed Repositories" headingId="04">
    <div style={{ marginBottom: "1rem", fontSize: "0.72rem", color: "#3D5166" }}>
      <span style={{ color: "#00D4FF" }}>$</span> ls -la ~/projects/ --sort=date
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
        gap: "1rem",
      }}
    >
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.id} project={p} featured={i === 0} />
      ))}
    </div>
  </PageHeader>
);

export default ProjectsPage;
