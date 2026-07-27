'use client';

import React, { useState, useEffect } from 'react';

const termsByChapter = [
  {
    chapter: 'III. Methodology',
    terms: [
      { id: 's', term: 's', def: 'raw confidence score output by the poisoned detector for a candidate box', anchor: 'pipeline' },
      { id: 'p_poison', term: 'p_poison', def: 'fused poison probability for a candidate, in [0, 1]', anchor: 'pipeline' },
      { id: 'p_hi', term: 'P_HI, P_LO', def: 'upper / lower thresholds on p_poison bounding the remap ramp', anchor: 'pipeline' },
      { id: 'min_keep', term: 'MIN_KEEP', def: 'score floor below which a candidate is dropped outright', anchor: 'pipeline' },
      { id: 'epsilon', term: 'ε (epsilon)', def: 'the demotion floor (0.01) a flagged box is remapped to, instead of 0', anchor: 'pipeline' },
      { id: 'iou', term: 'IoU', def: 'intersection-over-union, used for matching in survival scoring and in maCADD', anchor: 'pipeline' },
    ]
  },
  {
    chapter: 'VI. Scoring',
    terms: [
      { id: 'macadd', term: 'maCADD', def: 'Surrogate celestial object matching metric computed via Hungarian assignment across multiple IoU thresholds (0.2–0.9).', anchor: 'metric' },
      { id: 'a_factor', term: 'A_FACTOR', def: 'Asymmetric penalty factor (typically 1/10). False positive trigger deletions are heavily discounted compared to true streak deletions.', anchor: 'metric' },
    ]
  }
];

export default function Glossary() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenGlossary = (e: CustomEvent) => {
      setIsOpen(true);
      const termId = e.detail?.term;
      if (termId) {
        setTimeout(() => {
          const el = document.getElementById(`glossary-${termId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Flash effect to highlight the term
            el.style.backgroundColor = 'var(--glow-trust)';
            setTimeout(() => {
              el.style.backgroundColor = 'transparent';
              el.style.transition = 'background-color 1s ease';
            }, 500);
          }
        }, 100); // small delay to allow panel to render
      }
    };
    
    window.addEventListener('open-glossary', handleOpenGlossary as EventListener);
    return () => window.removeEventListener('open-glossary', handleOpenGlossary as EventListener);
  }, []);

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
          letterSpacing: '0.05em',
          borderRadius: '999px',
          transition: 'all 0.2s var(--ease)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--survive)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--rule)'}
      >
        <span style={{color: 'var(--survive)'}}>&#x2139;</span> Glossary
      </button>

      {/* Slide-out panel */}
      <div style={{
        position: 'fixed',
        top: 0, bottom: 0, right: 0,
        width: 'min(90vw, 360px)',
        background: 'var(--panel)',
        borderLeft: '1px solid var(--rule)',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.25)',
        zIndex: 10000,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--rule)'
        }}>
          <h2 style={{ fontFamily: 'var(--f-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, color: 'var(--text)' }}>Terminology</h2>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', fontSize: '1.4rem', lineHeight: 1 }}
          >
            &times;
          </button>
        </div>
        
        {/* Content */}
        <div style={{ padding: '0 1.5rem 2rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          {termsByChapter.map(group => (
            <div key={group.chapter} style={{ marginTop: '2rem' }}>
              <h3 style={{ 
                fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', 
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
                borderBottom: '1px dashed var(--rule-2)', paddingBottom: '0.4rem'
              }}>
                {group.chapter}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {group.terms.map(t => (
                  <div key={t.id} id={`glossary-${t.id}`} style={{ padding: '0.4rem -0.4rem' }}>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline' }}>
                      <div className="sym" style={{ fontFamily: 'var(--f-mono)', fontSize: '0.85rem', color: 'var(--survive)' }}>
                        {t.term}
                      </div>
                    </div>
                    <div className="def" style={{ fontFamily: 'var(--f-serif)', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.5, marginTop: '0.3rem' }}>
                      {t.def}
                    </div>
                    <a href={`#${t.anchor}`} 
                       onClick={() => setIsOpen(false)}
                       style={{ 
                         display: 'inline-block', marginTop: '0.4rem', fontFamily: 'var(--f-mono)', 
                         fontSize: '0.6rem', color: 'var(--text-faint)', textDecoration: 'none',
                         transition: 'color 0.2s'
                       }}
                       onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-faint)'}
                    >
                      &rarr; first appears in &sect;{t.anchor === 'pipeline' ? '3' : '6'}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 9999,
          }} 
        />
      )}
    </>
  );
}
