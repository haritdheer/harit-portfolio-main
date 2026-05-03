import React, { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "HARIT_OS v2.0.6  ──  MISSION CONTROL SYSTEM", type: "header" },
  { text: "POST: CPU 8-core @ 3.8GHz  RAM 16GB  OK",     type: "ok",    delay: 220  },
  { text: "Mounting React 18 fiber tree...",               type: "info",  delay: 420  },
  { text: "React fiber tree           [ READY ]",          type: "ok",    delay: 580  },
  { text: "Compiling Tailwind styles  [ READY ]",          type: "ok",    delay: 720  },
  { text: "Loading i18n engine  (EN · DE · HI)",           type: "ok",    delay: 860  },
  { text: "Syncing GitHub telemetry...",                   type: "info",  delay: 1020 },
  { text: "GitHub telemetry           [ SYNCED ]",         type: "ok",    delay: 1180 },
  { text: "Establishing secure session...",                type: "info",  delay: 1320 },
  { text: "TLS 1.3  ECDHE-RSA-AES256  [ SECURE ]",        type: "ok",    delay: 1460 },
  { text: "Deploying portfolio payload [ LIVE ]",          type: "ok",    delay: 1580 },
  { text: "All systems nominal.  Welcome, Operator.",      type: "launch",delay: 1740 },
];

const ANIM_DURATION = 2400;

/* ─── Earth + Sun canvas ─────────────────────────────────────────── */
const SpaceCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    const STAR_COUNT = 320;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      base: Math.random() * 0.7 + 0.2,
      phase: Math.random() * Math.PI * 2,
      spd:   Math.random() * 0.025 + 0.008,
    }));

    const startTime = performance.now();
    let raf;
    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const draw = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / ANIM_DURATION, 1);
      const w = W(), h = H();
      const cx = w / 2;

      const earthR = Math.min(w, h) * 0.42;
      const earthY = h * 0.80;

      const spaceGrad = ctx.createRadialGradient(cx, h * 0.3, 0, cx, h * 0.5, Math.max(w, h) * 0.9);
      spaceGrad.addColorStop(0,   "#04111f");
      spaceGrad.addColorStop(0.5, "#020c18");
      spaceGrad.addColorStop(1,   "#000407");
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, w, h);

      const tick = elapsed / 1000;
      stars.forEach(s => {
        const twinkle = s.base + (1 - s.base) * 0.5 * (1 + Math.sin(s.phase + tick * s.spd * 6));
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,230,255,${twinkle * 0.9})`;
        ctx.fill();
      });

      const sunProgress = ease(Math.min(progress * 1.25, 1));
      const sunR  = earthR * 0.22;
      const sunX  = cx + earthR * 0.05;
      const sunStartY = earthY + earthR * 0.55;
      const sunEndY   = earthY - earthR * 0.68;
      const sunY  = sunStartY + (sunEndY - sunStartY) * sunProgress;

      const dist     = earthY - sunY;
      const edgeDist = dist - (earthR - sunR * 0.5);
      const sunAlpha = Math.max(0, Math.min(1, edgeDist / (sunR * 2)));

      if (sunProgress > 0.05) {
        const glowAlpha = Math.min(1, sunProgress * 1.4);
        const farGlow = ctx.createRadialGradient(sunX, sunY, sunR, sunX, sunY, sunR * 7);
        farGlow.addColorStop(0,   `rgba(255,180,40,${0.18 * glowAlpha})`);
        farGlow.addColorStop(0.4, `rgba(255,120,20,${0.09 * glowAlpha})`);
        farGlow.addColorStop(1,   "rgba(255,80,0,0)");
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR * 7, 0, Math.PI * 2);
        ctx.fillStyle = farGlow;
        ctx.fill();

        const limbAngle = Math.atan2(sunY - earthY, sunX - cx);
        const limbGrad  = ctx.createRadialGradient(
          cx + Math.cos(limbAngle) * earthR * 0.92,
          earthY + Math.sin(limbAngle) * earthR * 0.92, 0,
          cx + Math.cos(limbAngle) * earthR * 0.92,
          earthY + Math.sin(limbAngle) * earthR * 0.92, earthR * 0.28
        );
        limbGrad.addColorStop(0,   `rgba(255,160,40,${0.55 * glowAlpha})`);
        limbGrad.addColorStop(0.4, `rgba(255,100,20,${0.25 * glowAlpha})`);
        limbGrad.addColorStop(1,   "rgba(255,60,0,0)");
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(limbAngle) * earthR * 0.92,
          earthY + Math.sin(limbAngle) * earthR * 0.92,
          earthR * 0.28, 0, Math.PI * 2
        );
        ctx.fillStyle = limbGrad;
        ctx.fill();
      }

      ctx.save();
      const atmoGrad = ctx.createRadialGradient(cx, earthY, earthR * 0.96, cx, earthY, earthR * 1.14);
      atmoGrad.addColorStop(0,   "rgba(60,120,220,0.45)");
      atmoGrad.addColorStop(0.5, "rgba(40,90,180,0.2)");
      atmoGrad.addColorStop(1,   "rgba(20,50,140,0)");
      ctx.beginPath();
      ctx.arc(cx, earthY, earthR * 1.14, 0, Math.PI * 2);
      ctx.fillStyle = atmoGrad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, earthY, earthR, 0, Math.PI * 2);
      ctx.clip();

      const oceanGrad = ctx.createRadialGradient(
        cx - earthR * 0.25, earthY - earthR * 0.25, 0, cx, earthY, earthR
      );
      oceanGrad.addColorStop(0,    "#1a4a8a");
      oceanGrad.addColorStop(0.55, "#0d2b5e");
      oceanGrad.addColorStop(1,    "#040f28");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(cx - earthR, earthY - earthR, earthR * 2, earthR * 2);

      const continents = [
        { x: -0.32, y: -0.22, rx: 0.21, ry: 0.27, rot: -0.3,  c: "#2d6a4f" },
        { x: +0.07, y: -0.08, rx: 0.17, ry: 0.34, rot:  0.15, c: "#356b4a" },
        { x: +0.29, y: -0.18, rx: 0.28, ry: 0.19, rot: -0.1,  c: "#40916c" },
        { x: -0.18, y: +0.22, rx: 0.11, ry: 0.19, rot:  0.2,  c: "#52b788" },
        { x: +0.34, y: +0.22, rx: 0.10, ry: 0.08, rot:  0.35, c: "#74c69d" },
      ];
      continents.forEach(c => {
        ctx.fillStyle = c.c;
        ctx.beginPath();
        ctx.ellipse(cx + c.x * earthR, earthY + c.y * earthR, c.rx * earthR, c.ry * earthR, c.rot, 0, Math.PI * 2);
        ctx.fill();
      });

      ["top", "bottom"].forEach(pole => {
        const py = pole === "top" ? earthY - earthR : earthY + earthR;
        const iceGrad = ctx.createRadialGradient(cx, py, 0, cx, py, earthR * 0.28);
        iceGrad.addColorStop(0,   "rgba(240,248,255,0.95)");
        iceGrad.addColorStop(0.6, "rgba(200,230,255,0.5)");
        iceGrad.addColorStop(1,   "rgba(200,230,255,0)");
        ctx.fillStyle = iceGrad;
        ctx.fillRect(cx - earthR, earthY - earthR, earthR * 2, earthR * 2);
      });

      const nightGrad = ctx.createLinearGradient(cx - earthR, earthY, cx + earthR * 0.35, earthY);
      nightGrad.addColorStop(0,    "rgba(0,4,18,0.78)");
      nightGrad.addColorStop(0.55, "rgba(0,4,18,0.1)");
      nightGrad.addColorStop(1,    "rgba(0,4,18,0)");
      ctx.fillStyle = nightGrad;
      ctx.fillRect(cx - earthR, earthY - earthR, earthR * 2, earthR * 2);

      [[-0.4, -0.12], [-0.28, -0.18], [-0.38, -0.05], [-0.22, 0.0], [-0.42, 0.08]].forEach(([lx, ly]) => {
        const la = Math.max(0, 0.6 - Math.abs(lx + 0.1) * 1.5);
        if (la <= 0) return;
        ctx.beginPath();
        ctx.arc(cx + lx * earthR, earthY + ly * earthR, earthR * 0.012, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,120,${la})`;
        ctx.fill();
      });

      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, earthY, earthR, Math.PI * 1.08, Math.PI * 1.92);
      const rimGrad = ctx.createLinearGradient(cx - earthR, earthY - earthR * 0.5, cx + earthR, earthY - earthR * 0.5);
      rimGrad.addColorStop(0,   "rgba(80,160,255,0)");
      rimGrad.addColorStop(0.4, "rgba(100,180,255,0.7)");
      rimGrad.addColorStop(0.6, "rgba(100,180,255,0.7)");
      rimGrad.addColorStop(1,   "rgba(80,160,255,0)");
      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = earthR * 0.035;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, earthY);
      ctx.rotate(-0.28);
      ctx.scale(1, 0.32);
      const ringAlpha = 0.12 + 0.06 * Math.sin(tick * 1.2);
      ctx.beginPath();
      ctx.arc(0, 0, earthR * 1.38, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,212,255,${ringAlpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      const satA = tick * 0.8;
      ctx.beginPath();
      ctx.arc(Math.cos(satA) * earthR * 1.38, Math.sin(satA) * earthR * 1.38, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,212,255,0.9)";
      ctx.fill();
      ctx.restore();

      if (sunAlpha > 0) {
        const rayCount = 28;
        for (let i = 0; i < rayCount; i++) {
          const angle = (i / rayCount) * Math.PI * 2 + tick * 0.06;
          const len   = sunR * (1.4 + 0.6 * Math.sin(i * 1.9 + tick * 0.3));
          ctx.save();
          ctx.globalAlpha = sunAlpha * 0.35;
          ctx.strokeStyle = "#FFD060";
          ctx.lineWidth   = sunR * 0.06;
          ctx.lineCap     = "round";
          ctx.beginPath();
          ctx.moveTo(sunX + Math.cos(angle) * sunR * 1.15, sunY + Math.sin(angle) * sunR * 1.15);
          ctx.lineTo(sunX + Math.cos(angle) * (sunR + len), sunY + Math.sin(angle) * (sunR + len));
          ctx.stroke();
          ctx.restore();
        }

        const midGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 2.2);
        midGlow.addColorStop(0,   `rgba(255,240,180,${sunAlpha})`);
        midGlow.addColorStop(0.4, `rgba(255,190,60,${sunAlpha * 0.7})`);
        midGlow.addColorStop(1,   "rgba(255,120,0,0)");
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = midGlow;
        ctx.fill();

        const diskGrad = ctx.createRadialGradient(
          sunX - sunR * 0.2, sunY - sunR * 0.25, 0, sunX, sunY, sunR
        );
        diskGrad.addColorStop(0,    `rgba(255,255,230,${sunAlpha})`);
        diskGrad.addColorStop(0.45, `rgba(255,220,80,${sunAlpha})`);
        diskGrad.addColorStop(1,    `rgba(255,140,20,${sunAlpha})`);
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
        ctx.fillStyle = diskGrad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />
  );
};

/* ─── Speedometer / diagnostics panel canvas ─────────────────────── */
const SpeedometerCanvas = ({ progress }) => {
  const canvasRef = useRef(null);
  const progRef   = useRef(progress);

  useEffect(() => { progRef.current = progress; }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const W = 340, H = 480;
    canvas.width  = W;
    canvas.height = H;

    const FONT = "'JetBrains Mono', 'Share Tech Mono', monospace";

    let smooth = 0;
    const sub = [
      { label: "CPU_CORE",  target: 0.74, v: 0 },
      { label: "MEM_ALLOC", target: 0.61, v: 0 },
      { label: "NET_SYNC",  target: 0.88, v: 0 },
    ];

    /* Draw the big arc speedometer */
    const drawMain = (cx, cy, r, val, tick) => {
      const SA = Math.PI * 0.75;   // 135°  — bottom-left
      const SW = Math.PI * 1.5;    // 270° sweep

      /* Outer decorative ring */
      ctx.beginPath();
      ctx.arc(cx, cy, r + 14, SA, SA + SW);
      ctx.strokeStyle = "rgba(0,212,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      /* Track */
      ctx.beginPath();
      ctx.arc(cx, cy, r, SA, SA + SW);
      ctx.strokeStyle = "rgba(0,212,255,0.10)";
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.stroke();

      /* Progress arc */
      if (val > 0.002) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, SA, SA + SW * val);
        ctx.strokeStyle = val < 0.5 ? "#0099BB" : "#00D4FF";
        ctx.lineWidth = 12;
        ctx.lineCap = "round";
        ctx.shadowColor = "#00D4FF";
        ctx.shadowBlur = 18;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      /* Tick marks */
      for (let i = 0; i <= 20; i++) {
        const a       = SA + (i / 20) * SW;
        const isMajor = i % 5 === 0;
        const inner   = r - (isMajor ? 22 : 12);
        const outer   = r + 4;
        const lit     = val >= (i / 20) - 0.01;

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
        ctx.lineTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
        ctx.strokeStyle = lit
          ? `rgba(0,212,255,${isMajor ? 0.9 : 0.45})`
          : `rgba(0,212,255,${isMajor ? 0.2 : 0.08})`;
        ctx.lineWidth = isMajor ? 2 : 1;
        ctx.lineCap   = "square";
        ctx.stroke();

        /* Major tick labels */
        if (isMajor) {
          const labelR = r - 34;
          const pct    = Math.round((i / 20) * 100);
          ctx.fillStyle = lit ? "rgba(0,212,255,0.7)" : "rgba(0,212,255,0.2)";
          ctx.font      = `8px ${FONT}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${pct}`, cx + Math.cos(a) * labelR, cy + Math.sin(a) * labelR);
        }
      }

      /* Needle */
      const na = SA + SW * val;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(na);
      /* needle shaft */
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(r - 20, 0);
      ctx.strokeStyle = "#00D4FF";
      ctx.lineWidth   = 2.5;
      ctx.lineCap     = "round";
      ctx.shadowColor = "#00D4FF";
      ctx.shadowBlur  = 12;
      ctx.stroke();
      /* needle tip triangle */
      ctx.beginPath();
      ctx.moveTo(r - 20, 0);
      ctx.lineTo(r - 8, -3);
      ctx.lineTo(r - 8, 3);
      ctx.closePath();
      ctx.fillStyle = "#00D4FF";
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      /* Hub ring */
      ctx.beginPath();
      ctx.arc(cx, cy, 13, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,212,255,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
      /* Hub glow */
      const hubG = ctx.createRadialGradient(cx, cy, 0, cx, cy, 13);
      hubG.addColorStop(0,   "rgba(0,212,255,0.9)");
      hubG.addColorStop(0.5, "rgba(0,212,255,0.5)");
      hubG.addColorStop(1,   "rgba(0,212,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 13, 0, Math.PI * 2);
      ctx.fillStyle = hubG;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#e0f8ff";
      ctx.fill();

      /* Center number */
      const pctStr = `${Math.round(val * 100)}%`;
      ctx.fillStyle = "#00D4FF";
      ctx.font      = `bold ${Math.round(r * 0.28)}px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor  = "rgba(0,212,255,0.6)";
      ctx.shadowBlur   = 10;
      ctx.fillText(pctStr, cx, cy + r * 0.32);
      ctx.shadowBlur = 0;

      ctx.fillStyle = "rgba(0,212,255,0.45)";
      ctx.font      = `9px ${FONT}`;
      ctx.fillText("BOOT_PROGRESS", cx, cy + r * 0.5);
    };

    /* Draw a small circular sub-gauge */
    const drawSubGauge = (cx, cy, r, item, tick) => {
      const pulse = 0.5 + 0.5 * Math.sin(tick * 2.5 + cx * 0.05);

      /* Track */
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,212,255,0.08)";
      ctx.lineWidth = 5;
      ctx.stroke();

      /* Fill */
      if (item.v > 0.002) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * item.v);
        ctx.strokeStyle = `rgba(0,212,255,${0.65 + pulse * 0.35})`;
        ctx.lineWidth = 5;
        ctx.lineCap   = "round";
        ctx.shadowColor = "#00D4FF";
        ctx.shadowBlur  = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      /* Percentage */
      ctx.fillStyle = "#00D4FF";
      ctx.font      = `bold ${Math.round(r * 0.42)}px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${Math.round(item.v * 100)}`, cx, cy - r * 0.08);

      ctx.fillStyle = "rgba(0,212,255,0.45)";
      ctx.font      = `${Math.round(r * 0.24)}px ${FONT}`;
      ctx.fillText(item.label, cx, cy + r * 0.55);
    };

    /* Draw horizontal bar for misc metrics */
    const drawBar = (x, y, w, h, val, label, valText) => {
      ctx.fillStyle = "rgba(0,212,255,0.06)";
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = "rgba(0,212,255,0.0)";
      const barGrad = ctx.createLinearGradient(x, 0, x + w, 0);
      barGrad.addColorStop(0,   "rgba(0,100,180,0.7)");
      barGrad.addColorStop(1,   "rgba(0,212,255,0.9)");
      ctx.fillStyle = barGrad;
      ctx.fillRect(x, y, w * val, h);

      ctx.fillStyle = "rgba(0,212,255,0.5)";
      ctx.font      = `8px ${FONT}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x, y - 6);

      ctx.textAlign = "right";
      ctx.fillText(valText, x + w, y - 6);
    };

    let raf;
    const frame = (now) => {
      const t = now / 1000;
      const p = progRef.current;

      /* Ease toward target */
      smooth += (p - smooth) * 0.055;
      sub.forEach(s => {
        const tgt = p > 0.15 ? s.target * Math.min(1, (p - 0.1) / 0.75) : 0;
        s.v += (tgt - s.v) * 0.05;
      });

      ctx.clearRect(0, 0, W, H);

      /* Section title */
      ctx.fillStyle = "rgba(0,212,255,0.55)";
      ctx.font      = `9px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.letterSpacing = "0.12em";
      ctx.fillText("SYS_DIAGNOSTICS", W / 2, 14);

      ctx.beginPath();
      ctx.moveTo(W * 0.12, 30);
      ctx.lineTo(W * 0.88, 30);
      ctx.strokeStyle = "rgba(0,212,255,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      /* Main gauge */
      drawMain(W / 2, 160, 100, smooth, t);

      /* Sub-gauge row */
      const subPositions = [W * 0.17, W / 2, W * 0.83];
      const subY = 320;
      const subR = 36;
      sub.forEach((s, i) => drawSubGauge(subPositions[i], subY, subR, s, t));

      /* Divider */
      ctx.beginPath();
      ctx.moveTo(W * 0.12, subY + subR + 18);
      ctx.lineTo(W * 0.88, subY + subR + 18);
      ctx.strokeStyle = "rgba(0,212,255,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      /* Status row */
      const statusY   = subY + subR + 32;
      const statusTxt = smooth > 0.98
        ? "● ALL SYSTEMS NOMINAL"
        : smooth > 0.5
          ? "◌ BOOT SEQUENCE RUNNING"
          : "◌ INITIALISING...";
      const statusCol = smooth > 0.98 ? "#00FF88" : "rgba(0,212,255,0.6)";
      ctx.fillStyle = statusCol;
      ctx.font      = `8px ${FONT}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(statusTxt, W / 2, statusY);

      /* Pulse ring around main hub — grows outward */
      const pulseR = 14 + (1 - (t % 1)) * 22;
      const pulseA = Math.max(0, 0.4 * (1 - (t % 1)));
      ctx.beginPath();
      ctx.arc(W / 2, 160, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,212,255,${pulseA})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      /* HUD corner brackets */
      const bs = 14, bp = 10;
      ctx.strokeStyle = "rgba(0,212,255,0.28)";
      ctx.lineWidth = 1.5;
      [[bp, bp], [W - bp, bp], [bp, H - bp], [W - bp, H - bp]].forEach(([bx, by]) => {
        const sx = bx < W / 2 ? 1 : -1;
        const sy = by < H / 2 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(bx + sx * bs, by);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx, by + sy * bs);
        ctx.stroke();
      });

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", maxWidth: 340, height: "auto", display: "block" }}
    />
  );
};

/* ─── Boot sequence ──────────────────────────────────────────────── */
const BootSequence = ({ onComplete }) => {
  const [visible, setVisible] = useState([]);
  const [exiting, setExiting] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (sessionStorage.getItem("mc_boot")) { onComplete(); return; }

    const timers = LINES.map((line, i) =>
      setTimeout(() => {
        setVisible(prev => [...prev, line]);
        if (i === LINES.length - 1) {
          setTimeout(() => {
            setExiting(true);
            setTimeout(() => {
              sessionStorage.setItem("mc_boot", "1");
              onComplete();
            }, 600);
          }, 500);
        }
      }, line.delay ?? i * 160)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const progress = visible.length / LINES.length;

  return (
    <div
      className={`boot-screen${exiting ? " boot-exit" : ""}`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        padding: 0,
        overflow: "hidden",
        alignItems: "stretch",
      }}
    >
      {/* 3D Earth + sun background */}
      <SpaceCanvas />

      {/* dark gradient overlay */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(2,8,20,0.88) 0%, rgba(2,8,20,0.55) 50%, rgba(2,8,20,0.18) 100%)",
          zIndex: 1,
        }}
      />

      {/* LEFT — terminal text */}
      <div
        style={{
          position: "relative", zIndex: 2,
          flex: isMobile ? "1" : "0 0 58%",
          maxWidth: isMobile ? "100%" : 720,
          padding: isMobile ? "1.5rem 1.25rem" : "3rem 4rem",
          display: "flex", flexDirection: "column",
        }}
      >
        <div
          className="boot-logo"
          style={{ fontSize: isMobile ? "0.95rem" : "1.3rem" }}
        >
          ▶ MISSION_CTRL.exe
        </div>

        {visible.map((line, i) => (
          <div key={i} className="boot-line">
            {line.type === "ok" && (
              <span style={{ color: "#00FF88", marginRight: "0.6rem", fontWeight: 600 }}>[ OK ]</span>
            )}
            {line.type === "launch" && (
              <span style={{ color: "#00D4FF", marginRight: "0.6rem" }}>[ ▶▶ ]</span>
            )}
            {line.type === "info" && (
              <span style={{ color: "#3D5166", marginRight: "0.6rem" }}>{" ─── "}</span>
            )}
            {line.type === "header" && (
              <span style={{ color: "#00D4FF", marginRight: "0.6rem" }}>{">>>"}</span>
            )}
            <span
              style={{
                color:
                  line.type === "header" ? "#00D4FF"
                  : line.type === "launch" ? "#C8D8E8"
                  : "#8892B0",
                fontSize: isMobile ? "0.65rem" : "0.72rem",
              }}
            >
              {line.text}
            </span>
          </div>
        ))}

        {visible.length === LINES.length && (
          <div className="boot-line" style={{ marginTop: "0.5rem" }}>
            <span className="cursor-blink" />
          </div>
        )}
      </div>

      {/* RIGHT — speedometer diagnostics panel */}
      {!isMobile && (
        <div
          style={{
            position: "relative", zIndex: 2,
            flex: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderLeft: "1px solid rgba(0,212,255,0.08)",
            background: "rgba(2,8,20,0.25)",
            padding: "1rem",
          }}
        >
          <SpeedometerCanvas progress={progress} />
        </div>
      )}
    </div>
  );
};

export default BootSequence;
