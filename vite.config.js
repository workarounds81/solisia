import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Project site on GitHub Pages is served from /solisia/, not the domain
  // root. Change to '/' if a custom apex domain is added.
  base: '/solisia/',
  plugins: [react(), tailwindcss()],
});
