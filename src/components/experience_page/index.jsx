import React, { useRef, useState } from "react";
import PageHeader from "../page_header";
import useIsMobile from "../../utils/useIsMobile";

const MISSIONS = [
  {
    id: "SWD-001",
    role: "Software Developer-I",
    company: "THB c/o Sekhmet Technologies",
    location: "Bengaluru",
    url: "https://thb.group/",
    duration: "Oct 2024 — Present",
    status: "ACTIVE",
    stack: ["React.js", "JavaScript", "REST APIs", "State Management"],
    log: [
      { type: "ok",   text: "Led frontend for Medanta Healthcare CRM & Patient Web App" },
      { type: "ok",   text: "Built reusable UI components — reduced code duplication" },
      { type: "ok",   text: "Integrated REST APIs + dynamic state management" },
      { type: "ok",   text: "Optimised performance: minimised re-renders & API overhead" },
      { type: "info", text: "Collaborated with backend and QA for production-ready modules" },
    ],
  },
  {
    id: "SDE-002",
    role: "Software Development Engineer Intern",
    company: "Modgenics Technology Pvt. Ltd",
    location: "Hyderabad",
    url: "https://www.modgenics.co",
    duration: "Jul 2023 — Jun 2024",
    status: "COMPLETED",
    stack: ["JavaScript", "Node.js", "EJS", "SQL", "REST APIs"],
    log: [
      { type: "ok",   text: "Worked on DueDash — startup-investor platform" },
      { type: "ok",   text: "Built dynamic dashboards with EJS + Node.js SSR" },
      { type: "ok",   text: "Implemented API integrations for investment & deal tracking" },
      { type: "ok",   text: "Translated business requirements into frontend experiences" },
      { type: "info", text: "Structured reviews, debugging, perf optimisations" },
    ],
  },
  {
    id: "DEV-003",
    role: "Developer Intern",
    company: "CCBUL India",
    location: "Bengaluru",
    url: "https://ccbul.com",
    duration: "Jul 2022 — Sep 2022",
    status: "COMPLETED",
    stack: ["Java", "Node.js", "MVC", "HTML", "CSS"],
    log: [
      { type: "ok",   text: "Developed MVC-based web modules using Java & Node.js" },
      { type: "ok",   text: "Built responsive webpages and UI logic for internal tools" },
      { type: "info", text: "Assisted in debugging and performance improvements" },
    ],
  },
];

const LogLine = ({ type, text }) => {
  const prefix = { ok: "✓", info: "·", warn: "!", err: "✗" };
  const colors  = { ok: "#00FF88", info: "#8892B0", warn: "#F6C90E", err: "#FF4444" };
  return (
    <div style={{ fontSize: "0.7rem", lineHeight: 1.75, display: "flex", gap: "0.5rem", color: colors[type] || "#8892B0" }}>
      <span>{prefix[type] || "·"}</span>
      <span>{text}</span>
    </div>
  );
};

const Experiencepage = () => {
  const isMobile  = useIsMobile();
  const [active, setActive] = useState(0);
  const detailRef = useRef(null);
  const mission   = MISSIONS[active];

  const handleSelect = (i) => {
    setActive(i);
    if (isMobile && detailRef.current) {
      setTimeout(() => detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  };

  return (
    <PageHeader heading="Where I've Worked" headingId="02">
      <div
        style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: "column",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
          gap: isMobile ? "1rem" : "1.5rem",
          alignItems: "start",
        }}
      >
        {/* selector */}
        <div>
          {MISSIONS.map((m, i) => (
            <div
              key={m.id}
              onClick={() => handleSelect(i)}
              style={{
                border: `1px solid ${active === i ? "rgba(0,212,255,0.4)" : "rgba(0,212,255,0.1)"}`,
                borderRadius: "5px",
                padding: isMobile ? "0.65rem 0.85rem" : "0.75rem 1rem",
                cursor: "pointer",
                background: active === i ? "rgba(0,212,255,0.04)" : "rgba(6,15,30,0.6)",
                transition: "all 0.2s",
                marginBottom: "0.5rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.25rem" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: "0.58rem", color: "#3D5166", letterSpacing: "0.1em" }}>[{m.id}]</span>
                  <div style={{ fontSize: isMobile ? "0.78rem" : "0.82rem", color: active === i ? "#00D4FF" : "#C8D8E8", fontWeight: 600, marginTop: "0.12rem" }}>
                    {m.role}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#8892B0" }}>
                    <a href={m.url} target="_blank" rel="noreferrer" style={{ color: "#00D4FF" }}>{m.company}</a>
                    {" "}— {m.location}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem", flexShrink: 0 }}>
                  <span style={{
                    fontSize: "0.56rem", letterSpacing: "0.08em",
                    color: m.status === "ACTIVE" ? "#00FF88" : "#3D5166",
                    border: `1px solid ${m.status === "ACTIVE" ? "rgba(0,255,136,0.3)" : "rgba(61,81,102,0.4)"}`,
                    padding: "0.12rem 0.4rem", borderRadius: "2px",
                    display: "inline-flex", alignItems: "center", gap: "0.3rem",
                  }}>
                    {m.status === "ACTIVE" && <span className="status-dot" style={{ width: 5, height: 5 }} />}
                    {m.status}
                  </span>
                  <span style={{ fontSize: "0.62rem", color: "#3D5166", whiteSpace: "nowrap" }}>{m.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* detail */}
        <div
          ref={detailRef}
          className="term-window"
          style={{ position: isMobile ? "static" : "sticky", top: "100px" }}
        >
          <div className="term-titlebar">
            <span className="term-dot" style={{ background: "#FF4444" }} />
            <span className="term-dot" style={{ background: "#F6C90E" }} />
            <span className="term-dot" style={{ background: "#00FF88" }} />
            <span style={{ marginLeft: "0.5rem" }}>mission/{mission.id.toLowerCase()}.log</span>
          </div>
          <div className="term-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ fontSize: "0.68rem", color: "#3D5166" }}>
              $ cat mission/{mission.id.toLowerCase()}.log
            </div>
            <div>
              <div style={{ color: "#00D4FF", fontSize: "0.86rem", fontWeight: 600 }}>{mission.role}</div>
              <div style={{ fontSize: "0.7rem", color: "#8892B0", marginTop: "0.15rem" }}>
                {mission.company} · {mission.location}
              </div>
              <div style={{ fontSize: "0.63rem", color: "#3D5166", marginTop: "0.12rem" }}>{mission.duration}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.65rem", color: "#3D5166", marginBottom: "0.4rem" }}>── deployment log ──</div>
              {mission.log.map((l, i) => <LogLine key={i} type={l.type} text={l.text} />)}
            </div>
            <div>
              <div style={{ fontSize: "0.65rem", color: "#3D5166", marginBottom: "0.5rem" }}>── tech stack ──</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {mission.stack.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageHeader>
  );
};

export default Experiencepage;
