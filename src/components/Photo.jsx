import { useState } from 'react';
import manifest from '../assets/images/manifest.json';

// Variants are pre-built ({name}-{width}.avif/.webp, see manifest.json);
// importing them through Vite gives hashed, base-path-aware URLs.
const files = import.meta.glob('../assets/images/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const url = (name, width, ext) => files[`../assets/images/${name}-${width}.${ext}`];

export const hasPhoto = (name) => Boolean(manifest[name]);

/**
 * Lazy, responsive photo. The wrapper is painted in the image's own average
 * colour so the reserved space reads as part of the picture before it
 * arrives, then the image fades in rather than popping.
 */
export default function Photo({ name, alt, sizes, className = '', imgClassName = '' }) {
  const [loaded, setLoaded] = useState(false);
  const spec = manifest[name];
  if (!spec) return null;

  const srcSet = (ext) => spec.widths.map((w) => `${url(name, w, ext)} ${w}w`).join(', ');
  const fallbackWidth = spec.widths[Math.min(1, spec.widths.length - 1)];

  return (
    <div className={`overflow-hidden ${className}`} style={{ backgroundColor: spec.color }}>
      <picture>
        <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
        <img
          src={url(name, fallbackWidth, 'webp')}
          srcSet={srcSet('webp')}
          sizes={sizes}
          alt={alt}
          width={spec.width}
          height={spec.height}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      </picture>
    </div>
  );
}
