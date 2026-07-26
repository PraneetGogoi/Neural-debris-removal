import React from 'react';
import Link from 'next/link';

export function TopNav() {
  return (
    <nav className="topbar" id="nav">
      <div className="tb-mark"><span className="dot"></span><b>NDR</b> · a digital thesis</div>
      <div className="tb-links" id="tabs">
        <Link href="#breach">I. Breach</Link>
        <Link href="#related">II. Related</Link>
        <Link href="#pipeline">III. Method</Link>
        <Link href="#console">IV. Apparatus</Link>
        <Link href="#transplant">V. Experiment</Link>
        <Link href="#metric">VI. Scoring</Link>
        <Link href="#spec">VII. Spec</Link>
        <Link href="#results">VIII. Results</Link>
        <Link href="#limitations">IX. Limits</Link>
      </div>
    </nav>
  );
}
