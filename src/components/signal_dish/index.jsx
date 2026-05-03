import React, { useEffect, useRef, useState } from "react";

/* ─── Shared 3-D signal dish canvas ─────────────────────────────── */
export const DiscCanvas = ({ width = 300, height = 210 }) => {
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
      { a: 120, b: 30, speed:  0.007, phase: 0,   lw: 1.2, alpha: 0.85 },
      { a:  90, b: 23, speed: -0.011, phase: 1.2, lw: 1.0, alpha: 0.65 },
      { a: 148, b: 37, speed:  0.004, phase: 2.4, lw: 0.7, alpha: 0.45 },
      { a:  62, b: 16, speed: -0.017, phase: 0.7, lw: 0.8, alpha: 0.55 },
      { a: 170, b: 43, speed:  0.003, phase: 3.1, lw: 0.5, alpha: 0.25 },
    ];
    const particles = RINGS.map(() => ({ angle: Math.random() * Math.PI * 2 }));
    let t = 0, raf;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
      bg.addColorStop(0, "rgba(0,212,255,0.05)");
      bg.addColorStop(1, "rgba(0,212,255,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = "rgba(0,212,255,0.1)";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(-W, 0); ctx.lineTo(W, 0);
      ctx.moveTo(0, -H); ctx.lineTo(0, H);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      RINGS.forEach((ring, i) => {
        const angle = ring.phase + t * ring.speed;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.ellipse(0, 0, ring.a, ring.b, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${ring.alpha * 0.55})`;
        ctx.lineWidth = ring.lw;
        ctx.stroke();

        for (let n = 0; n < 12; n++) {
          const a = (n / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.arc(ring.a * Math.cos(a), ring.b * Math.sin(a), n % 3 === 0 ? 1.5 : 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,212,255,${ring.alpha * (n % 3 === 0 ? 0.7 : 0.3)})`;
          ctx.fill();
        }

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

        for (let k = 1; k <= 8; k++) {
          const ta = particles[i].angle - ring.speed * 3 * k;
          ctx.beginPath();
          ctx.arc(ring.a * Math.cos(ta), ring.b * Math.sin(ta), 1.5 * (1 - k / 8), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,212,255,${0.4 * (1 - k / 8)})`;
          ctx.fill();
        }

        ctx.restore();
      });

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

      const pulseRad = 18 + pulse * 90;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRad, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,212,255,${(1 - pulse) * 0.25})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      const bSize = 12, bPad = 6;
      ctx.strokeStyle = "rgba(0,212,255,0.3)";
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
      width={width}
      height={height}
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
};

/* ─── Real visitor counter (CounterAPI — free, no auth, CORS-open) ── */
const NS  = "haritdheer";
const KEY = "portfolio-visits";
const BASE_URL = `https://api.counterapi.dev/v1/${NS}/${KEY}`;

const animateTo = (target, setter) => {
  const cached = parseInt(localStorage.getItem("hd_vc_real") || "0", 10);
  const start  = cached || Math.max(0, target - 30);
  let cur = start;
  if (cur >= target) { setter(target); return; }
  const steps = target - cur;
  const id = setInterval(() => {
    cur = Math.min(cur + 1, target);
    setter(cur);
    if (cur >= target) clearInterval(id);
  }, Math.max(16, 500 / steps));
};

export const useVisitorCount = () => {
  const [display, setDisplay] = useState(
    () => parseInt(localStorage.getItem("hd_vc_real") || "0", 10) || null
  );
  const [status, setStatus] = useState("loading"); // loading | live | offline

  useEffect(() => {
    const isNewSession = !sessionStorage.getItem("hd_vs");
    const endpoint = isNewSession ? `${BASE_URL}/up` : BASE_URL;

    fetch(endpoint)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => {
        const count = data?.count ?? data?.value;
        if (!count) throw new Error("no count");
        if (isNewSession) sessionStorage.setItem("hd_vs", "1");
        localStorage.setItem("hd_vc_real", String(count));
        setStatus("live");
        animateTo(count, setDisplay);
      })
      .catch(() => {
        setStatus("offline");
        animateTo(11, setDisplay);
      });
  }, []);

  return { display, status };
};

/* ─── Shared signal bars ─────────────────────────────────────────── */
export const SignalBars = ({ strength = 4, max = 5 }) => (
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
