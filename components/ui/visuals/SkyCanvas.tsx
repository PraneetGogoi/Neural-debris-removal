'use client';

import React, { useEffect, useRef } from 'react';

export function SkyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    
    const x = c.getContext("2d");
    if (!x) return;

    const RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let W = 0, H = 0, scanY = 0, t = 0;
    let stars: any[] = [];
    let streaks: any[] = [];
    let comets: any[] = [];
    let reqId: number;

    function spawnComet() {
      const fromLeft = Math.random() < 0.5;
      comets.push({
        x: fromLeft ? -30 : W + 30,
        y: rand(H * 0.04, H * 0.5),
        vx: (fromLeft ? 1 : -1) * rand(5, 8),
        vy: rand(1.2, 2.6),
        life: 0
      });
    }

    function seed() {
      stars = [];
      const n = Math.min(220, Math.floor((W * H) / 4000));
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: rand(0.3, 1.4),
          b: rand(0.15, 0.85),
          tw: rand(0, 6.28),
          ts: rand(0.4, 1.4)
        });
      }
      streaks = [];
      const ns = Math.max(3, Math.min(6, Math.floor(W / 120)));
      for (let i = 0; i < ns; i++) {
        streaks.push(newStreak());
      }
      if (RM) {
        streaks.forEach((s, i) => {
          s.acq = 1;
          s.verdict = i % 3 === 0 ? "poison" : "clean";
          s.life = 1;
        });
      }
    }

    function newStreak() {
      const ang = rand(-Math.PI, Math.PI), len = rand(26, 80);
      const cx = rand(W * 0.16, W * 0.84), cy = rand(H * 0.16, H * 0.84);
      return {
        cx, cy, ang, len, w: rand(1, 1.8), b: rand(0.5, 1),
        acq: 0, verdict: null, life: 0, born: t, scanned: false,
        conf: rand(0.42, 0.95), ppois: 0,
        drift: { x: Math.cos(ang) * rand(-0.03, 0.03), y: Math.sin(ang) * rand(-0.03, 0.03) }
      };
    }

    function endpts(s: any) {
      const dx = Math.cos(s.ang) * s.len / 2, dy = Math.sin(s.ang) * s.len / 2;
      return [s.cx - dx, s.cy - dy, s.cx + dx, s.cy + dy];
    }

    function resize() {
      if (!c) return;
      // Get the display size of the canvas.
      // Use parent container to determine size if canvas doesn't have inherent layout.
      const parent = c.parentElement;
      if (parent) {
         W = parent.clientWidth;
         H = parent.clientHeight;
      } else {
         W = c.clientWidth;
         H = c.clientHeight;
      }
      
      c.width = W * DPR;
      c.height = H * DPR;
      x!.setTransform(DPR, 0, 0, DPR, 0, 0);
      seed();
    }

    function draw() {
      t += 1;
      x!.clearRect(0, 0, W, H);
      
      const g = x!.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, Math.max(W, H) * 0.8);
      g.addColorStop(0, "#0d141d");
      g.addColorStop(0.5, "#0a0e15");
      g.addColorStop(1, "#050709");
      x!.fillStyle = g;
      x!.fillRect(0, 0, W, H);
      
      for (const s of stars) {
        const tw = RM ? 1 : (0.55 + 0.45 * Math.sin(t * 0.02 * s.ts + s.tw));
        x!.globalAlpha = s.b * tw;
        x!.fillStyle = "#cfe3ff";
        x!.beginPath();
        x!.arc(s.x, s.y, s.r, 0, 6.283);
        x!.fill();
      }
      x!.globalAlpha = 1;

      if (!RM) {
        scanY += H / 420;
        if (scanY > H + 20) scanY = -20;
        const sg = x!.createLinearGradient(0, scanY - 18, 0, scanY + 18);
        sg.addColorStop(0, "rgba(74,222,154,0)");
        sg.addColorStop(0.5, "rgba(74,222,154,.12)");
        sg.addColorStop(1, "rgba(74,222,154,0)");
        x!.fillStyle = sg;
        x!.fillRect(0, scanY - 18, W, 36);
        x!.strokeStyle = "rgba(74,222,154,.5)";
        x!.lineWidth = 1;
        x!.beginPath();
        x!.moveTo(0, scanY);
        x!.lineTo(W, scanY);
        x!.stroke();
      }

      if (!RM) {
        if (Math.random() < 0.0015) spawnComet();
        for (let i = comets.length - 1; i >= 0; i--) {
          const cm = comets[i];
          cm.x += cm.vx; cm.y += cm.vy; cm.life += 0.022;
          if (cm.x < -50 || cm.x > W + 50 || cm.y > H + 50 || cm.life >= 1) {
            comets.splice(i, 1);
            continue;
          }
          const a = cm.life < 0.15 ? cm.life / 0.15 : (cm.life > 0.78 ? (1 - cm.life) / 0.22 : 1);
          x!.save();
          x!.globalAlpha = a;
          const tx0 = cm.x - cm.vx * 3, ty0 = cm.y - cm.vy * 3;
          const grad = x!.createLinearGradient(tx0, ty0, cm.x, cm.y);
          grad.addColorStop(0, "rgba(233,238,245,0)");
          grad.addColorStop(1, "rgba(233,238,245,.9)");
          x!.strokeStyle = grad;
          x!.lineWidth = 1;
          x!.lineCap = "round";
          x!.beginPath();
          x!.moveTo(tx0, ty0);
          x!.lineTo(cm.x, cm.y);
          x!.stroke();
          x!.fillStyle = "#fff";
          x!.beginPath();
          x!.arc(cm.x, cm.y, 1, 0, 6.283);
          x!.fill();
          x!.restore();
        }
      }

      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        if (!RM) {
          s.cx += s.drift.x;
          s.cy += s.drift.y;
        }
        if (!RM && !s.scanned && Math.abs(scanY - s.cy) < 5) {
          s.scanned = true;
        }
        if (s.scanned && s.acq < 1) {
          s.acq = Math.min(1, s.acq + 0.05);
          if (s.acq >= 1 && !s.verdict) {
            s.ppois = Math.random();
            s.verdict = s.ppois > 0.62 ? "poison" : "clean";
          }
        }
        if (RM) { s.acq = 1; }
        
        const [ax, ay, bx, by] = endpts(s);
        const col = s.verdict === "poison" ? "#ff6b6b" : (s.verdict === "clean" ? "#4ade9a" : "#aecbe6");
        const fade = s.verdict === "poison" && s.life > 0 ? (1 - s.life * 0.7) : 1;
        
        x!.save();
        x!.globalAlpha = 0.9 * fade;
        x!.strokeStyle = col;
        x!.lineWidth = s.w + 1.6;
        x!.lineCap = "round";
        x!.shadowColor = col;
        x!.shadowBlur = 8;
        x!.beginPath(); x!.moveTo(ax, ay); x!.lineTo(bx, by); x!.stroke();
        
        x!.shadowBlur = 0;
        x!.globalAlpha = fade;
        x!.strokeStyle = "#eaf3ff";
        x!.lineWidth = Math.max(0.5, s.w - 0.3);
        x!.beginPath(); x!.moveTo(ax, ay); x!.lineTo(bx, by); x!.stroke();
        x!.restore();

        if (s.acq > 0 && W > 180) {
          const pad = 6 + s.w;
          const minx = Math.min(ax, bx) - pad, miny = Math.min(ay, by) - pad, maxx = Math.max(ax, bx) + pad, maxy = Math.max(ay, by) + pad;
          const bw = maxx - minx, bh = maxy - miny;
          const p = s.acq;
          
          x!.save();
          x!.globalAlpha = (s.verdict === "poison" ? fade : 1) * Math.min(1, p * 1.2);
          x!.strokeStyle = col;
          x!.lineWidth = 1;
          const L = Math.min(9, bw * 0.3, bh * 0.3) * p + 2;
          const corners = [[minx, miny, 1, 1], [maxx, miny, -1, 1], [minx, maxy, 1, -1], [maxx, maxy, -1, -1]];
          for (const [cx0, cy0, sx, sy] of corners) {
            x!.beginPath();
            x!.moveTo(cx0, cy0 + sy * L);
            x!.lineTo(cx0, cy0);
            x!.lineTo(cx0 + sx * L, cy0);
            x!.stroke();
          }
          x!.restore();
        }

        if (s.verdict === "poison" && s.acq >= 1) {
          s.life += 0.008;
          if (s.life >= 1) { streaks[i] = newStreak(); }
        }
        if (s.verdict === "clean" && s.acq >= 1) {
          s.life += 0.0025;
          if (s.life >= 1) { streaks[i] = newStreak(); }
        }
      }
      
      if (!RM) {
        reqId = requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    
    if (RM) {
      draw();
    } else {
      reqId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return <canvas id="skyCanvas" ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }}></canvas>;
}
