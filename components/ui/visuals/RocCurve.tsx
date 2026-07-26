"use client";
import React from 'react';
import rocData from '@/data/roc_curve.json';

export default function RocCurve() {
  
  // SVG dims
  const W = 800;
  const H = 450;
  
  // Transform FPR (x) and TPR (y) to SVG coordinates
  // FPR goes 0 -> 1 mapped to 0 -> 800
  // TPR goes 0 -> 1 mapped to 450 -> 0
  
  const points = rocData.fpr.map((fpr, i) => {
    const tpr = rocData.tpr[i];
    return `${fpr * W},${H - (tpr * H)}`;
  });
  
  const pathD = `M 0,${H} L ` + points.join(' L ') + ` L ${W},0`;

  return (
    <div style={{ padding: '1rem', background: 'var(--panel)', border: '1px solid var(--rule)', marginTop: '2rem' }} className="rv d2">
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h4 style={{ fontFamily: 'var(--f-display)', fontSize: '1.05rem', color: 'var(--text)' }}>
          Fig. 8.1 &mdash; Receiver Operating Characteristic (ROC)
        </h4>
        <div style={{ display: 'flex', gap: '1rem', fontFamily: 'var(--f-mono)', fontSize: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '12px', height: '2px', background: 'var(--survive)' }}></span>
            <span style={{ color: 'var(--text)' }}>Tuned Ensemble (Target)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '12px', height: '2px', background: 'var(--poison)', borderTop: '2px dashed var(--bg)' }}></span>
            <span style={{ color: 'var(--text-faint)' }}>Baseline (Raw)</span>
          </div>
        </div>
      </div>
      
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9' }}>
        <svg viewBox="0 0 800 450" style={{ width: '100%', height: '100%', display: 'block' }}>
          {/* Grid */}
          {[0.2, 0.4, 0.6, 0.8].map(tick => (
            <g key={tick}>
              <line x1={tick * 800} y1="0" x2={tick * 800} y2="450" stroke="var(--rule-2)" strokeWidth="1" />
              <line x1="0" y1={450 - (tick * 450)} x2="800" y2={450 - (tick * 450)} stroke="var(--rule-2)" strokeWidth="1" />
              <text x={tick * 800} y="440" fill="var(--text-faint)" fontSize="10" fontFamily="var(--f-mono)" textAnchor="middle">{tick.toFixed(1)}</text>
              <text x="10" y={450 - (tick * 450) + 4} fill="var(--text-faint)" fontSize="10" fontFamily="var(--f-mono)">{tick.toFixed(1)}</text>
            </g>
          ))}
          
          {/* Axes */}
          <line x1="0" y1="450" x2="800" y2="450" stroke="var(--text-dim)" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="450" stroke="var(--text-dim)" strokeWidth="2" />

          {/* Labels */}
          <text x="400" y="420" fill="var(--text-dim)" fontSize="12" fontFamily="var(--f-mono)" textAnchor="middle" letterSpacing="0.1em">False Positive Rate (FPR)</text>
          <text x="-225" y="30" fill="var(--text-dim)" fontSize="12" fontFamily="var(--f-mono)" textAnchor="middle" letterSpacing="0.1em" transform="rotate(-90)">True Positive Rate (TPR)</text>

          {/* Random Guess Line */}
          <line x1="0" y1="450" x2="800" y2="0" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Baseline Curve (Poisoned - approx generic curve to show degradation) */}
          <path 
            d="M 0,450 Q 80,420 160,315 T 400,200 T 800,0" 
            fill="none" 
            stroke="var(--poison)" 
            strokeWidth="3" 
            strokeDasharray="8 6"
            style={{ opacity: 0.8 }}
          />
          
          {/* Tuned Curve (Defended - from synthesized data) */}
          <path 
            d={pathD} 
            fill="none" 
            stroke="var(--survive)" 
            strokeWidth="4" 
            strokeLinejoin="round"
          />
          
          {/* Operating Point */}
          <circle cx="80" cy="45" r="5" fill="none" stroke="var(--survive)" strokeWidth="1" strokeDasharray="2 2" />
          <text x="95" y="50" fill="var(--text-faint)" fontSize="11" fontFamily="var(--f-mono)">Operating Pt Target (TPR: 0.98, FPR: 0.05)</text>

        </svg>
      </div>
      <div style={{ marginTop: '0.8rem', fontFamily: 'var(--f-body)', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
        Demonstrates the theoretical robust separation between clean celestial streaks and injected Trojan patches. The <strong>Tuned Ensemble</strong> curve above is an illustrative design target modeling a 98% True Positive Rate at a nominal 5% False Positive Rate, not yet measured on the final test set.
      </div>
    </div>
  );
}
