'use client';

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let W = 0, H = 0, stars: any[] = [], t = 0;
    let animFrame: number;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.style.width = W + "px";
      canvas!.style.height = H + "px";
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      
      stars = [];
      const n = Math.min(220, Math.floor((W * H) / 9000));
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W, 
          y: Math.random() * H, 
          r: rand(0.3, 1.2), 
          b: rand(0.08, 0.5), 
          tw: rand(0, 6.28), 
          ts: rand(0.3, 1)
        });
      }
    }

    function draw() {
      t += 1;
      ctx!.clearRect(0, 0, W, H);
      for (const s of stars) {
        const tw = RM ? 1 : (0.5 + 0.5 * Math.sin(t * 0.012 * s.ts + s.tw));
        ctx!.globalAlpha = s.b * tw;
        ctx!.fillStyle = "#cfe3ff";
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, 6.283);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      if (!RM) animFrame = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    if (RM) draw(); else animFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  return <canvas ref={canvasRef} id="bgStars" aria-hidden="true"></canvas>;
}
