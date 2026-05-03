import React, { useRef, useState } from "react";
import PageHeader from "../page_header";
import useIsMobile from "../../utils/useIsMobile";

const RECORDS = [
  {
    id: "EDU-001",
    degree: "B.Tech — Information Technology",
    institution: "GGSIPU",
    location: "New Delhi",
    url: "https://www.ipu.ac.in",
    duration: "Jan 2021 — Jun 2024",
    grade: "GPA: 9.36",
    achievement: "Academic Scholar",
    modules: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java)",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Software Engineering",
      "Web Technologies",
      "Machine Learning",
    ],
  },
  {
    id: "EDU-002",
    degree: "HSC — PCM",
    institution: "DPS",
    location: "Bikaner",
    url: "http://dpisbikaner.com/",
    duration: "Mar 2018 — Apr 2020",
    grade: "PCM",
    achievement: null,
    modules: [
      "Physics — Mechanics & Electromagnetism",
      "Chemistry — Organic & Physical",
      "Mathematics — Calculus & Algebra",
      "Computer Science fundamentals",
    ],
  },
  {
    id: "EDU-003",
    degree: "SSC",
    institution: "RSV",
    location: "Bikaner",
    url: "https://rsvschool.com/",
    duration: "Mar 2016 — Apr 2018",
    grade: "SSC",
    achievement: null,
    modules: ["Mathematics", "Science", "English", "Social Studies"],
  },
];

const Educationpage = () => {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const detailRef = useRef(null);
  const rec = RECORDS[active];

  const handleSelect = (i) => {
    setActive(i);
    if (isMobile && detailRef.current) {
      setTimeout(() => detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }
  };

  return (
    <PageHeader heading="Academic Records" headingId="03">
      <div
        style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: "column",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
          gap: isMobile ? "1rem" : "1.5rem",
          alignItems: "start",
        }}
      >
        {/* list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {RECORDS.map((r, i) => (
            <div
              key={r.id}
              onClick={() => handleSelect(i)}
              style={{
                border: `1px solid ${active === i ? "rgba(0,212,255,0.4)" : "rgba(0,212,255,0.1)"}`,
                borderRadius: "5px",
                padding: "0.75rem 1rem",
                cursor: "pointer",
                background: active === i ? "rgba(0,212,255,0.04)" : "rgba(6,15,30,0.6)",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: "0.6rem", color: "#3D5166", letterSpacing: "0.1em" }}>[{r.id}]</span>
              <div style={{ fontSize: "0.8rem", color: active === i ? "#00D4FF" : "#C8D8E8", fontWeight: 600, marginTop: "0.15rem" }}>
                {r.degree}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#8892B0", marginTop: "0.1rem" }}>
                <a href={r.url} target="_blank" rel="noreferrer" style={{ color: "#00D4FF" }}>
                  {r.institution}
                </a>{" "}— {r.location}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
                <span style={{ fontSize: "0.65rem", color: "#3D5166" }}>{r.duration}</span>
                {r.achievement && (
                  <span style={{ fontSize: "0.6rem", color: "#F6C90E", border: "1px solid rgba(246,201,14,0.3)", padding: "0.1rem 0.4rem", borderRadius: "2px" }}>
                    🏆 {r.achievement}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* detail */}
        <div ref={detailRef} className="term-window" style={{ position: isMobile ? "static" : "sticky", top: "100px" }}>
          <div className="term-titlebar">
            <span className="term-dot" style={{ background: "#FF4444" }} />
            <span className="term-dot" style={{ background: "#F6C90E" }} />
            <span className="term-dot" style={{ background: "#00FF88" }} />
            <span style={{ marginLeft: "0.5rem" }}>
              academics/{rec.id.toLowerCase()}.json
            </span>
          </div>
          <div className="term-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ fontSize: "0.7rem", color: "#3D5166" }}>
              $ cat academics/{rec.id.toLowerCase()}.json
            </div>

            <div
              style={{
                border: "1px solid rgba(0,212,255,0.1)",
                borderRadius: "3px",
                padding: "0.8rem",
                background: "rgba(3,12,26,0.5)",
                fontSize: "0.72rem",
                lineHeight: 2,
              }}
            >
              <div>
                <span style={{ color: "#3D5166" }}>  "degree":      </span>
                <span style={{ color: "#F6C90E" }}>"{rec.degree}"</span>,
              </div>
              <div>
                <span style={{ color: "#3D5166" }}>  "institution": </span>
                <span style={{ color: "#00D4FF" }}>"{rec.institution}, {rec.location}"</span>,
              </div>
              <div>
                <span style={{ color: "#3D5166" }}>  "duration":    </span>
                <span style={{ color: "#C8D8E8" }}>"{rec.duration}"</span>,
              </div>
              <div>
                <span style={{ color: "#3D5166" }}>  "grade":       </span>
                <span style={{ color: "#00FF88" }}>"{rec.grade}"</span>
                {rec.achievement && (
                  <>
                    ,
                    <div>
                      <span style={{ color: "#3D5166" }}>  "award":       </span>
                      <span style={{ color: "#F6C90E" }}>"{rec.achievement}"</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.68rem", color: "#3D5166", marginBottom: "0.5rem" }}>
                ── modules_covered ──
              </div>
              {rec.modules.map((m, i) => (
                <div key={i} style={{ fontSize: "0.72rem", color: "#8892B0", lineHeight: 1.8, display: "flex", gap: "0.5rem" }}>
                  <span style={{ color: "#00D4FF" }}>▸</span> {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageHeader>
  );
};

export default Educationpage;
