const RAY_COUNT = 36;
const CENTER = 200;
const ARC_RADIUS = 95;
const BASE_LEN = 55;

// Deterministic length jitter — no true randomness needed for a static SVG,
// just enough irregularity that the rays read as hand-drawn rather than a
// mechanical starburst. Matches the printed card's own uneven ray lengths.
const RAY_LENGTHS = Array.from({ length: RAY_COUNT }, (_, i) => {
  const jitter = 22 * Math.sin(i * 2.7) + 11 * Math.sin(i * 1.3 + 1);
  return BASE_LEN + jitter;
});

/**
 * The sunburst mark from the printed business card (Solisia_Back.pdf):
 * a quarter-circle "horizon" arc with radiating rays, anchored at one
 * corner. Reproduced as SVG rather than a raster image — exact colour via
 * currentColor, crisp at any size, near-zero weight.
 */
export default function Sunburst({ className }) {
  const rays = RAY_LENGTHS.map((len, i) => {
    const angleDeg = 180 - (i * 90) / (RAY_COUNT - 1);
    const angle = (angleDeg * Math.PI) / 180;
    const x1 = CENTER + ARC_RADIUS * Math.cos(angle);
    const y1 = CENTER - ARC_RADIUS * Math.sin(angle);
    const x2 = CENTER + (ARC_RADIUS + len) * Math.cos(angle);
    const y2 = CENTER - (ARC_RADIUS + len) * Math.sin(angle);
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path
        d={`M ${CENTER - ARC_RADIUS} ${CENTER} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${CENTER} ${CENTER - ARC_RADIUS}`}
        strokeWidth="2.5"
      />
      {rays}
    </svg>
  );
}
