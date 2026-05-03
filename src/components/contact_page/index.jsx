import React, { useState, useRef, useEffect, useCallback } from "react";
import PageHeader from "../page_header";
import useIsMobile from "../../utils/useIsMobile";

/* ─── 3D Disc / Signal Dish animation ──────────────────────────── */
const DiscCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    const RINGS = [
      { a: 120, b: 30, speed:  0.007, phase: 0,    lw: 1.2, alpha: 0.85 },
      { a:  90, b: 23, speed: -0.011, phase: 1.2,  lw: 1.0, alpha: 0.65 },
      { a: 148, b: 37, speed:  0.004, phase: 2.4,  lw: 0.7, alpha: 0.45 },
      { a:  62, b: 16, speed: -0.017, phase: 0.7,  lw: 0.8, alpha: 0.55 },
      { a: 170, b: 43, speed:  0.003, phase: 3.1,  lw: 0.5, alpha: 0.25 },
    ];

    const particles = RINGS.map(() => ({ angle: Math.random() * Math.PI * 2 }));
    let t = 0;
    let raf;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* ambient glow */
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
      bg.addColorStop(0, "rgba(0,212,255,0.05)");
      bg.addColorStop(1, "rgba(0,212,255,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* crosshair */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = "rgba(0,212,255,0.12)";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(-W, 0); ctx.lineTo(W, 0);
      ctx.moveTo(0, -H); ctx.lineTo(0, H);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      /* rings + orbital particles */
      RINGS.forEach((ring, i) => {
        const angle = ring.phase + t * ring.speed;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        /* ring */
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.a, ring.b, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${ring.alpha * 0.55})`;
        ctx.lineWidth = ring.lw;
        ctx.stroke();

        /* tick marks */
        for (let n = 0; n < 12; n++) {
          const a = (n / 12) * Math.PI * 2;
          const px = ring.a * Math.cos(a);
          const py = ring.b * Math.sin(a);
          ctx.beginPath();
          ctx.arc(px, py, n % 3 === 0 ? 1.5 : 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,212,255,${ring.alpha * (n % 3 === 0 ? 0.7 : 0.3)})`;
          ctx.fill();
        }

        /* orbital particle */
        particles[i].angle += ring.speed * 3;
        const px = ring.a * Math.cos(particles[i].angle);
        const py = ring.b * Math.sin(particles[i].angle);

        const pg = ctx.createRadialGradient(px, py, 0, px, py, 6);
        pg.addColorStop(0, "rgba(0,212,255,0.9)");
        pg.addColorStop(1, "rgba(0,212,255,0)");
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#00D4FF";
        ctx.fill();

        /* trailing tail */
        const TAIL = 8;
        for (let k = 1; k <= TAIL; k++) {
          const ta = particles[i].angle - ring.speed * 3 * k;
          const tx = ring.a * Math.cos(ta);
          const ty = ring.b * Math.sin(ta);
          ctx.beginPath();
          ctx.arc(tx, ty, 1.5 * (1 - k / TAIL), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,212,255,${0.4 * (1 - k / TAIL)})`;
          ctx.fill();
        }

        ctx.restore();
      });

      /* pulsing core */
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.045);
      const coreR = 10 + pulse * 5;

      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3);
      cg.addColorStop(0, `rgba(0,212,255,${0.7 + pulse * 0.3})`);
      cg.addColorStop(0.35, `rgba(0,212,255,${0.25 + pulse * 0.15})`);
      cg.addColorStop(1, "rgba(0,212,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(220,245,255,${0.8 + pulse * 0.2})`;
      ctx.fill();

      /* expanding pulse ring */
      const pulseRad = 18 + pulse * 90;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRad, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,212,255,${(1 - pulse) * 0.25})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      /* corner brackets */
      const bSize = 12, bPad = 6;
      ctx.strokeStyle = "rgba(0,212,255,0.35)";
      ctx.lineWidth = 1;
      [[bPad, bPad], [W - bPad, bPad], [bPad, H - bPad], [W - bPad, H - bPad]].forEach(([bx, by]) => {
        const sx = bx < W / 2 ? 1 : -1;
        const sy = by < H / 2 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(bx + sx * bSize, by);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx, by + sy * bSize);
        ctx.stroke();
      });

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={210}
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
};

/* ─── Visitor counter ───────────────────────────────────────────── */
const VISITOR_BASE = 2847;

const useVisitorCount = () => {
  const [count, setCount] = useState(VISITOR_BASE);
  const [display, setDisplay] = useState(VISITOR_BASE);

  useEffect(() => {
    let stored = parseInt(localStorage.getItem("hd_vc") || String(VISITOR_BASE), 10);
    if (!sessionStorage.getItem("hd_vs")) {
      stored += 1;
      localStorage.setItem("hd_vc", String(stored));
      sessionStorage.setItem("hd_vs", "1");
    }
    setCount(stored);

    /* animate count-up from BASE to stored */
    let cur = VISITOR_BASE;
    const diff = stored - VISITOR_BASE;
    const steps = Math.max(diff, 1);
    const id = setInterval(() => {
      cur = Math.min(cur + 1, stored);
      setDisplay(cur);
      if (cur >= stored) clearInterval(id);
    }, Math.max(20, 600 / steps));
    return () => clearInterval(id);
  }, []);

  return { count, display };
};

const SignalBars = ({ strength = 4, max = 5 }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
    {Array.from({ length: max }, (_, i) => (
      <div
        key={i}
        style={{
          width: 4,
          height: 4 + i * 3,
          borderRadius: 1,
          background: i < strength ? "#00D4FF" : "rgba(0,212,255,0.15)",
          boxShadow: i < strength ? "0 0 4px rgba(0,212,255,0.5)" : "none",
          transition: "background 0.3s",
        }}
      />
    ))}
  </div>
);

const VisitorPanel = () => {
  const { display } = useVisitorCount();
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
          <span style={{ fontSize: "0.5rem", color: "#3D5166", letterSpacing: "0.12em" }}>TOTAL_VISITORS</span>
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
            {display.toLocaleString()}
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
