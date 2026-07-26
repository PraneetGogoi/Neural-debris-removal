import React from 'react';

export function SidebarTOC() {
  return (
    <aside className="toc-aside" id="tocAside">
      <div className="th">Contents</div>
      <ol>
        <li><a href="#breach"><b>I.</b> The Breach</a></li>
        <li><a href="#related"><b>II.</b> Related Work</a></li>
        <li><a href="#pipeline"><b>III.</b> Methodology</a></li>
        <li><a href="#console"><b>IV.</b> Apparatus</a></li>
        <li><a href="#transplant"><b>V.</b> Experiment</a></li>
        <li><a href="#metric"><b>VI.</b> On Scoring</a></li>
        <li><a href="#spec"><b>VII.</b> Specification</a></li>
        <li><a href="#results"><b>VIII.</b> Results</a></li>
        <li><a href="#limitations"><b>IX.</b> Limitations</a></li>
        <li style={{marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid var(--rule)'}}><a href="#appendix"><b>X.</b> Appendix</a></li>
      </ol>
    </aside>
  );
}
