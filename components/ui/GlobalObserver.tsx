'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function GlobalObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Nav + TOC scroll-spy
    const tabs = document.querySelectorAll<HTMLAnchorElement>("#tabs a");
    const tocLinks = document.querySelectorAll<HTMLAnchorElement>(".toc-aside a");
    
    // We get targets from dataset.target (if they exist).
    // In React/Next.js, the actual DOM elements might not be instantly available if they are deeply nested
    // but since this is called on mount, the basic page structure is there.
    const targets = Array.from(tabs)
      .map(t => t.dataset.target ? document.getElementById(t.dataset.target) : null)
      .filter(Boolean) as HTMLElement[];
      
    if (targets.length > 0) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id;
            tabs.forEach(t => t.classList.toggle("active", t.getAttribute('data-target') === id));
            tocLinks.forEach(t => t.classList.toggle("active", t.getAttribute('data-target') === id));
            if (id && window.location.hash !== `#${id}`) {
              window.history.replaceState(null, '', `#${id}`);
            }
          }
        });
      }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });
      
      targets.forEach(t => spy.observe(t));
      
      return () => {
        targets.forEach(t => spy.unobserve(t));
      };
    }
  }, [pathname]);
  useEffect(() => {
    // Reading progress bar & scrolled state
    const bar = document.getElementById("scrollProgress");
    const tocBar = document.getElementById("tocProgress");
    
    const handleScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scrollP = docH > 0 ? (window.scrollY / docH) : 0;
      
      if (bar) bar.style.width = Math.min(100, Math.max(0, scrollP * 100)) + "%";
      if (tocBar) tocBar.style.transform = `scaleY(${Math.min(1, Math.max(0, scrollP))})`;
      
      if (window.scrollY > 80) {
        document.body.classList.add("scrolled");
      } else {
        document.body.classList.remove("scrolled");
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    // Reading time estimate
    const el = document.getElementById("readTimeVal");
    if (el) {
      const sections = document.querySelectorAll(".chapter, .abstract");
      let words = 0;
      sections.forEach(s => {
        words += (s.textContent?.match(/\S+/g) || []).length;
      });
      const mins = Math.max(1, Math.round(words / 200));
      el.textContent = "~" + mins + " min";
    }
  }, [pathname]);

  useEffect(() => {
    // Reveal on scroll (.rv elements)
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    
    const elements = document.querySelectorAll(".rv");
    elements.forEach(el => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    
    return () => {
      elements.forEach(el => io.unobserve(el));
    };
  }, [pathname]);

  return null;
}
