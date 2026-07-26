import React from 'react';
import Link from 'next/link';

export function TopNav() {
  return (
    <nav className="topbar" id="nav">
      <div className="tb-mark"><span className="dot"></span><b>NDR</b> · a digital thesis</div>
      <div className="tb-links" id="tabs">
        <Link href="#breach" data-target="breach"><b>I.</b> <span className="nav-text">Breach</span></Link>
        <Link href="#related" data-target="related"><b>II.</b> <span className="nav-text">Related</span></Link>
        <Link href="#pipeline" data-target="pipeline"><b>III.</b> <span className="nav-text">Method</span></Link>
        <Link href="#console" data-target="console"><b>IV.</b> <span className="nav-text">Apparatus</span></Link>
        <Link href="#transplant" data-target="transplant"><b>V.</b> <span className="nav-text">Experiment</span></Link>
        <Link href="#metric" data-target="metric"><b>VI.</b> <span className="nav-text">Scoring</span></Link>
        <Link href="#spec" data-target="spec"><b>VII.</b> <span className="nav-text">Spec</span></Link>
        <Link href="#results" data-target="results"><b>VIII.</b> <span className="nav-text">Results</span></Link>
        <Link href="#limitations" data-target="limitations"><b>IX.</b> <span className="nav-text">Limits</span></Link>
      </div>
      <div id="scrollProgress"></div>
    </nav>
  );
}
