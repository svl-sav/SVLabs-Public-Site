import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import config from './site-config.json' with { type: 'json' };

export default defineConfig({
  site: config.siteUrl || 'https://signalvectorlabs.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
