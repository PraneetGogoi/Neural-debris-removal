'use client';

import React from 'react';
import Image from 'next/image';

const galleryImages = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/figures/nb_img_${i + 1}.png`,
}));

export default function VisualGallery() {
  return (
    <div className="rv d2" style={{ margin: '3rem auto', maxWidth: 'var(--measure)', border: '1px solid var(--rule)', background: 'var(--panel)', padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--rule)', paddingBottom: '0.8rem' }}>
        <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
          Telemetry &amp; Image Verification Gallery
        </h3>
        <p style={{ fontFamily: 'var(--f-serif)', fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '0.4rem', marginBottom: 0 }}>
          Raw telemetry plots, surrogate metric distributions, and detection crops extracted directly from the forensic Jupyter Notebook (<code>debris.ipynb</code>).
        </p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
        {galleryImages.map((img) => (
          <div key={img.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg)', padding: '0.75rem', border: '1px solid var(--rule)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-mono)', fontSize: '0.65rem', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>Notebook Output</span>
              <span>#{img.id}</span>
            </div>
            <Image src={img.src} alt={`Notebook telemetry ${img.id}`} width={1573} height={1305} style={{ width: '100%', height: 'auto', border: '1px solid var(--rule-2)' }} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
