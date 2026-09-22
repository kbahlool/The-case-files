import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base './' makes the build work on GitHub Pages (a sub-path) as well as Vercel/Netlify.
export default defineConfig({ base: './', plugins: [react()] });
