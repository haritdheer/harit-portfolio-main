import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const trail = [];

    const onMove = (e) => {
      trail.push({ x: e.clientX, y: e.clientY, life: 1.0 });
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = trail.length - 1; i >= 0; i--) {
        const d = trail[i];
        d.life -= 0.055;
        if (d.life <= 0) { trail.splice(i, 1); continue; }
        const r = 4 * d.life;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${d.life * 0.38})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 9990,
      }}
    />
  );
};

export default CursorTrail;
