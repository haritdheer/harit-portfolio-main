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

/* total animation window: first line → last line + 500ms cursor = ~2240ms */
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

    /* Stars */
    const STAR_COUNT = 320;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      base: Math.random() * 0.7 + 0.2,
      phase: Math.random() * Math.PI * 2,
      spd:   Math.random() * 0.025 + 0.008,
    }));

    const startTime = performance.now();
    let raf;

    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease-in-out quad

    const draw = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / ANIM_DURATION, 1);
      const w = W(), h = H();
      const cx = w / 2;

      const earthR = Math.min(w, h) * 0.42;
      const earthY = h * 0.80;

      /* ── background ── */
      const spaceGrad = ctx.createRadialGradient(cx, h * 0.3, 0, cx, h * 0.5, Math.max(w, h) * 0.9);
      spaceGrad.addColorStop(0,   "#04111f");
      spaceGrad.addColorStop(0.5, "#020c18");
      spaceGrad.addColorStop(1,   "#000407");
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, w, h);

      /* ── stars ── */
      const tick = elapsed / 1000;
      stars.forEach(s => {
        const twinkle = s.base + (1 - s.base) * 0.5 * (1 + Math.sin(s.phase + tick * s.spd * 6));
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,230,255,${twinkle * 0.9})`;
        ctx.fill();
      });

      /* ── sun position (rises from behind Earth) ── */
      const sunProgress = ease(Math.min(progress * 1.25, 1));
      const sunR  = earthR * 0.22;
      const sunX  = cx + earthR * 0.05;
      const sunStartY = earthY + earthR * 0.55;
      const sunEndY   = earthY - earthR * 0.68;
      const sunY  = sunStartY + (sunEndY - sunStartY) * sunProgress;

      /* how much sun is above Earth edge */
      const dist      = earthY - sunY;                 // positive = sun above earth centre
      const edgeDist  = dist - (earthR - sunR * 0.5);  // positive = sun peeking above limb
      const sunAlpha  = Math.max(0, Math.min(1, edgeDist / (sunR * 2)));

      /* ── pre-Earth: diffuse corona / limb glow ── */
      if (sunProgress > 0.05) {
        const glowAlpha = Math.min(1, sunProgress * 1.4);

        /* far diffuse glow (bleeds around Earth) */
        const farGlow = ctx.createRadialGradient(sunX, sunY, sunR, sunX, sunY, sunR * 7);
        farGlow.addColorStop(0,   `rgba(255,180,40,${0.18 * glowAlpha})`);
        farGlow.addColorStop(0.4, `rgba(255,120,20,${0.09 * glowAlpha})`);
        farGlow.addColorStop(1,   "rgba(255,80,0,0)");
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR * 7, 0, Math.PI * 2);
        ctx.fillStyle = farGlow;
        ctx.fill();

        /* limb atmospheric scatter on Earth near sun */
        const limbAngle = Math.atan2(sunY - earthY, sunX - cx);
        const limbGrad  = ctx.createRadialGradient(
          cx + Math.cos(limbAngle) * earthR * 0.92,
          earthY + Math.sin(limbAngle) * earthR * 0.92,
          0,
          cx + Math.cos(limbAngle) * earthR * 0.92,
          earthY + Math.sin(limbAngle) * earthR * 0.92,
          earthR * 0.28
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

      /* ── Earth ── */
      ctx.save();

      /* atmosphere outer halo */
      const atmoGrad = ctx.createRadialGradient(cx, earthY, earthR * 0.96, cx, earthY, earthR * 1.14);
      atmoGrad.addColorStop(0,   "rgba(60,120,220,0.45)");
      atmoGrad.addColorStop(0.5, "rgba(40,90,180,0.2)");
      atmoGrad.addColorStop(1,   "rgba(20,50,140,0)");
      ctx.beginPath();
      ctx.arc(cx, earthY, earthR * 1.14, 0, Math.PI * 2);
      ctx.fillStyle = atmoGrad;
      ctx.fill();

      /* clip to Earth disk */
      ctx.beginPath();
      ctx.arc(cx, earthY, earthR, 0, Math.PI * 2);
      ctx.clip();

      /* ocean */
      const oceanGrad = ctx.createRadialGradient(
        cx - earthR * 0.25, earthY - earthR * 0.25, 0,
        cx, earthY, earthR
      );
      oceanGrad.addColorStop(0,   "#1a4a8a");
      oceanGrad.addColorStop(0.55, "#0d2b5e");
      oceanGrad.addColorStop(1,   "#040f28");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(cx - earthR, earthY - earthR, earthR * 2, earthR * 2);

      /* continents */
      const continents = [
        { x: -0.32, y: -0.22, rx: 0.21, ry: 0.27, rot: -0.3,  c: "#2d6a4f" }, // N.America
        { x: +0.07, y: -0.08, rx: 0.17, ry: 0.34, rot:  0.15, c: "#356b4a" }, // Europe/Africa
        { x: +0.29, y: -0.18, rx: 0.28, ry: 0.19, rot: -0.1,  c: "#40916c" }, // Asia
        { x: -0.18, y: +0.22, rx: 0.11, ry: 0.19, rot:  0.2,  c: "#52b788" }, // S.America
        { x: +0.34, y: +0.22, rx: 0.10, ry: 0.08, rot:  0.35, c: "#74c69d" }, // Australia
      ];
      continents.forEach(c => {
        ctx.fillStyle = c.c;
        ctx.beginPath();
        ctx.ellipse(cx + c.x * earthR, earthY + c.y * earthR, c.rx * earthR, c.ry * earthR, c.rot, 0, Math.PI * 2);
        ctx.fill();
      });

      /* polar ice */
      ["top", "bottom"].forEach(pole => {
        const py = pole === "top" ? earthY - earthR : earthY + earthR;
        const iceGrad = ctx.createRadialGradient(cx, py, 0, cx, py, earthR * 0.28);
        iceGrad.addColorStop(0,   "rgba(240,248,255,0.95)");
        iceGrad.addColorStop(0.6, "rgba(200,230,255,0.5)");
        iceGrad.addColorStop(1,   "rgba(200,230,255,0)");
        ctx.fillStyle = iceGrad;
        ctx.fillRect(cx - earthR, earthY - earthR, earthR * 2, earthR * 2);
      });

      /* night-side shadow */
      const nightGrad = ctx.createLinearGradient(cx - earthR, earthY, cx + earthR * 0.35, earthY);
      nightGrad.addColorStop(0,   "rgba(0,4,18,0.78)");
      nightGrad.addColorStop(0.55, "rgba(0,4,18,0.1)");
      nightGrad.addColorStop(1,   "rgba(0,4,18,0)");
      ctx.fillStyle = nightGrad;
      ctx.fillRect(cx - earthR, earthY - earthR, earthR * 2, earthR * 2);

      /* city lights on night side */
      const cityLights = [
        [-0.4, -0.12], [-0.28, -0.18], [-0.38, -0.05],
        [-0.22, 0.0],  [-0.42, 0.08],
      ];
      cityLights.forEach(([lx, ly]) => {
        const lightAlpha = Math.max(0, 0.6 - Math.abs(lx + 0.1) * 1.5);
        if (lightAlpha <= 0) return;
        ctx.beginPath();
        ctx.arc(cx + lx * earthR, earthY + ly * earthR, earthR * 0.012, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,120,${lightAlpha})`;
        ctx.fill();
      });

      ctx.restore();

      /* atmosphere bright rim */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, earthY, earthR, Math.PI * 1.08, Math.PI * 1.92);
      const rimGrad = ctx.createLinearGradient(cx - earthR, earthY - earthR * 0.5, cx + earthR, earthY - earthR * 0.5);
      rimGrad.addColorStop(0, "rgba(80,160,255,0)");
      rimGrad.addColorStop(0.4, "rgba(100,180,255,0.7)");
      rimGrad.addColorStop(0.6, "rgba(100,180,255,0.7)");
      rimGrad.addColorStop(1, "rgba(80,160,255,0)");
      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = earthR * 0.035;
      ctx.stroke();
      ctx.restore();

      /* ── orbital ring ── */
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
      /* satellite dot */
      const satA = tick * 0.8;
      ctx.beginPath();
      ctx.arc(Math.cos(satA) * earthR * 1.38, Math.sin(satA) * earthR * 1.38, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,0.9)`;
      ctx.fill();
      ctx.restore();

      /* ── post-Earth: visible sun body ── */
      if (sunAlpha > 0) {
        /* corona rays */
        const rayCount = 28;
        for (let i = 0; i < rayCount; i++) {
          const angle  = (i / rayCount) * Math.PI * 2 + tick * 0.06;
          const len    = sunR * (1.4 + 0.6 * Math.sin(i * 1.9 + tick * 0.3));
          const rAlpha = sunAlpha * 0.35;
          ctx.save();
          ctx.globalAlpha = rAlpha;
          ctx.strokeStyle = "#FFD060";
          ctx.lineWidth   = sunR * 0.06;
          ctx.lineCap     = "round";
          ctx.beginPath();
          ctx.moveTo(sunX + Math.cos(angle) * sunR * 1.15, sunY + Math.sin(angle) * sunR * 1.15);
          ctx.lineTo(sunX + Math.cos(angle) * (sunR + len), sunY + Math.sin(angle) * (sunR + len));
          ctx.stroke();
          ctx.restore();
        }

        /* inner mid glow */
        const midGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 2.2);
        midGlow.addColorStop(0,   `rgba(255,240,180,${sunAlpha})`);
        midGlow.addColorStop(0.4, `rgba(255,190,60,${sunAlpha * 0.7})`);
        midGlow.addColorStop(1,   "rgba(255,120,0,0)");
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = midGlow;
        ctx.fill();

        /* sun disk */
        const diskGrad = ctx.createRadialGradient(
          sunX - sunR * 0.2, sunY - sunR * 0.25, 0,
          sunX, sunY, sunR
        );
        diskGrad.addColorStop(0,   `rgba(255,255,230,${sunAlpha})`);
        diskGrad.addColorStop(0.45, `rgba(255,220,80,${sunAlpha})`);
        diskGrad.addColorStop(1,   `rgba(255,140,20,${sunAlpha})`);
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
        ctx.fillStyle = diskGrad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
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

  return (
    <div
      className={`boot-screen${exiting ? " boot-exit" : ""}`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* 3D Earth + sun background */}
      <SpaceCanvas />

      {/* dark gradient overlay so terminal text stays readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(2,8,20,0.88) 0%, rgba(2,8,20,0.55) 50%, rgba(2,8,20,0.2) 100%)",
          zIndex: 1,
        }}
      />

      {/* terminal text */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: isMobile ? "1.5rem 1.25rem" : "3rem 4rem",
          maxWidth: 720,
          width: "100%",
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
    </div>
  );
};

export default BootSequence;
