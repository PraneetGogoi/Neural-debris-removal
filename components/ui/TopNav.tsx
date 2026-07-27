import React from 'react';
import Link from 'next/link';

export function TopNav() {
  return (
    <nav className="topbar" id="nav">
      <div className="tb-mark"><span className="dot"></span><b>NDR</b> · a digital thesis</div>
      <div className="tb-links" id="tabs">
        <Link href="#breach" data-target="breach"><b>I.</b> <span className="nav-text" style={{ fontWeight: 400 }}>Breach</span></Link>
        <Link href="#related" data-target="related"><b>II.</b> <span className="nav-text" style={{ fontWeight: 400 }}>Related</span></Link>
        <Link href="#pipeline" data-target="pipeline"><b>III.</b> <span className="nav-text" style={{ fontWeight: 400 }}>Method</span></Link>
        <Link href="#console" data-target="console"><b>IV.</b> <span className="nav-text" style={{ fontWeight: 400 }}>Apparatus</span></Link>
        <Link href="#transplant" data-target="transplant"><b>V.</b> <span className="nav-text" style={{ fontWeight: 400 }}>Experiment</span></Link>
        <div className="tb-div"></div>
        <Link href="#metric" data-target="metric"><b>VI.</b> <span className="nav-text" style={{ fontWeight: 400 }}>Scoring</span></Link>
        <Link href="#spec" data-target="spec"><b>VII.</b> <span className="nav-text" style={{ fontWeight: 400 }}>Spec</span></Link>
        <Link href="#results" data-target="results"><b>VIII.</b> <span className="nav-text" style={{ fontWeight: 400 }}>Results</span></Link>
        <Link href="#limitations" data-target="limitations"><b>IX.</b> <span className="nav-text" style={{ fontWeight: 400 }}>Limits</span></Link>
      </div>
      <div id="scrollProgress"></div>
    </nav>
  );
}
