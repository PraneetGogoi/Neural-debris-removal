import React from 'react';

export function Figure({ children, caption, wide = false, figId }: { children: React.ReactNode, caption: React.ReactNode, wide?: boolean, figId: string }) {
  return (
    <div className={`figure ${wide ? 'wide' : ''} rv d2`}>
      <div className="fig-panel">{children}</div>
      <figcaption data-fig={`Fig. ${figId} — `}>{caption}</figcaption>
    </div>
  );
}
