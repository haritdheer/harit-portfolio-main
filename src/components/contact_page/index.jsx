import React, { useState, useRef, useEffect } from "react";
import PageHeader from "../page_header";
import useIsMobile from "../../utils/useIsMobile";
import { DiscCanvas, useVisitorCount, SignalBars } from "../signal_dish";

const VisitorPanel = () => {
  const { display, status } = useVisitorCount();
  const [sigStrength, setSigStrength] = useState(4);

  useEffect(() => {
    const id = setInterval(() => setSigStrength(Math.floor(Math.random() * 2) + 3), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="term-window mc-panel-glow">
      <div className="term-titlebar">
        <span className="term-dot" style={{ background: "#FF4444" }} />
        <span className="term-dot" style={{ background: "#F6C90E" }} />
        <span className="term-dot" style={{ background: "#00FF88" }} />
        <span style={{ marginLeft: "0.5rem" }}>signal_dish.3d</span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span
            style={{
              display: "inline-block", width: 5, height: 5, borderRadius: "50%",
              background: "#00D4FF", boxShadow: "0 0 6px #00D4FF",
              animation: "pulseDot 2.5s ease-in-out infinite",
            }}
          />
          <span style={{ fontSize: "0.56rem", color: "#00D4FF" }}>BROADCASTING</span>
        </span>
      </div>

      {/* 3D disc animation */}
      <div style={{ background: "rgba(2,10,22,0.7)", borderBottom: "1px solid rgba(0,212,255,0.08)" }}>
        <DiscCanvas />
      </div>

      {/* stats row */}
      <div
        style={{
          padding: "0.75rem 1.25rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
        }}
      >
        {/* Visitor count */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.5rem", color: "#3D5166", letterSpacing: "0.12em" }}>TOTAL_VISITORS</span>
            {status === "live" && (
              <span style={{ fontSize: "0.45rem", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.35)", borderRadius: 2, padding: "0.05rem 0.3rem", letterSpacing: "0.1em" }}>LIVE</span>
            )}
            {status === "offline" && (
              <span style={{ fontSize: "0.45rem", color: "#3D5166", border: "1px solid rgba(61,81,102,0.4)", borderRadius: 2, padding: "0.05rem 0.3rem", letterSpacing: "0.1em" }}>CACHED</span>
            )}
          </div>
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#00D4FF",
              letterSpacing: "0.06em",
              textShadow: "0 0 20px rgba(0,212,255,0.45)",
              lineHeight: 1,
            }}
          >
            {display != null ? display.toLocaleString() : <span className="cursor-blink" style={{ width: "0.4em", height: "1em" }} />}
          </span>
          <span style={{ fontSize: "0.48rem", color: "#3D5166" }}>unique sessions tracked</span>
        </div>

        {/* Signal + uptime */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          <div>
            <span style={{ fontSize: "0.5rem", color: "#3D5166", letterSpacing: "0.1em", display: "block", marginBottom: "0.3rem" }}>
              SIGNAL_STRENGTH
            </span>
            <SignalBars strength={sigStrength} />
          </div>
          <div>
            <span style={{ fontSize: "0.5rem", color: "#3D5166", letterSpacing: "0.1em", display: "block", marginBottom: "0.15rem" }}>
              CHANNEL_STATUS
            </span>
            <span style={{ fontSize: "0.6rem", color: "#00D4FF" }}>OPEN ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Contact page ──────────────────────────────────────────────── */
const Contactpage = () => {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [stage, setStage] = useState("idle");
  const [errors, setErrors] = useState({});
  const rocketRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "NAME required";
    if (!form.email.trim())   e.email   = "EMAIL required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email format";
    if (!form.message.trim()) e.message = "MESSAGE required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStage("launching");
    setTimeout(() => {
      setStage("sent");
      const subject = encodeURIComponent(`Message from ${form.name}`);
      const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      window.open(`mailto:haritdheer@gmail.com?subject=${subject}&body=${body}`, "_blank");
    }, 1600);
  };

  const Field = ({ id, label, value, type = "text", multiline }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
      <label htmlFor={id} style={{ fontSize: "0.68rem", color: "#3D5166", letterSpacing: "0.1em" }}>
        <span style={{ color: "#00D4FF" }}>$</span> {label}
      </label>
      {multiline ? (
        <textarea
          id={id} className="mc-textarea" rows={4}
          placeholder={`Enter ${label.toLowerCase()}...`}
          value={value}
          onChange={(e) => setForm({ ...form, [id]: e.target.value })}
          disabled={stage !== "idle"}
        />
      ) : (
        <input
          id={id} type={type} className="mc-input"
          placeholder={`Enter ${label.toLowerCase()}...`}
          value={value}
          onChange={(e) => setForm({ ...form, [id]: e.target.value })}
          disabled={stage !== "idle"}
        />
      )}
      {errors[id] && <span style={{ fontSize: "0.62rem", color: "#FF4444" }}>⚠ {errors[id]}</span>}
    </div>
  );

  return (
    <PageHeader heading="Open a Comm Channel" headingId="06">
      <div
        style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: "column",
          gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)",
          gap: isMobile ? "1rem" : "2rem",
          alignItems: "start",
        }}
      >
        {/* ── Left: form ── */}
        <div className="term-window mc-panel-glow">
          <div className="term-titlebar">
            <span className="term-dot" style={{ background: "#FF4444" }} />
            <span className="term-dot" style={{ background: "#F6C90E" }} />
            <span className="term-dot" style={{ background: "#00FF88" }} />
            <span style={{ marginLeft: "0.5rem" }}>contact.sh</span>
            <span style={{ marginLeft: "auto" }}>
              {stage === "idle"      && <span style={{ color: "#3D5166" }}>READY</span>}
              {stage === "launching" && <span style={{ color: "#F6C90E" }}>TRANSMITTING...</span>}
              {stage === "sent"      && <span style={{ color: "#00FF88" }}>SIGNAL SENT</span>}
            </span>
          </div>

          <div className="term-body" style={{ position: "relative" }}>
            {stage === "sent" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem 0", textAlign: "center" }}>
                <div style={{ fontSize: "3rem" }}>✅</div>
                <div style={{ color: "#00FF88", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.1em" }}>TRANSMISSION COMPLETE</div>
                <div style={{ fontSize: "0.75rem", color: "#8892B0", maxWidth: 320 }}>
                  Your message has been encoded and launched into the ether. Expect a response within 24 standard cycles.
                </div>
                <button
                  className="mc-btn"
                  style={{ marginTop: "0.5rem" }}
                  onClick={() => { setStage("idle"); setForm({ name: "", email: "", message: "" }); }}
                >
                  ↩ NEW TRANSMISSION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ fontSize: "0.7rem", color: "#3D5166" }}>
                  # ESTABLISH_COMM_CHANNEL — fill all fields to transmit
                </div>
                <Field id="name"    label="OPERATOR_NAME"  value={form.name} />
                <Field id="email"   label="COMM_ADDRESS"   value={form.email} type="email" />
                <Field id="message" label="SIGNAL_PAYLOAD" value={form.message} multiline />
                <div style={{ display: "inline-flex" }}>
                  <button
                    type="submit"
                    className="mc-btn"
                    style={{ fontSize: "0.8rem", letterSpacing: "0.12em", display: "flex", alignItems: "center", gap: "0.5rem" }}
                    disabled={stage === "launching"}
                  >
                    {stage === "launching" ? "LAUNCHING..." : (
                      <>
                        <span ref={rocketRef} className={stage === "launching" ? "rocket-fly" : ""} style={{ display: "inline-block", fontSize: "1rem" }}>
                          🚀
                        </span>
                        LAUNCH MESSAGE
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── Right: 3D disc + contact info ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <VisitorPanel />

          {/* Contact info */}
          <div className="term-window">
            <div className="term-titlebar">
              <span className="term-dot" style={{ background: "#FF4444" }} />
              <span className="term-dot" style={{ background: "#F6C90E" }} />
              <span className="term-dot" style={{ background: "#00FF88" }} />
              <span style={{ marginLeft: "0.5rem" }}>comm_node.cfg</span>
            </div>
            <div className="term-body" style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ fontSize: "0.7rem", color: "#8892B0", lineHeight: 1.8 }}>
                My inbox is always open — whether it&apos;s an opportunity or just a hello.
              </div>
              {[
                { label: "PRIMARY_CHANNEL", val: "haritdheer@gmail.com",       href: "mailto:haritdheer@gmail.com" },
                { label: "GITHUB",          val: "github.com/haritdheer",       href: "https://github.com/haritdheer" },
                { label: "LINKEDIN",        val: "harit-dheer-612a28203",       href: "https://linkedin.com/in/harit-dheer-612a28203" },
              ].map((c) => (
                <div key={c.label}>
                  <div style={{ fontSize: "0.58rem", color: "#3D5166", letterSpacing: "0.1em", marginBottom: "0.12rem" }}>{c.label}</div>
                  <a
                    href={c.href} target="_blank" rel="noreferrer"
                    style={{ fontSize: "0.72rem", color: "#00D4FF", textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.textShadow = "0 0 8px rgba(0,212,255,0.6)")}
                    onMouseLeave={(e) => (e.currentTarget.style.textShadow = "none")}
                  >
                    {c.val}
                  </a>
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.25rem" }}>
                <span
                  style={{
                    display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                    background: "#00D4FF", boxShadow: "0 0 6px #00D4FF",
                    animation: "pulseDot 2.5s ease-in-out infinite",
                  }}
                />
                <span style={{ fontSize: "0.65rem", color: "#3D5166" }}>Response time: &lt; 24h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageHeader>
  );
};

export default Contactpage;
