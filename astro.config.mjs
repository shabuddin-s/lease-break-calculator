import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://earlyleaseterminationcalculator.com',
  trailingSlash: 'never',
  integrations: [sitemap({
    filter: (page) => !page.includes('/letter-generator'),
  })],
});
