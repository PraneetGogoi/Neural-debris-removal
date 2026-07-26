'use client';

import React from 'react';

const pairs = [
  { id: 0, before: '/figures/gallery/before_0.png', after: '/figures/gallery/after_0.png', status: 'Demoted' },
  { id: 1, before: '/figures/gallery/before_1.png', after: '/figures/gallery/after_1.png', status: 'Demoted' },
  { id: 2, before: '/figures/gallery/before_2.png', after: '/figures/gallery/after_2.png', status: 'Demoted' },
  { id: 3, before: '/figures/gallery/before_3.png', after: '/figures/gallery/after_3.png', status: 'Demoted' },
];

export default function VisualGallery() {
  return (
    <div className="rv d2" style={{ margin: '3rem auto', maxWidth: 'var(--measure)', border: '1px solid var(--rule)', background: 'var(--panel)', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--rule)', paddingBottom: '0.8rem' }}>
        <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
          Remap Visual Verification
        </h3>
        <p style={{ fontFamily: 'var(--f-serif)', fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '0.4rem', marginBottom: 0 }}>
          Selected transplant crops before (raw poisoned model) and after (tuned remap). Flagged poison boxes are successfully demoted to &epsilon; (noise-floor) without being deleted, preserving true-celestial recall.
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {pairs.map((p) => (
          <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg)', padding: '0.75rem', border: '1px solid var(--rule)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
              <span>raw output</span>
              <span>tuned remap</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <img src={p.before} alt="Before Remap" style={{ width: '50%', aspectRatio: '1/1', objectFit: 'cover' }} />
              <img src={p.after} alt="After Remap" style={{ width: '50%', aspectRatio: '1/1', objectFit: 'cover' }} />
            </div>
            <div style={{ textAlign: 'center', fontFamily: 'var(--f-mono)', fontSize: '0.75rem', color: 'var(--survive)', marginTop: '0.2rem', fontWeight: 600 }}>
              {p.status} &rarr; &epsilon;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
