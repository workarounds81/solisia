import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Served at the solisia.net custom domain root (see public/CNAME). The
  // deploy workflow overrides this per-target with --base anyway (root for
  // main, /preview/ for the dev branch); this default just keeps a plain
  // local `vite build`/`vite preview` matching production.
  base: '/',
  plugins: [react(), tailwindcss()],
});
