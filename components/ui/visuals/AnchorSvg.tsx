import React from 'react';

export default function AnchorSvg() {
  const ratios = [0.1, 0.2, 0.5, 1.0, 2.0, 5.0, 10.0];
  const cy = 100;
  const slot = 900 / ratios.length;
  const base = 62;

  return (
    <svg id="anchorSvg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 900 220" aria-label="Diagram showing feature extraction and unlearning points" role="img">
      {ratios.map((r, i) => {
        const cx = slot * i + slot / 2;
        let w = base * Math.sqrt(r);
        let h = base / Math.sqrt(r);
        w = Math.min(w, slot * 0.86);
        h = Math.min(h, 160);
        
        const isStreak = r <= 0.2 || r >= 5;
        
        return (
          <g key={r}>
            <rect
              x={cx - w / 2}
              y={cy - h / 2}
              width={w}
              height={h}
              rx={1}
              fill={isStreak ? "rgba(232,230,222,.1)" : "rgba(232,230,222,.03)"}
              stroke={isStreak ? "#e8e6de" : "rgba(232,230,222,.35)"}
              strokeWidth="1.2"
            />
            <text
              x={cx}
              y={190}
              textAnchor="middle"
              fill={isStreak ? "#e8e6de" : "#66625a"}
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="11"
            >
              {r.toFixed(1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
