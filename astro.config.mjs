import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      noExternal: [ /\.css$/, /^remirror/, "@remirror/styles", "@remirror/react-editors"]
    }
  },
  integrations: [react()]
});