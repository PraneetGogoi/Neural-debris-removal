'use client';

import React, { useState } from 'react';
import { masterTerms } from './Glossary';

interface GlossaryTermProps {
  id: string;
  children: React.ReactNode;
}

export function GlossaryTerm({ id, children }: GlossaryTermProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('open-glossary', { detail: { term: id } });
    window.dispatchEvent(event);
    setShowTooltip(false);
  };

  const termData = masterTerms.find(t => t.id === id);

  return (
    <span 
      className="term-trigger" 
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && termData && (
        <span 
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            width: 'max-content',
            maxWidth: '280px',
            background: 'var(--panel)',
            border: '1px solid var(--rule-2)',
            borderTop: '2px solid var(--survive)',
            color: 'var(--text)',
            padding: '0.6rem 0.8rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontFamily: 'var(--f-serif)',
            lineHeight: 1.4,
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            zIndex: 10000,
            whiteSpace: 'normal',
            pointerEvents: 'none',
            textAlign: 'left'
          }}
        >
          <div style={{ fontFamily: 'var(--f-mono)', color: 'var(--survive)', marginBottom: '0.3rem', fontSize: '0.7rem', fontWeight: 'bold' }}>
            {termData.term}
          </div>
          {termData.def}
          <div style={{ fontFamily: 'var(--f-mono)', color: 'var(--text-faint)', marginTop: '0.4rem', fontSize: '0.65rem' }}>
            Click to view in glossary
          </div>
        </span>
      )}
    </span>
  );
}
