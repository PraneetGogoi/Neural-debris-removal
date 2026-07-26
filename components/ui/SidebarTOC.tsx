'use client';

import React, { useState, useEffect } from 'react';

export function SidebarTOC() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Instead of auto-collapsing on scroll, let's keep it open until user toggles,
    // or just let CSS handle it. The user said: "collapse into a small '≡ Contents' toggle after the reader scrolls past the hero".
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        document.body.classList.add("toc-can-collapse");
      } else {
        document.body.classList.remove("toc-can-collapse");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button 
        className="toc-toggle" 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '5.4rem',
          left: '1rem',
          zIndex: 501,
          background: 'var(--panel)',
          border: '1px solid var(--rule)',
          color: 'var(--text)',
          padding: '0.4rem 0.8rem',
          fontFamily: 'var(--f-mono)',
          fontSize: '0.7rem',
          borderRadius: '4px',
          cursor: 'pointer',
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto',
          transition: 'all 0.3s var(--ease)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        &equiv; Contents
      </button>

      <aside className={`toc-aside ${isOpen ? 'open' : 'closed'}`} id="tocAside">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.9rem' }}>
          <div className="th" style={{ marginBottom: 0 }}>Contents</div>
          <button 
            onClick={() => setIsOpen(false)}
            className="toc-close-btn"
            style={{
              background: 'none', border: 'none', color: 'var(--text-faint)', 
              cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1, padding: 0
            }}
          >
            &times;
          </button>
        </div>
        
        <div style={{ position: 'relative' }}>
          <div id="tocProgress" style={{
            position: 'absolute',
            top: 0, bottom: 0, left: '-1px',
            width: '2px',
            background: 'var(--survive)',
            transformOrigin: 'top',
            transform: 'scaleY(0)',
            zIndex: 1,
            transition: 'transform .1s linear'
          }}></div>
          
          <ol style={{ position: 'relative', zIndex: 2, borderLeft: '1px solid var(--rule)' }}>
            <li><a href="#breach" data-target="breach"><b>I.</b> The Breach</a></li>
            <li><a href="#related" data-target="related"><b>II.</b> Related Work</a></li>
            <li className="has-sub">
              <a href="#pipeline" data-target="pipeline"><b>III.</b> Methodology</a>
              <ul className="sub-toc">
                <li><a href="#pipeline" data-target="pipeline"><b>3.1</b> The Premise</a></li>
                <li><a href="#pipeline" data-target="pipeline"><b>3.2</b> Detection Base</a></li>
                <li><a href="#pipeline" data-target="pipeline"><b>3.3</b> Calibration</a></li>
                <li><a href="#pipeline" data-target="pipeline"><b>3.4</b> Confidence Remap</a></li>
              </ul>
            </li>
            <li><a href="#console" data-target="console"><b>IV.</b> Apparatus</a></li>
            <li><a href="#transplant" data-target="transplant"><b>V.</b> Experiment</a></li>
            <li className="has-sub">
              <a href="#metric" data-target="metric"><b>VI.</b> On Scoring</a>
              <ul className="sub-toc">
                <li><a href="#metric" data-target="metric"><b>VI-A</b> Spectral</a></li>
                <li><a href="#metric" data-target="metric"><b>VI-B</b> Epistemic</a></li>
                <li><a href="#metric" data-target="metric"><b>VI-C</b> Silhouette</a></li>
                <li><a href="#metric" data-target="metric"><b>VI-D</b> Mahalanobis</a></li>
                <li><a href="#metric" data-target="metric"><b>VI-E</b> Reverse-Eng</a></li>
                <li><a href="#metric" data-target="metric"><b>VI-L</b> Conformal</a></li>
              </ul>
            </li>
            <li><a href="#spec" data-target="spec"><b>VII.</b> Specification</a></li>
            <li><a href="#results" data-target="results"><b>VIII.</b> Results</a></li>
            <li><a href="#limitations" data-target="limitations"><b>IX.</b> Limitations</a></li>
            <li style={{marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid var(--rule)'}}><a href="#appendix" data-target="appendix"><b>X.</b> Appendix</a></li>
          </ol>
        </div>
      </aside>
    </>
  );
}
