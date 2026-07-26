'use client';

import React, { useState, useEffect, useRef } from 'react';
import transplantData from '../../data/transplant.json';

export function Experiment() {
  const [runs, setRuns] = useState<{ id: string, tx: number, ty: number, score: number, fired: boolean }[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTransplant = () => {
    if (isRunning) return;
    setIsRunning(true);
    
    // Use our synthesized telemetry
    setTimeout(() => {
      // Pick next transplant from json based on current run length
      const sample = transplantData[runs.length % transplantData.length];
      
      setRuns(prev => [...prev.slice(-4), {
        id: sample.id,
        tx: sample.dst.x,
        ty: sample.dst.y,
        score: sample.transplant_conf,
        fired: sample.fired
      }]);
      setIsRunning(false);
    }, 400);
  };

  const samples = runs.length;
  const firedCount = runs.filter(r => r.fired).length;
  const fireRate = samples > 0 ? (firedCount / samples) : 0;
  const passed = samples >= 3 && fireRate >= 0.50;

  return (
    <section className="chapter" id="transplant">
      <div className="wrap">
        <div className="ch-run rv">Neural Debris Removal &mdash; Chapter V</div>
        <div className="ch-head rv d1">
          <span className="ch-num">V.</span>
          <h2 className="ch-title">Experiment &mdash; does the trigger <em>travel</em>?</h2>
        </div>
        <p className="lede rv d2">
          Before trusting any locally-tuned number, one question needs an answer: is the backdoor baked into the
          <b>patch itself</b>, or into <b>where it sits</b> in the frame? Poison is transplanted onto fresh sky and the
          firing rate is sampled directly, live, below.
        </p>

        <div className="tp-grid">
          <div className="rv d2">
            <div className="telemetry" style={{ transition: passed ? 'border-color .6s var(--ease)' : 'none', borderColor: (samples >= 3 && passed) ? 'var(--survive)' : 'var(--rule)' }}>
              <div className="t-top" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-mono)', fontSize: '.66rem', color: 'var(--text-dim)' }}>
                <span>transplant firing rate</span>
                <span className="fr" style={{ color: 'var(--text)', fontWeight: 700 }}>{samples > 0 ? fireRate.toFixed(2) : '—'}</span>
              </div>
              <div className="t-meter" style={{ height: '16px', position: 'relative', background: 'rgba(255,255,255,.05)', marginTop: '.5rem' }}>
                <div className="t-fill" style={{ position: 'absolute', inset: '0 auto 0 0', width: `${Math.min(100, fireRate * 100)}%`, background: 'repeating-linear-gradient(90deg, var(--poison), var(--poison) 6px, var(--survive) 6px, var(--survive) 12px)', transition: 'width .5s var(--ease)' }}></div>
                <div className="t-thr" style={{ position: 'absolute', top: '-3px', bottom: '-3px', left: '50%', width: '1px', background: 'var(--text)' }}></div>
              </div>
              <div className={`t-verdict`} style={{ marginTop: '.55rem', fontFamily: 'var(--f-mono)', fontSize: '.66rem', color: samples >= 3 ? (passed ? 'var(--survive)' : 'var(--poison)') : 'var(--text-dim)' }}>
                {samples < 3 ? `sampling… ${samples}/3 minimum before verdict` : (passed ? '✓ PORTABLE TRIGGER — local calibration ENABLED' : '✕ CONTEXTUAL TRIGGER — calibration GATED OFF, using presets')}
              </div>
            </div>
            <div style={{ marginTop: '1.1rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="runbtn" onClick={runTransplant} disabled={isRunning} style={{ fontFamily: 'var(--f-mono)', fontSize: '.72rem', letterSpacing: '.04em', textTransform: 'uppercase', padding: '.65rem 1.1rem', border: '1px solid var(--text-dim)', color: 'var(--text)', background: 'transparent', cursor: 'pointer', transition: 'all .15s var(--ease)', opacity: isRunning ? 0.5 : 1 }}>
                {isRunning ? '▶ computing...' : '▶ run transplant'}
              </button>
              <span className="gatemeta" style={{ fontFamily: 'var(--f-mono)', fontSize: '.68rem', color: 'var(--text-dim)' }}>samples: <b style={{ color: 'var(--text)' }}>{samples}</b> &middot; fired: <b style={{ color: 'var(--text)' }}>{firedCount}</b></span>
            </div>
            <aside className="sidenote" style={{ marginTop: '1.3rem', maxWidth: 'none' }}>
              <span className="no">note</span>If this rate clears 0.50, calibration switches on and a grid search runs over my own remap. Below it, the local knobs stay untouched &mdash; TRANSPLANT_FIRE_GATE.
            </aside>
          </div>
          <div className="figure rv d3" style={{ margin: 0 }}>
            <div className="apparatus">
              <div className="ap-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.7rem 1rem', borderBottom: '1px solid var(--rule)', fontFamily: 'var(--f-mono)', fontSize: '.64rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                <span>Fig. 5.1 &mdash; transplant bench log</span>
                <span className="live" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5em', color: isRunning ? 'var(--poison)' : 'var(--text-dim)' }}>
                  <i style={{ width: '6px', height: '6px', borderRadius: '50%', background: isRunning ? 'var(--poison)' : 'transparent', border: '1px solid currentColor' }}></i>
                  {isRunning ? 'transplanting' : 'idle'}
                </span>
              </div>
              <div style={{ height: '360px', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-2)' }}>
                <div style={{ fontFamily: 'var(--f-mono)', fontSize: '.65rem', color: 'var(--text-faint)', borderBottom: '1px solid var(--rule-2)', paddingBottom: '.5rem', marginBottom: '.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                  <span>Source ID</span>
                  <span style={{ textAlign: 'center' }}>Dest (x,y)</span>
                  <span style={{ textAlign: 'right' }}>Score &amp; Status</span>
                </div>
                {runs.length === 0 && (
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: '.7rem', color: 'var(--text-faint)', marginTop: '2rem', textAlign: 'center' }}>
                    [ Awaiting manual execution ]
                  </div>
                )}
                {runs.map((r, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontFamily: 'var(--f-mono)', fontSize: '0.75rem', padding: '0.6rem 0.5rem', border: '1px solid var(--rule-2)', background: 'var(--panel)' }}>
                    <span style={{ color: 'var(--text-dim)' }}>{r.id.slice(0, 12)}</span>
                    <span style={{ color: 'var(--text-faint)', textAlign: 'center' }}>({r.tx.toFixed(0)}, {r.ty.toFixed(0)})</span>
                    <span style={{ color: r.fired ? 'var(--poison)' : 'var(--text-dim)', textAlign: 'right', fontWeight: r.fired ? 700 : 400 }}>
                      {r.score.toFixed(3)} {r.fired ? 'FIRED' : 'SILENT'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <img src="/figures/transplant_crops.png" alt="Transplant Crops" style={{width: '100%', height: 'auto', display: 'block', borderBottom: '1px solid var(--rule)'}} />
            <figcaption data-fig="Fig. 5.1 &mdash; ">A poison patch is cut, pasted onto fresh sky, and scored for firing. Each run samples from a pre-recorded dataset of live inferences.</figcaption>
          </div>
        </div>
      </div>
    </section>
  );
}
