import React, { useEffect, useRef } from "react";

/* ─── Star: 3D warp perspective ─────────────────────────────── */
class Star {
  constructor(w, h, init = false) {
    this.w = w;
    this.h = h;
    this._spawn(init);
  }

  _spawn(init = false) {
    this.x  = (Math.random() - 0.5) * this.w * 2.2;
    this.y  = (Math.random() - 0.5) * this.h * 2.2;
    this.z  = init ? Math.random() * this.w : this.w;
    this.pz = this.z;
    this.r  = Math.random() * 1.6 + 0.3;
    this.baseAlpha = Math.random() * 0.55 + 0.45;
    this.twinkle   = Math.random() * Math.PI * 2;
    this.twinkleHz = Math.random() * 0.025 + 0.008;
    // 8% chance neon blue, 3% chance green, rest white
    const roll = Math.random();
    this.hue = roll < 0.08 ? "blue" : roll < 0.11 ? "green" : "white";
  }

  update(speed) {
    this.pz = this.z;
    this.z -= speed;
    this.twinkle += this.twinkleHz;
    if (this.z <= 1) this._spawn(false);
  }

  draw(ctx) {
    const cx = this.w / 2;
    const cy = this.h / 2;
    const sx = (this.x / this.z) * this.w * 0.5 + cx;
    const sy = (this.y / this.z) * this.h * 0.5 + cy;
    const px = (this.x / this.pz) * this.w * 0.5 + cx;
    const py = (this.y / this.pz) * this.h * 0.5 + cy;

    if (sx < -60 || sx > this.w + 60 || sy < -60 || sy > this.h + 60) return;

    const depth  = 1 - this.z / this.w;
    const size   = Math.max(0.15, depth * this.r * 2.5);
    const alpha  = this.baseAlpha * (0.7 + 0.3 * Math.sin(this.twinkle)) * Math.min(1, depth * 2);

    const color  =
      this.hue === "blue"  ? `rgba(0,212,255,${alpha})`   :
      this.hue === "green" ? `rgba(0,255,136,${alpha})`   :
                             `rgba(220,235,255,${alpha})`;

    // motion trail
    const tLen = Math.hypot(sx - px, sy - py);
    if (tLen > 0.5) {
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(sx, sy);
      const trailAlpha = alpha * 0.35;
      ctx.strokeStyle =
        this.hue === "blue"  ? `rgba(0,212,255,${trailAlpha})`   :
        this.hue === "green" ? `rgba(0,255,136,${trailAlpha})`   :
                               `rgba(200,220,255,${trailAlpha})`;
      ctx.lineWidth = size * 0.45;
      ctx.stroke();
    }

    // dot
    ctx.beginPath();
    ctx.arc(sx, sy, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // halo for close/bright stars
    if (size > 1.6 && alpha > 0.5) {
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 3.5);
      g.addColorStop(0, this.hue === "blue" ? `rgba(0,212,255,0.28)` : `rgba(255,255,255,0.15)`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(sx, sy, size * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
  }
}

/* ─── Meteor ─────────────────────────────────────────────────── */
class Meteor {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    // spawn from top-right quadrant
    const edge = Math.random();
    if (edge < 0.6) {
      this.x = w * 0.2 + Math.random() * w * 1.3;
      this.y = -30;
    } else {
      this.x = w + 30;
      this.y = -30 + Math.random() * h * 0.45;
    }
    const angleDeg = 22 + Math.random() * 28;          // 22–50°
    const speed    = 10 + Math.random() * 10;
    const rad      = angleDeg * (Math.PI / 180);
    this.vx   = -Math.cos(rad) * speed;
    this.vy   =  Math.sin(rad) * speed;
    this.life  = 1;
    this.decay = 0.012 + Math.random() * 0.01;
    this.width = 0.6 + Math.random() * 1.8;
    this.trail = [];
    this.maxTrail = 22 + Math.floor(Math.random() * 14);
    this.alive = true;
    // color variation: mostly white-blue, occasional gold
    this.gold = Math.random() < 0.12;
  }

  update() {
    this.trail.unshift({ x: this.x, y: this.y });
    if (this.trail.length > this.maxTrail) this.trail.pop();
    this.x    += this.vx;
    this.y    += this.vy;
    this.life -= this.decay;
    if (this.life <= 0 || this.x < -120 || this.y > this.h + 120) this.alive = false;
  }

  draw(ctx) {
    if (this.trail.length < 2) return;

    const headColor = this.gold ? "rgba(255,220,100," : "rgba(255,255,255,";
    const tailColor = this.gold ? "rgba(255,160,30,"  : "rgba(0,212,255,";

    ctx.save();
    ctx.shadowBlur  = 14;
    ctx.shadowColor = this.gold ? "#FFD060" : "#00D4FF";

    // trail segments
    for (let i = 0; i < this.trail.length - 1; i++) {
      const p  = 1 - i / this.trail.length;
      const a  = this.life * p * 0.85;
      const lw = this.width * p * 1.1;

      const g = ctx.createLinearGradient(
        this.trail[i].x, this.trail[i].y,
        this.trail[i + 1].x, this.trail[i + 1].y
      );
      g.addColorStop(0, `${headColor}${a})`);
      g.addColorStop(1, `${tailColor}${a * 0.4})`);

      ctx.beginPath();
      ctx.moveTo(this.trail[i].x, this.trail[i].y);
      ctx.lineTo(this.trail[i + 1].x, this.trail[i + 1].y);
      ctx.strokeStyle = g;
      ctx.lineWidth   = lw;
      ctx.lineCap     = "round";
      ctx.stroke();
    }

    // bright head
    const r  = this.width * 4.5;
    const hg = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
    hg.addColorStop(0,   `${headColor}${this.life})`);
    hg.addColorStop(0.3, `${tailColor}${this.life * 0.7})`);
    hg.addColorStop(1,   "rgba(0,0,0,0)");
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = hg;
    ctx.fill();

    ctx.restore();
  }
}

/* ─── Nebula blob (drawn once to offscreen canvas) ──────────── */
function buildNebula(w, h) {
  const oc  = document.createElement("canvas");
  oc.width  = w;
  oc.height = h;
  const oc2 = oc.getContext("2d");

  const blobs = [
    { x: w * 0.72, y: h * 0.22, r: w * 0.28, c: [0, 212, 255, 0.045] },
    { x: w * 0.18, y: h * 0.68, r: w * 0.22, c: [80, 0, 200, 0.035] },
    { x: w * 0.85, y: h * 0.75, r: w * 0.18, c: [0, 255, 136, 0.028] },
    { x: w * 0.35, y: h * 0.15, r: w * 0.20, c: [0, 100, 255, 0.032] },
  ];

  blobs.forEach(({ x, y, r, c }) => {
    const g = oc2.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0,   `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`);
    g.addColorStop(0.5, `rgba(${c[0]},${c[1]},${c[2]},${c[3] * 0.4})`);
    g.addColorStop(1,   "rgba(0,0,0,0)");
    oc2.beginPath();
    oc2.arc(x, y, r, 0, Math.PI * 2);
    oc2.fillStyle = g;
    oc2.fill();
  });

  return oc;
}

/* ─── Main component ─────────────────────────────────────────── */
const CosmosBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h, stars, nebula, meteors, raf;
    let mouseX = 0, mouseY = 0;
    let lastMeteorTime = 0;
    const METEOR_INTERVAL = 1600; // ms
    const MAX_METEORS     = 5;
    const WARP_SPEED      = 1.6;

    function resize() {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
      stars  = Array.from({ length: 360 }, () => new Star(w, h, true));
      nebula = buildNebula(w, h);
      meteors = [];
    }

    function onMouseMove(e) {
      mouseX = (e.clientX / w - 0.5) * 2;  // -1 to 1
      mouseY = (e.clientY / h - 0.5) * 2;
    }

    function spawnMeteor(now) {
      if (meteors.length < MAX_METEORS && now - lastMeteorTime > METEOR_INTERVAL) {
        meteors.push(new Meteor(w, h));
        lastMeteorTime = now + Math.random() * 600;
      }
    }

    function draw(ts) {
      raf = requestAnimationFrame(draw);

      // background
      ctx.fillStyle = "#030C1A";
      ctx.fillRect(0, 0, w, h);

      // nebula (parallax shift on mouse)
      ctx.save();
      ctx.translate(mouseX * -18, mouseY * -18);
      ctx.drawImage(nebula, 0, 0);
      ctx.restore();

      // stars (slight parallax based on star depth)
      ctx.save();
      // subtle overall parallax
      ctx.translate(mouseX * -6, mouseY * -6);
      stars.forEach(s => {
        s.w = w; s.h = h;
        s.update(WARP_SPEED);
        s.draw(ctx);
      });
      ctx.restore();

      // meteors
      spawnMeteor(ts);
      meteors = meteors.filter(m => m.alive);
      meteors.forEach(m => { m.w = w; m.h = h; m.update(); m.draw(ctx); });
    }

    resize();
    window.addEventListener("resize",    resize);
    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width:  "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
};

export default CosmosBackground;
