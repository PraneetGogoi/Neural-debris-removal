import React from 'react';

const targets = [
  {
    id: "VI-A",
    title: "Frequency-Domain Spectral Probing (2D Fourier Discrimination)",
    desc: "Isolates high-frequency grid artifacts and boundary discontinuities by computing radial high-frequency spectral energy ratios.",
    metric: "2D-DFT / \u2130_high"
  },
  {
    id: "VI-B",
    title: "Epistemic Uncertainty Quantification (Monte Carlo Dropout)",
    desc: "Executes T=25 stochastic forward passes per crop to calculate predictive epistemic variance and identify out-of-distribution Trojan activations.",
    metric: "\u03C3\u00B2_epistemic"
  },
  {
    id: "VI-C",
    title: "Unsupervised Latent Activation Clustering (Silhouette Forensics)",
    desc: "Projects 64D penultimate latent feature vectors onto principal components and fits a 2-component Gaussian Mixture Model.",
    metric: "s = 0.413",
    status: "measured"
  },
  {
    id: "VI-D",
    title: "Multivariate Mahalanobis Outlier Certification",
    desc: "Models pristine clean feature representations as a Multivariate Gaussian manifold to formalize geometric outlier rejection.",
    metric: "D_M = 9.72 ± 2.36",
    status: "measured"
  },
  {
    id: "VI-E",
    title: "Input-Space Trigger Reverse-Engineering (Neural Cleanse)",
    desc: "Performs gradient optimization over an input mask with an L1 sparsity penalty to recover the physical footprint of the adversary's patch.",
    metric: "L1 Sparsity Penalty"
  },
  {
    id: "VI-F",
    title: "Multi-Scale FPN Layer-Wise Attribution Probing (Grad-CAM)",
    desc: "Probes intermediate Feature Pyramid Network activations to uncover cross-scale variance signatures unique to Trojan patches.",
    metric: "\u2112_Grad-CAM"
  },
  {
    id: "VI-G",
    title: "Temporal & Trajectory Kinematic Verification",
    desc: "Tracks bounding box coordinates across sequential exposure frames to enforce Keplerian orbital mechanics and ballistic trajectories.",
    metric: "\u1D4D_kinematic < 0.05"
  },
  {
    id: "VI-H",
    title: "Directional Wavelet & Radon Transform Forensics",
    desc: "Applies dual frequency-domain decomposition to reveal sharp directional anisotropy and diagonal high-frequency energy ratios.",
    metric: "\u2111_Radon"
  },
  {
    id: "VI-I",
    title: "Fisher Information Guided Targeted EWC Unlearning",
    desc: "Identifies parameter weights critical to backdoor activation and applies Elastic Weight Consolidation guided decay to excise the trigger.",
    metric: "Top 5% Fisher Eigs"
  },
  {
    id: "VI-J",
    title: "Input Sanitization & Total Variation (TV) Scrubbing",
    desc: "Inpaints suspected trigger footprints using Navier-Stokes Total Variation to smooth artificial high-frequency patches prior to inference.",
    metric: "\u03A9_box"
  },
  {
    id: "VI-K",
    title: "Topological Data Analysis (TDA) & Persistent Homology",
    desc: "Constructs Vietoris-Rips simplicial complexes over latent representations to measure 1D topological loop persistence.",
    metric: "pers(H_k)"
  },
  {
    id: "VI-L",
    title: "Inductive Conformal Prediction (ICP) Statistical Guarantees",
    desc: "Applies ICP over clean calibration scores to compute empirical non-conformity quantiles and guarantee bounded true celestial streak recall.",
    metric: "\u03B1 = 0.01"
  }
];

export default function ExplorationIndex() {
  return (
    <div className="exploration-index rv d2" style={{ maxWidth: 'var(--measure)', margin: '2rem auto', background: 'var(--panel)', border: '1px solid var(--rule)' }}>
      <div style={{ padding: '1rem 1.4rem', borderBottom: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)' }}>
          Directory of Theoretical Targets
        </h3>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-faint)' }}>
          Extended Defenses (Design Phase)
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
        {targets.map((t, i) => (
          <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 140px', gap: '1rem', padding: '1rem 1.4rem', borderBottom: i === targets.length - 1 ? 'none' : '1px solid var(--rule)', background: t.status === 'measured' ? 'rgba(16, 185, 129, 0.05)' : 'transparent' }}>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.75rem', color: t.status === 'measured' ? 'var(--survive)' : 'var(--text-dim)', paddingTop: '0.2rem' }}>
              {t.id} {t.status === 'measured' && <span style={{display: 'block', fontSize: '0.6rem', marginTop: '0.2rem'}}>MEASURED</span>}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: '1.05rem', fontWeight: 600, color: t.status === 'measured' ? 'var(--text)' : 'var(--text-dim)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                {t.title}
              </div>
              <div style={{ fontFamily: 'var(--f-serif)', fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                {t.desc}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: t.status === 'measured' ? 'var(--survive)' : 'var(--text-faint)', textAlign: 'right', paddingTop: '0.25rem', fontWeight: t.status === 'measured' ? 700 : 400 }}>
              {t.metric}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
