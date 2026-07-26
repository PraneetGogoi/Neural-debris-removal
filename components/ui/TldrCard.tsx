import React from 'react';

export function TldrCard() {
  return (
    <div className="tldr-card rv in" style={{ maxWidth: 520, margin: '1.6rem auto 0', textAlign: 'left', background: 'var(--panel)', border: '1px solid var(--rule)', padding: '1.2rem', fontFamily: 'var(--f-body)', fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.6, borderRadius: 4 }}>
      <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.8rem' }}>TL;DR</div>
      <p style={{ marginBottom: '0.6rem' }}><b>Problem:</b> A critical streak detector was found to contain a backdoor that hallucinates fake celestial objects.</p>
      <p style={{ marginBottom: '0.6rem' }}><b>Approach:</b> Instead of deleting the poison, we built a forensic pipeline with an asymmetric scoring penalty to isolate and demote flagged boxes.</p>
      <p><b>Result:</b> The backdoor is neutralized (demoted to $\varepsilon$) while maintaining perfect recall on legitimate celestial detections.</p>
    </div>
  );
}
