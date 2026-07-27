'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';

export type Term = {
  id: string;
  chapter: string;
  term: string;
  def: string;
  anchor: string;
  example?: string;
  seeAlso?: string[];
  eq?: string;
};

export const masterTerms: Term[] = [
  { id: 's', chapter: 'III. Methodology', term: 's', def: 'raw confidence score output by the poisoned detector for a candidate box', anchor: 'pipeline' },
  { id: 'p_poison', chapter: 'III. Methodology', term: 'p_poison', def: 'fused poison probability for a candidate, in [0, 1]', anchor: 'pipeline', eq: 'Eq. 2' },
  { id: 'p_hi', chapter: 'III. Methodology', term: 'P_HI, P_LO', def: 'upper / lower thresholds on p_poison bounding the remap ramp', anchor: 'pipeline', seeAlso: ['epsilon', 'min_keep'] },
  { id: 'min_keep', chapter: 'III. Methodology', term: 'MIN_KEEP', def: 'score floor below which a candidate is dropped outright', anchor: 'pipeline', seeAlso: ['p_hi', 'epsilon'] },
  { id: 'epsilon', chapter: 'III. Methodology', term: 'ε (epsilon)', def: 'the demotion floor (0.01) a flagged box is remapped to, instead of 0', anchor: 'pipeline', seeAlso: ['p_hi', 'min_keep'] },
  { id: 'iou', chapter: 'III. Methodology', term: 'IoU', def: 'intersection-over-union, used for matching in survival scoring and in maCADD', anchor: 'pipeline' },
  { id: 'macadd', chapter: 'VI. Scoring', term: 'maCADD', def: 'Surrogate celestial object matching metric computed via Hungarian assignment across multiple IoU thresholds (0.2–0.9).', anchor: 'metric', example: 'e.g., a missed poison box costs 0.1 instead of 1.0 in the final score.' },
  { id: 'a_factor', chapter: 'VI. Scoring', term: 'A_FACTOR', def: 'Asymmetric penalty factor (typically 1/10). False positive trigger deletions are heavily discounted compared to true streak deletions.', anchor: 'metric' },
];

export default function Glossary() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'chapter' | 'az'>('chapter');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenGlossary = (e: CustomEvent) => {
      setIsOpen(true);
      const termId = e.detail?.term;
      if (termId) {
        setTimeout(() => {
          const el = document.getElementById(`glossary-${termId}`);
          if (el) {
            // If it's inside a details block, open it
            const details = el.closest('details');
            if (details) details.open = true;
            
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.style.backgroundColor = 'var(--glow-trust)';
            setTimeout(() => {
              el.style.backgroundColor = 'transparent';
              el.style.transition = 'background-color 1s ease';
            }, 500);
          }
        }, 100);
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        setIsOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    };
    
    window.addEventListener('open-glossary', handleOpenGlossary as EventListener);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-glossary', handleOpenGlossary as EventListener);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredTerms = useMemo(() => {
    const q = search.toLowerCase();
    return masterTerms.filter(t => 
      t.term.toLowerCase().includes(q) || 
      t.def.toLowerCase().includes(q)
    );
  }, [search]);

  const groupedTerms = useMemo(() => {
    const groups: Record<string, Term[]> = {};
    filteredTerms.forEach(t => {
      if (!groups[t.chapter]) groups[t.chapter] = [];
      groups[t.chapter].push(t);
    });
    return groups;
  }, [filteredTerms]);

  const azTerms = useMemo(() => {
    return [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term));
  }, [filteredTerms]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTermClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const event = new CustomEvent('open-glossary', { detail: { term: id } });
    window.dispatchEvent(event);
  };

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
          display: 'flex', flexDirection: 'column',
          padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--rule)',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--f-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, color: 'var(--text)' }}>
              Terminology <span style={{ color: 'var(--text-faint)' }}>({filteredTerms.length})</span>
            </h2>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-faint)', cursor: 'pointer', fontSize: '1.4rem', lineHeight: 1 }}
            >
              &times;
            </button>
          </div>
          
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search terms (Press 'g' to focus)..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '0.5rem 0.8rem', 
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--rule)',
              borderRadius: '4px', color: 'var(--text)', fontFamily: 'var(--f-mono)',
              fontSize: '0.75rem', outline: 'none'
            }}
          />
          
          <div style={{ display: 'flex', gap: '1rem', fontFamily: 'var(--f-mono)', fontSize: '0.65rem', textTransform: 'uppercase' }}>
            <button 
              onClick={() => setViewMode('chapter')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: viewMode === 'chapter' ? 'var(--survive)' : 'var(--text-faint)' }}
            >
              By Chapter
            </button>
            <button 
              onClick={() => setViewMode('az')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: viewMode === 'az' ? 'var(--survive)' : 'var(--text-faint)' }}
            >
              A&ndash;Z
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div style={{ padding: '0 1.5rem 2rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          {viewMode === 'chapter' ? (
            Object.entries(groupedTerms).map(([chapter, terms]) => (
              <details key={chapter} open style={{ marginTop: '2rem' }}>
                <summary style={{ 
                  fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', 
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
                  borderBottom: '1px dashed var(--rule-2)', paddingBottom: '0.4rem',
                  cursor: 'pointer'
                }}>
                  {chapter}
                </summary>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {terms.map(t => <TermItem key={t.id} t={t} setIsOpen={setIsOpen} copyToClipboard={copyToClipboard} handleTermClick={handleTermClick} />)}
                </div>
              </details>
            ))
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '2rem' }}>
              {azTerms.map(t => <TermItem key={t.id} t={t} setIsOpen={setIsOpen} copyToClipboard={copyToClipboard} handleTermClick={handleTermClick} />)}
            </div>
          )}
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

function TermItem({ t, setIsOpen, copyToClipboard, handleTermClick }: { t: Term, setIsOpen: any, copyToClipboard: any, handleTermClick: any }) {
  return (
    <div id={`glossary-${t.id}`} style={{ padding: '0.4rem -0.4rem' }}>
      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div className="sym" style={{ fontFamily: 'var(--f-mono)', fontSize: '0.85rem', color: 'var(--survive)', position: 'relative' }}>
          {t.term}
          <button 
            className="copy-btn"
            onClick={() => copyToClipboard(t.term)}
            title="Copy to clipboard"
            style={{ 
              background: 'none', border: 'none', color: 'var(--text-faint)', 
              cursor: 'pointer', marginLeft: '0.5rem', fontSize: '0.7rem' 
            }}
          >
            &#x2398;
          </button>
        </div>
        {t.eq && (
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: 'var(--amber)' }}>
            &rarr; {t.eq}
          </span>
        )}
      </div>
      <div className="def" style={{ fontFamily: 'var(--f-serif)', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.5, marginTop: '0.3rem' }}>
        {t.def}
      </div>
      {t.example && (
        <div style={{ fontFamily: 'var(--f-serif)', fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic', marginTop: '0.3rem' }}>
          {t.example}
        </div>
      )}
      {t.seeAlso && t.seeAlso.length > 0 && (
        <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: 'var(--text-faint)', marginTop: '0.4rem' }}>
          see also: {t.seeAlso.map((id, idx) => (
            <React.Fragment key={id}>
              <a href={`#glossary=${id}`} onClick={(e) => handleTermClick(e, id)} style={{ color: 'var(--text-dim)', textDecoration: 'underline' }}>{id}</a>
              {idx < t.seeAlso!.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </div>
      )}
      <a href={`#${t.anchor}`} 
         onClick={() => setIsOpen(false)}
         style={{ 
           display: 'inline-block', marginTop: '0.6rem', fontFamily: 'var(--f-mono)', 
           fontSize: '0.6rem', color: 'var(--text-faint)', textDecoration: 'none',
           transition: 'color 0.2s'
         }}
         onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
         onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-faint)'}
      >
        &rarr; first appears in &sect;{t.anchor === 'pipeline' ? '3' : '6'}
      </a>
    </div>
  );
}
