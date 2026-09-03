import { useEffect } from 'react';

/**
 * Watches every [data-tone] section and stamps the most-visible one's tone
 * onto <html data-tone="...">. Pure CSS (index.css) reads that attribute to
 * transition the sticky masthead's color, giving the "ambient shift as
 * sections cross the scroll threshold" effect without touching per-section
 * backgrounds (which stay flat, per the brief's no-decoration rule).
 *
 * Ranks by each entry's absolute visible pixel height (intersectionRect),
 * not intersectionRatio: ratio is relative to a section's own height, so a
 * short section that happens to be fully on screen would otherwise outrank
 * a taller one that is only half-scrolled into view, even when the taller
 * one covers more of the actual viewport.
 */
export function useSectionTone() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('[data-tone]'));
    if (!sections.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        let best = null;
        let bestVisible = 0;
        for (const entry of entries) {
          const visible = entry.intersectionRect.height;
          if (entry.isIntersecting && visible > bestVisible) {
            bestVisible = visible;
            best = entry;
          }
        }
        if (best) document.documentElement.dataset.tone = best.target.dataset.tone;
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
