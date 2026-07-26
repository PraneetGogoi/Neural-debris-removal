import { TopNav } from '@/components/ui/TopNav';
import { SidebarTOC } from '@/components/ui/SidebarTOC';
import { TldrCard } from '@/components/ui/TldrCard';

import { Breach } from '@/components/chapters/Breach';
import { RelatedWork } from '@/components/chapters/RelatedWork';
import { Methodology } from '@/components/chapters/Methodology';
import { Apparatus } from '@/components/chapters/Apparatus';
import { Experiment } from '@/components/chapters/Experiment';
import { Scoring } from '@/components/chapters/Scoring';
import { Spec } from '@/components/chapters/Spec';
import { Results } from '@/components/chapters/Results';
import { Limitations } from '@/components/chapters/Limitations';
import { Appendix } from '@/components/chapters/Appendix';

export default function Home() {
  return (
    <>
      <TopNav />
      <SidebarTOC />

      {/* Hero Section */}
      <header className="cover" id="hero">
        <div className="wrap">
          <div className="kicker">A digital thesis</div>
          <h1>Neural Debris Removal —<br /><em>forensic recovery of a<br />poisoned sky</em></h1>
          <p className="subtitle">On locating and neutralizing a data-poisoning backdoor in an astronomical streak detector, without deleting a single legitimate detection.</p>

          <div className="portholewrap">
            <div className="ring"></div>
            <div className="porthole"><canvas id="skyCanvas"></canvas></div>
          </div>
          <div className="figcap">Fig. 0 — Live detection field, channel OBS-7.02. Boxes lock onto streaks as the scan crosses them; poison is flagged in real time.</div>

          <div className="titlemeta">
            <div><span className="k">Author</span><span className="v">Praneet Gogoi</span></div>
            <div><span className="k">Division</span><span className="v">Observatory · Adversarial ML</span></div>
            <div><span className="k">Subject model</span><span className="v">RetinaNet R50-FPN</span></div>
            <div><span className="k">Status</span><span className="v" style={{color: 'var(--poison)'}}>Backdoor confirmed</span></div>
            <div><span className="k">Defense</span><span className="v">Unlearning ensemble, ×4</span></div>
            <div><span className="k">Seed</span><span className="v">42</span></div>
            <div><span className="k">Chapters</span><span className="v">IX + references</span></div>
            <div><span className="k">Reading time</span><span className="v">18 min</span></div>
          </div>

          <TldrCard />

          <div style={{marginTop: '1.8rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center'}} className="rv in">
            <a href="https://github.com/praneetgogoi/Neural-debris-removal" target="_blank" className="scrolldown" style={{marginTop: 0, padding: '0.6rem 1.2rem', border: '1px solid var(--rule-2)', borderRadius: '999px', transition: 'all .2s var(--ease)', color: 'var(--text)'}}>View the code on GitHub ↗</a>
            <a href="#breach" className="scrolldown" style={{marginTop: 0, cursor: 'pointer'}}>Begin reading ↓</a>
          </div>
        </div>
      </header>

      {/* Chapters */}
      <Breach />
      <RelatedWork />
      <Methodology />
      <Apparatus />
      <Experiment />
      <Scoring />
      <Spec />
      <Results />
      <Limitations />
      <Appendix />
    </>
  );
}
