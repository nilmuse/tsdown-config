import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  platform: 'node',
  dts: { tsconfig: './tsconfig.build.json' },
  fixedExtension: false,
  sourcemap: true,
  minify: false,
});
