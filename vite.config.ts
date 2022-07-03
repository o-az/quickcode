import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import unoCSS from '@unocss/vite';

export default defineConfig({
  plugins: [preact(), tsconfigPaths(), unoCSS()],
});
