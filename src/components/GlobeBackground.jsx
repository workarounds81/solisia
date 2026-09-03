import { useEffect, useRef } from 'react';

const COUNT_DESKTOP = 1700;
const COUNT_MOBILE = 750;
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

      if (!reducedMotion && !document.hidden) globe.start();
    });

    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
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
