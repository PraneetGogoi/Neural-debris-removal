'use client';

import React, { useState, useEffect, useRef } from 'react';

const PRESETS = {
  cons: { P_HI: 0.65, P_LO: 0.30, MIN_KEEP: 0.20, BOOST: false },
  aggr: { P_HI: 0.50, P_LO: 0.30, MIN_KEEP: 0.12, BOOST: false }
};

export default function DecisionSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [pHi, setPHi] = useState(0.65);
  const [pLo, setPLo] = useState(0.30);
  const [minKeep, setMinKeep] = useState(0.20);
  const [boost, setBoost] = useState(false);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const x = cv.getContext('2d');
    if (!x) return;

    const N = 150;
    const off = document.createElement("canvas");
    off.width = N;
    off.height = N;
    const octx = off.getContext("2d");
    if (!octx) return;
    const img = octx.createImageData(N, N);
    
    const S_MIN = 0.05, S_MAX = 1.0;
    const R = { P_HI: pHi, P_LO: pLo, MIN_KEEP: minKeep, BOOST: boost, S_CONF: 0.50, C_MAX: 0.95, EPS: 0.01 };

    function remap(s: number, p: number) {
      if (s < R.MIN_KEEP) return 0.0;
      if (p >= R.P_HI) return R.EPS;
      if (p <= R.P_LO) { if (R.BOOST && s >= R.S_CONF) return R.C_MAX; return s; }
      const frac = (p - R.P_LO) / Math.max(R.P_HI - R.P_LO, 1e-6);
      return Math.max(R.EPS, s * (1 - frac));
    }
    
    const stops = [
      [0, 225, 29, 72],
      [0.3, 110, 20, 50],
      [0.6, 25, 60, 60],
      [1, 16, 185, 129]
    ];
    
    function rdylgn(v: number) {
      v = Math.max(0, Math.min(1, v));
      for (let i = 0; i < stops.length - 1; i++) {
        const a = stops[i], b = stops[i + 1];
        if (v >= a[0] && v <= b[0]) {
          const f = (v - a[0]) / (b[0] - a[0]);
          return [
            a[1] + (b[1] - a[1]) * f,
            a[2] + (b[2] - a[2]) * f,
            a[3] + (b[3] - a[3]) * f
          ];
        }
      }
      return [16, 185, 129];
    }

    for (let yi = 0; yi < N; yi++) {
      const p = 1 - yi / (N - 1);
      for (let xi = 0; xi < N; xi++) {
        const s = S_MIN + (xi / (N - 1)) * (S_MAX - S_MIN);
        const v = remap(s, p);
        let col;
        if (s < R.MIN_KEEP) { col = [18, 20, 26]; }
        else col = rdylgn(v);
        const idx = (yi * N + xi) * 4;
        img.data[idx] = col[0];
        img.data[idx + 1] = col[1];
        img.data[idx + 2] = col[2];
        img.data[idx + 3] = 255;
      }
    }
    
    octx.putImageData(img, 0, 0);
    x.imageSmoothingEnabled = true;
    x.clearRect(0, 0, cv.width, cv.height);
    x.drawImage(off, 0, 0, cv.width, cv.height);
    
    const W = cv.width, H = cv.height;
    const sx = (v: number) => ((v - S_MIN) / (S_MAX - S_MIN)) * W;
    const py = (v: number) => (1 - v) * H;
    
    x.lineWidth = 1.5;
    x.setLineDash([5, 4]);
    
    x.strokeStyle = "rgba(228,228,223,.7)";
    x.beginPath(); x.moveTo(sx(R.MIN_KEEP), 0); x.lineTo(sx(R.MIN_KEEP), H); x.stroke();
    
    x.strokeStyle = "rgba(225,29,72,.85)";
    x.beginPath(); x.moveTo(0, py(R.P_HI)); x.lineTo(W, py(R.P_HI)); x.stroke();
    
    x.strokeStyle = "rgba(16,185,129,.85)";
    x.beginPath(); x.moveTo(0, py(R.P_LO)); x.lineTo(W, py(R.P_LO)); x.stroke();
    
    x.setLineDash([]);
    x.font = "600 9px var(--f-mono), monospace";
    x.fillStyle = "rgba(225,29,72,.95)";
    x.fillText("P_HI", sx(R.MIN_KEEP) + 6, py(R.P_HI) - 4);
    x.fillStyle = "rgba(16,185,129,.95)";
    x.fillText("P_LO", sx(R.MIN_KEEP) + 6, py(R.P_LO) + 11);
    
    x.fillStyle = "rgba(228,228,223,.9)";
    x.save();
    x.translate(sx(R.MIN_KEEP) - 4, H - 6);
    x.rotate(-Math.PI / 2);
    x.fillText("MIN_KEEP", 0, 0);
    x.restore();

  }, [pHi, pLo, minKeep, boost]);

  const handlePHiChange = (v: number) => {
    let newPHi = v;
    let newPLo = pLo;
    if (newPLo >= newPHi - 0.02) {
      newPLo = Math.max(0.10, newPHi - 0.05);
    }
    setPHi(newPHi);
    setPLo(newPLo);
  };

  const handlePLoChange = (v: number) => {
    let newPLo = v;
    let newPHi = pHi;
    if (newPLo >= newPHi - 0.02) {
      newPHi = Math.min(0.90, newPLo + 0.05);
    }
    setPLo(newPLo);
    setPHi(newPHi);
  };

  const getPct = (v: number, min: number, max: number) => ((v - min) / (max - min)) * 100 + "%";

  const isPreset = (p: {P_HI: number, P_LO: number, MIN_KEEP: number, BOOST: boolean}) => {
    return Math.abs(p.P_HI - pHi) < 0.005 && 
           Math.abs(p.P_LO - pLo) < 0.005 && 
           Math.abs(p.MIN_KEEP - minKeep) < 0.005 && 
           p.BOOST === boost;
  };

  return (
    <div className="console-body">
      <div className="heat-wrap">
        <div className="heat-frame">
          <canvas height={360} width={440} ref={canvasRef} id="heatCanvas"></canvas>
          <div className="ax-y" id="axY">
            {[0, 0.25, 0.5, 0.75, 1].map(v => <span key={v}>{v.toFixed(2)}</span>)}
          </div>
          <div className="ax-x" id="axX">
            {[0.05, 0.25, 0.5, 0.75, 1].map(v => <span key={v}>{v.toFixed(2)}</span>)}
          </div>
          <div className="ax-title yt">p_poison &rarr;</div>
          <div className="ax-title xt">base score s &rarr;</div>
        </div>
        <div className="heat-legend"><span>DROP / &epsilon;</span><span className="grad" style={{background: 'linear-gradient(90deg, #e11d48, #6e1432, #193c3c, #10b981)'}}></span><span>KEEP</span></div>
        <div className="zonekey">
          <div><i style={{ background: '#10b981' }}></i>trust (p &le; P_LO)</div>
          <div><i style={{ background: '#e11d48' }}></i>flag &rarr; &epsilon; (p &ge; P_HI)</div>
          <div><i style={{ background: '#193c3c' }}></i>ramp-down</div>
          <div><i style={{ background: '#12141a' }}></i>dropped (s &lt; MIN_KEEP)</div>
        </div>
      </div>
      <div className="controls">
        <div className="ctrl-head">Thresholds</div>
        <div className="ch-sub">// every knob moves a boundary at left</div>
        
        <label className="slider rd" htmlFor="pHi">
          <div className="top"><span className="name">P_HI <em>flag above</em></span><span className="num" id="pHiV">{pHi.toFixed(2)}</span></div>
          <input className="rd" id="pHi" max="0.90" min="0.35" step="0.01" type="range" 
                 value={pHi} onChange={e => handlePHiChange(+e.target.value)}
                 style={{ '--pct': getPct(pHi, 0.35, 0.90) } as React.CSSProperties} />
        </label>
        
        <label className="slider" htmlFor="pLo">
          <div className="top"><span className="name">P_LO <em>trust below</em></span><span className="num" id="pLoV">{pLo.toFixed(2)}</span></div>
          <input id="pLo" max="0.50" min="0.10" step="0.01" type="range" 
                 value={pLo} onChange={e => handlePLoChange(+e.target.value)}
                 style={{ '--pct': getPct(pLo, 0.10, 0.50) } as React.CSSProperties} />
        </label>
        
        <label className="slider" htmlFor="mk">
          <div className="top"><span className="name">MIN_KEEP <em>drop below</em></span><span className="num" id="mkV">{minKeep.toFixed(2)}</span></div>
          <input id="mk" max="0.40" min="0.03" step="0.01" type="range" 
                 value={minKeep} onChange={e => setMinKeep(+e.target.value)}
                 style={{ '--pct': getPct(minKeep, 0.03, 0.40) } as React.CSSProperties} />
        </label>
        
        <div className="toggle-row">
          <div><div className="t">BOOST</div><div className="s">trusted &amp; strong &rarr; 0.95</div></div>
          <label className="sw">
            <input id="boost" type="checkbox" checked={boost} onChange={e => setBoost(e.target.checked)} />
            <span className="track"></span><span className="knob"></span>
          </label>
        </div>
        
        <div className="presets">
          <button className={`preset ${isPreset(PRESETS.cons) ? 'on' : ''}`} onClick={() => {
            setPHi(PRESETS.cons.P_HI); setPLo(PRESETS.cons.P_LO); setMinKeep(PRESETS.cons.MIN_KEEP); setBoost(PRESETS.cons.BOOST);
          }}>Conservative</button>
          <button className={`preset ${isPreset(PRESETS.aggr) ? 'on' : ''}`} onClick={() => {
            setPHi(PRESETS.aggr.P_HI); setPLo(PRESETS.aggr.P_LO); setMinKeep(PRESETS.aggr.MIN_KEEP); setBoost(PRESETS.aggr.BOOST);
          }}>Aggressive</button>
        </div>
        
        <div className="readout-mini">
          <div id="cfgOut">P_HI {pHi.toFixed(2)} &middot; P_LO {pLo.toFixed(2)} &middot; MIN_KEEP {minKeep.toFixed(2)} &middot; BOOST {boost ? 'on' : 'off'}</div>
          <div style={{ marginTop: '.4rem' }}>
            <span className="k">EPS</span> <span className="v">0.01</span> &middot; <span className="k">S_CONF</span> <span className="v">0.50</span> &middot; <span className="k">C_MAX</span> <span className="v">0.95</span>
          </div>
        </div>
      </div>
    </div>
  );
}
