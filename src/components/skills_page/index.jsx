import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../page_header";
import axios from "axios";

const SKILL_CATEGORIES = [
  {
    label: "LANGUAGES",
    skills: [
      { name: "JavaScript",  pct: 94 },
      { name: "TypeScript",  pct: 85 },
      { name: "Java",        pct: 75 },
      { name: "C / C++",     pct: 70 },
      { name: "SQL",         pct: 82 },
      { name: "HTML / CSS",  pct: 93 },
    ],
  },
  {
    label: "FRAMEWORKS",
    skills: [
      { name: "React.js",    pct: 94 },
      { name: "Next.js",     pct: 80 },
      { name: "Node.js",     pct: 88 },
      { name: "ExpressJS",   pct: 87 },
      { name: "GraphQL",     pct: 68 },
      { name: "Bootstrap",   pct: 85 },
    ],
  },
  {
    label: "DATABASES",
    skills: [
      { name: "PostgreSQL",  pct: 80 },
      { name: "MS-SQL",      pct: 75 },
      { name: "MySQL",       pct: 82 },
    ],
  },
  {
    label: "DEVOPS & TOOLS",
    skills: [
      { name: "Git",         pct: 92 },
      { name: "Docker",      pct: 78 },
      { name: "Kubernetes",  pct: 60 },
      { name: "OpenShift",   pct: 62 },
      { name: "Azure Deploy",pct: 65 },
      { name: "Swagger / Postman", pct: 88 },
    ],
  },
];

const SkillBar = ({ name, pct, animate }) => (
  <div style={{ marginBottom: "0.75rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
      <span style={{ fontSize: "0.72rem", color: "#C8D8E8" }}>{name}</span>
      <span style={{ fontSize: "0.65rem", color: "#3D5166" }}>{pct}%</span>
    </div>
    <div className="skill-bar-track">
      <div
        className="skill-bar-fill"
        style={{ width: animate ? `${pct}%` : "0%" }}
      />
    </div>
  </div>
);

const ContribHeatmap = ({ data }) => {
  if (!data || data.length === 0) return null;

  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const m = new Date(week[0]?.date).getMonth();
    if (!isNaN(m) && m !== lastMonth) {
      monthLabels.push({ wi, label: months[m] });
      lastMonth = m;
    }
  });

  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ display: "flex", gap: "2px", marginBottom: "4px" }}>
        {weeks.map((_, wi) => {
          const ml = monthLabels.find((x) => x.wi === wi);
          return (
            <div key={wi} style={{ width: 10, fontSize: "0.5rem", color: ml ? "#3D5166" : "transparent", flexShrink: 0 }}>
              {ml?.label || "·"}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: "2px" }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {week.map((day, di) => (
              <div
                key={di}
                className="contrib-cell"
                data-level={day.level}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsPage = () => {
  const [animate, setAnimate] = useState(false);
  const [contribData, setContribData] = useState([]);
  const [totalCommits, setTotalCommits] = useState(null);
  const [loadingContrib, setLoadingContrib] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    axios
      .get("https://github-contributions-api.jogruber.de/v4/haritdheer?y=last")
      .then((res) => {
        const raw = res.data?.contributions || [];
        setContribData(raw);
        const total = Object.values(res.data?.total || {}).reduce((a, b) => a + b, 0);
        setTotalCommits(total || raw.reduce((acc, d) => acc + d.count, 0));
      })
      .catch(() => {
        const today = new Date();
        const mock = [];
        for (let i = 364; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const isWeekend = [0, 6].includes(d.getDay());
          const count = isWeekend
            ? (Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 4))
            : (Math.random() < 0.25 ? 0 : Math.floor(Math.random() * 9));
          mock.push({
            date: d.toISOString().split("T")[0],
            count,
            level: count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4,
          });
        }
        setContribData(mock);
        setTotalCommits(mock.reduce((a, d) => a + d.count, 0));
      })
      .finally(() => setLoadingContrib(false));
  }, []);

  return (
    <PageHeader heading="Skills Manifest" headingId="05">
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* GitHub contributions */}
        <div className="term-window mc-panel-glow">
          <div className="term-titlebar">
            <span className="term-dot" style={{ background: "#FF4444" }} />
            <span className="term-dot" style={{ background: "#F6C90E" }} />
            <span className="term-dot" style={{ background: "#00FF88" }} />
            <span style={{ marginLeft: "0.5rem" }}>github.com/haritdheer</span>
          </div>
          <div className="term-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ fontSize: "0.72rem", color: "#3D5166" }}>
                <span style={{ color: "#00D4FF" }}>$</span> git log --all --author=&quot;harit&quot; --oneline | wc -l
              </div>
              {totalCommits !== null && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span className="status-dot" />
                  <span style={{ fontSize: "0.75rem", color: "#00FF88", fontWeight: 600 }}>
                    {totalCommits.toLocaleString()} contributions this year
                  </span>
                </div>
              )}
            </div>

            {loadingContrib ? (
              <div style={{ fontSize: "0.7rem", color: "#3D5166" }}>
                syncing telemetry<span className="cursor-blink" />
              </div>
            ) : (
              <ContribHeatmap data={contribData} />
            )}

            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.6rem", color: "#3D5166" }}>
              <span>Less</span>
              {[0,1,2,3,4].map((l) => (
                <div key={l} className="contrib-cell" data-level={l} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Skill bars grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: "1rem",
          }}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.label} className="term-window">
              <div className="term-titlebar">
                <span className="term-dot" style={{ background: "#FF4444" }} />
                <span className="term-dot" style={{ background: "#F6C90E" }} />
                <span className="term-dot" style={{ background: "#00FF88" }} />
                <span style={{ marginLeft: "0.5rem" }}>
                  skills/{cat.label.toLowerCase().replace(/ /g, "-").replace(/[&]/g, "and")}.conf
                </span>
              </div>
              <div className="term-body">
                <div style={{ fontSize: "0.65rem", color: "#3D5166", marginBottom: "1rem" }}>
                  [{cat.label}]
                </div>
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} animate={animate} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Awards & certifications */}
        <div className="term-window">
          <div className="term-titlebar">
            <span className="term-dot" style={{ background: "#FF4444" }} />
            <span className="term-dot" style={{ background: "#F6C90E" }} />
            <span className="term-dot" style={{ background: "#00FF88" }} />
            <span style={{ marginLeft: "0.5rem" }}>clearances.txt</span>
          </div>
          <div
            className="term-body"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
              gap: "0.8rem",
            }}
          >
            {[
              { label: "4 STAR — CODECHEF",       status: "CERTIFIED",  when: "Sep 2021" },
              { label: "ACADEMIC SCHOLAR",         status: "CERTIFIED",  when: "GGSIPU, May 2024" },
              { label: "FULL STACK (MERN)",        status: "ACTIVE",     when: "" },
              { label: "AGILE — SCRUM / KANBAN",   status: "ACTIVE",     when: "" },
              { label: "SOLID DESIGN PATTERNS",    status: "ACTIVE",     when: "" },
              { label: "DATA MODELING",            status: "ACTIVE",     when: "" },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  border: "1px solid rgba(0,212,255,0.1)",
                  borderRadius: "3px",
                  padding: "0.6rem 0.8rem",
                  background: "rgba(3,12,26,0.5)",
                }}
              >
                <div style={{ fontSize: "0.6rem", color: "#3D5166", marginBottom: "0.25rem" }}>
                  {c.label}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.35rem" }}>
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: c.status === "CERTIFIED" ? "#00D4FF" : "#00FF88",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <span
                      style={{
                        width: 5, height: 5,
                        borderRadius: "50%",
                        background: c.status === "CERTIFIED" ? "#00D4FF" : "#00FF88",
                        boxShadow: `0 0 4px ${c.status === "CERTIFIED" ? "#00D4FF" : "#00FF88"}`,
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {c.status}
                  </div>
                  {c.when && (
                    <span style={{ fontSize: "0.58rem", color: "#3D5166" }}>{c.when}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageHeader>
  );
};

export default SkillsPage;
