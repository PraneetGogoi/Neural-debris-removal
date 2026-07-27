'use client';

import { useEffect, useRef } from 'react';

export default function ScatterCanvas({ width = 560, height = 440 }: { width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext('2d');
    if (!x) return;

    const RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = c.width, H = c.height;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let rngS = 1337;
    const R = () => {
      rngS = (rngS * 1103515245 + 12345) & 0x7fffffff;
      return rngS / 0x7fffffff;
    };

    const ccx = W * 0.5, ccy = H * 0.5, cloud: any[] = [];
    for (let i = 0; i < 1400; i++) {
      let u = R() || 1e-6, v = R();
      let g1 = Math.sqrt(-2 * Math.log(u)) * Math.cos(6.283 * v);
      let g2 = Math.sqrt(-2 * Math.log(u)) * Math.sin(6.283 * v);
      const px = ccx + g1 * W * 0.14 + g2 * W * 0.05;
      const py = ccy + g2 * H * 0.15 - g1 * H * 0.03;
      const d = Math.hypot((px - ccx) / W, (py - ccy) / H);
      cloud.push({ px, py, base: Math.max(0.06, 0.5 - d * 1.1), ph: Math.random() * 6.283, sp: rand(0.3, 1) });
    }

    const pts = [[0.44, 0.52], [0.52, 0.46], [0.48, 0.58], [0.57, 0.55], [0.4, 0.47], [0.53, 0.6], [0.46, 0.43], [0.6, 0.5], [0.5, 0.53], [0.43, 0.56]];
    let t = 0;
    let animFrame: number;

    function draw() {
      t += 1;
      x!.clearRect(0, 0, W, H);
      x!.fillStyle = "#07090e";
      x!.fillRect(0, 0, W, H);
      x!.strokeStyle = "rgba(232,230,222,.06)";
      x!.lineWidth = 1;
      
      for (let i = 1; i < 8; i++) {
        x!.beginPath(); x!.moveTo(i * W / 8, 0); x!.lineTo(i * W / 8, H); x!.stroke();
        x!.beginPath(); x!.moveTo(0, i * H / 8); x!.lineTo(W, i * H / 8); x!.stroke();
      }
      
      x!.fillStyle = "#66625a";
      x!.font = "10px 'IBM Plex Mono', monospace";
      x!.fillText("log h", 8, 18);
      x!.save();
      x!.translate(W - 14, H - 8);
      x!.fillText("log w →", -46, 0);
      x!.restore();
      
      for (const p of cloud) {
        const tw = RM ? 1 : (0.72 + 0.28 * Math.sin(t * 0.02 * p.sp + p.ph));
        x!.globalAlpha = p.base * tw;
        x!.fillStyle = "#4c74a0";
        x!.beginPath(); x!.arc(p.px, p.py, 1.5, 0, 6.283); x!.fill();
      }
      
      x!.globalAlpha = 1;
      const pulse = RM ? 5 : (5 + 2.5 * Math.sin(t * 0.05));
      x!.strokeStyle = "#ff6b6b";
      x!.lineWidth = 2;
      x!.shadowColor = "rgba(255,107,107,.55)";
      x!.shadowBlur = pulse;
      
      for (const [fx, fy] of pts) {
        const px = fx * W, py = fy * H, s = 5;
        x!.beginPath();
        x!.moveTo(px - s, py - s); x!.lineTo(px + s, py + s);
        x!.moveTo(px + s, py - s); x!.lineTo(px - s, py + s);
        x!.stroke();
      }
      
      x!.shadowBlur = 0;
      if (!RM) animFrame = requestAnimationFrame(draw);
    }
    
    draw();

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} id="scatterCanvas" aria-label="Scatter plot showing decision boundaries and confidence scores" role="img" />;
}
