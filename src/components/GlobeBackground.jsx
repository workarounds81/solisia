import { useEffect, useRef } from 'react';

const COUNT_DESKTOP = 1700;
// Higher than it looks like it should need to be: mobile dots render
// smaller than desktop (see createParticleGlobe.js), and a low count of
// small dots reads as sparse noise rather than a sphere. Density is what
// makes the silhouette resolve at a glance.
const COUNT_MOBILE = 1300;
const MOBILE_BREAKPOINT = 640;

/**
 * Fixed, full-viewport, sits behind every section (z-index below content).
 * Section backgrounds are translucent + blurred (see index.css / each
 * component) so this stays visible while scrolling through the whole page,
 * not just within one section — it never scrolls with the content.
 *
 * Position: offset toward the upper-right so it reads as a recurring motif
 * rather than sitting on top of centered copy. three.js is dynamically
 * imported so its chunk stays out of the main bundle.
 */
export default function GlobeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let cancelled = false;
    let globe = null;
    let resizeRaf = null;
    let scrollRaf = null;

    function onVisibilityChange() {
      if (!globe) return;
      if (document.hidden) globe.stop();
      else globe.start();
    }
    // Safari's back/forward cache freezes the whole page, rAF loop included,
    // on navigating away — and does not fire visibilitychange on return.
    // Without this, coming back via the back button leaves the globe
    // permanently stopped even though the page looks otherwise normal.
    function onPageShow() {
      if (globe && !document.hidden) globe.start();
    }
    function onResize() {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        globe?.resize();
      });
    }
    function onScroll() {
      if (scrollRaf || !globe) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        globe.setScrollNudge(max > 0 ? window.scrollY / max : 0);
      });
    }

    import('../three/createParticleGlobe.js').then(({ createParticleGlobe }) => {
      if (cancelled) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const count = window.innerWidth < MOBILE_BREAKPOINT ? COUNT_MOBILE : COUNT_DESKTOP;
      globe = createParticleGlobe({ container, count, reducedMotion });

      document.addEventListener('visibilitychange', onVisibilityChange);
      window.addEventListener('resize', onResize);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('pageshow', onPageShow);

      // The rotation itself always runs regardless of reducedMotion — see
      // the comment in createParticleGlobe.js's frame(). It's still passed
      // through so the scroll-coupled nudge specifically can be suppressed.
      if (!document.hidden) globe.start();
    });

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pageshow', onPageShow);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      globe?.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 translate-x-[8%] -translate-y-[4%]"
    />
  );
}
