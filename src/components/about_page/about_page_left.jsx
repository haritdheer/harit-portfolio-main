import React from "react";

const AboutPageLeft = () => {
  const techStack = [
    "React.js", "Next.js", "Node.js", "ExpressJS", "JavaScript",
    "TypeScript", "Java", "C/C++", "GraphQL", "EJS",
    "PostgreSQL", "MySQL", "MS-SQL", "Docker", "Kubernetes",
    "OpenShift", "Azure", "Git", "Swagger", "Postman",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 720 }}>
      {/* File path prompt */}
      <div style={{ fontSize: "0.68rem", color: "#3D5166", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span style={{ color: "#00D4FF" }}>$</span>
        <span>cat</span>
        <span style={{ color: "#C8D8E8" }}>about/harit.md</span>
      </div>

      {/* Content terminal card */}
      <div className="term-window mc-panel-glow">
        <div className="term-titlebar">
          <span className="term-dot" style={{ background: "#FF4444" }} />
          <span className="term-dot" style={{ background: "#F6C90E" }} />
          <span className="term-dot" style={{ background: "#00FF88" }} />
          <span style={{ marginLeft: "0.5rem" }}>about/harit.md</span>
        </div>
        <div className="term-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.85, color: "#8892B0", margin: 0 }}>
            Versatile developer with a Bachelor&apos;s in Information Technology, distinguished for collaborative
            skills and a track record of independently delivering impactful results. Ample experience in
            full-stack development, delivering well-documented, tested, and operable code.
          </p>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.85, color: "#8892B0", margin: 0 }}>
            Currently leading frontend development for{" "}
            <span style={{ color: "#00D4FF" }}>Medanta Healthcare</span> applications at{" "}
            <span style={{ color: "#00D4FF" }}>THB / Sekhmet Technologies</span>.
            Previously built{" "}
            <span style={{ color: "#00D4FF" }}>DueDash</span> — a startup-investor platform — at Modgenics.
            Efficient in collaborating and communicating new ideas and opinions across distributed teams.
          </p>
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <div style={{ fontSize: "0.68rem", color: "#3D5166", marginBottom: "0.8rem" }}>
          <span style={{ color: "#00D4FF" }}>$</span> ls tech_stack/ --all
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {techStack.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>

      {/* Quick facts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(170px, 100%), 1fr))",
          gap: "0.6rem",
        }}
      >
        {[
          { key: "LOCATION",     val: "Bengaluru, Karnataka" },
          { key: "CURRENT_ROLE", val: "Software Developer-I @ THB" },
          { key: "EDUCATION",    val: "B.Tech IT — GGSIPU (GPA 9.36)" },
          { key: "AWARDS",       val: "4★ CodeChef · Academic Scholar" },
          { key: "PHONE",        val: "+91-8302305731" },
          { key: "EMAIL",        val: "haritdheer@gmail.com" },
        ].map((f) => (
          <div
            key={f.key}
            style={{
              border: "1px solid rgba(0,212,255,0.1)",
              borderRadius: "3px",
              padding: "0.6rem 0.8rem",
              background: "rgba(6,15,30,0.6)",
            }}
          >
            <div style={{ fontSize: "0.58rem", color: "#3D5166", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>
              {f.key}
            </div>
            <div style={{ fontSize: "0.72rem", color: "#C8D8E8" }}>{f.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPageLeft;
