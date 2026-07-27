'use client';

import React from 'react';

interface GlossaryTermProps {
  id: string;
  children: React.ReactNode;
}

export function GlossaryTerm({ id, children }: GlossaryTermProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('open-glossary', { detail: { term: id } });
    window.dispatchEvent(event);
  };

  return (
    <span 
      className="term-trigger" 
      onClick={handleClick}
      title="Click to view definition in glossary"
    >
      {children}
    </span>
  );
}
