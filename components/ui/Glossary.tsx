'use client';

import React, { useState } from 'react';

const terms = [
  { term: 'p_poison', def: 'Fused probability that a bounding box contains a trigger. Derived from appearance, geometric, and spectral signals.' },
  { term: 'maCADD', def: 'Surrogate celestial object matching metric computed via Hungarian assignment across multiple IoU thresholds (0.2–0.9).' },
  { term: 'A_FACTOR', def: 'Asymmetric penalty factor (typically 1/10). False positive trigger deletions are heavily discounted compared to true streak deletions.' },
  { term: 'ε (epsilon)', def: 'The noise-floor confidence value to which identified poison boxes are demoted, rather than being hard-deleted.' },
  { term: 'MIN_KEEP', def: 'Absolute score threshold below which all candidates are dropped entirely to prevent noise spam.' },
  { term: 'P_HI', def: 'The confidence threshold above which a candidate is flagged as poison and demoted to ε.' },
  { term: 'P_LO', def: 'The confidence threshold below which a candidate is trusted as clean.' },
];

export default function Glossary() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--panel)',
          border: '1px solid var(--rule)',
          color: 'var(--text)',
          padding: '0.6rem 1rem',
          fontFamily: 'var(--f-mono)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          zIndex: 9998,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        <span style={{color: 'var(--survive)'}}>&#x2139;</span> Glossary
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 10000,
          display: 'flex',
          justifyContent: 'flex-end'
        }} onClick={() => setIsOpen(false)}>
          <div 
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '100%',
              background: 'var(--bg)',
              borderLeft: '1px solid var(--rule)',
              padding: '2rem',
              overflowY: 'auto',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--rule)', paddingBottom: '1rem' }}>
              <h2 style={{ fontFamily: 'var(--f-display)', fontSize: '1.4rem', margin: 0, color: 'var(--text)' }}>Terminology</h2>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {terms.map(t => (
                <div key={t.term}>
                  <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.85rem', color: 'var(--survive)', marginBottom: '0.3rem', fontWeight: 700 }}>
                    {t.term}
                  </div>
                  <div style={{ fontFamily: 'var(--f-serif)', fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                    {t.def}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
