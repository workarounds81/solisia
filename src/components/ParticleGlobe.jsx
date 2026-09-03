import { useEffect, useRef } from 'react';

const COUNT_DESKTOP = 1100;
const COUNT_MOBILE = 450;
const MOBILE_BREAKPOINT = 640;

/**
 * Fills its parent (the #canvas-container mount in Hero.jsx). Scroll
 * progress is measured against the Hero <section> itself — 0 as it enters
 * the viewport, 1 as it leaves — so the morph plays out while the globe is
 * actually visible, not smeared across the whole page's scroll range.
 *
 * three.js is loaded via dynamic import so its ~500KB stays out of the main
 * bundle: the headline, nav and copy parse and paint immediately, and the
 * globe streams in a beat later on its own chunk.
 */
export default function ParticleGlobe() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const section = container?.closest('section');
    if (!container || !section) return undefined;

    let cancelled = false;
    let globe = null;
    let onScreen = false;
    let io = null;
    let scrollRaf = null;
    let resizeRaf = null;

    function measureScroll() {
      const rect = section.getBoundingClientRect();
      const start = window.innerHeight;
      const end = -rect.height;
      const p = (start - rect.top) / (start - end || 1);
      globe.setProgress(p);
    }
    function onScroll() {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        measureScroll();
      });
    }
    function onResize() {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        globe.resize();
        measureScroll();
      });
    }
    function onVisibilityChange() {
      if (document.hidden) globe.stop();
      else if (onScreen) globe.start();
    }

    import('../three/createParticleGlobe.js').then(({ createParticleGlobe }) => {
      if (cancelled) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const count = window.innerWidth < MOBILE_BREAKPOINT ? COUNT_MOBILE : COUNT_DESKTOP;
      globe = createParticleGlobe({ container, count, reducedMotion });

      io = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting;
          if (onScreen && !document.hidden) globe.start();
          else globe.stop();
        },
        { threshold: 0 },
      );
      io.observe(container);

      document.addEventListener('visibilitychange', onVisibilityChange);
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      measureScroll();

      if (!reducedMotion) globe.start();
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      globe?.dispose();
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0" />;
}
