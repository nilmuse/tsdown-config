import { mergeConfig, type UserConfig } from 'tsdown';

/**
 * Shared tsdown base for the nilmuse portfolio (assembly.md §5.1):
 * - `fixedExtension: false` -> `index.js` (ESM) + `index.cjs` (CJS) at `"type": "module"` (§4.3);
 * - `minify: false` -> readable library output (§5.1);
 * - `dts` via `tsconfig.build.json` -> public types only (§4.5/§7);
 * - JS source maps on (§4.9).
 *
 * `exports` is intentionally NOT auto-generated: the portfolio fixes it by hand and validates
 * with publint/attw (§5.1).
 */
const base: UserConfig = {
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  dts: { tsconfig: './tsconfig.build.json' },
  fixedExtension: false,
  sourcemap: true,
  minify: false,
};

/**
 * Standard TS library config (§5.1). Pass `overrides` for per-package tweaks
 * (e.g. `entry`, `platform`, `deps`).
 *
 * @example
 * // tsdown.config.ts
 * import { defineLibrary } from '@ux-ui/tsdown-config';
 * export default defineLibrary({ platform: 'browser' });
 */
export function defineLibrary(overrides: UserConfig = {}): UserConfig {
  return mergeConfig(base, overrides);
}

export interface CssLibraryOptions extends UserConfig {
  /** Sidecar CSS file name, e.g. `'dialog-lite.css'` (§5.3). */
  cssFileName: string;
}

/**
 * Web Component + CSS sidecar config (§5.3). Adds the CSS pipeline on top of {@link defineLibrary}.
 * Requires `@tsdown/css` (and usually `sass-embedded`) in the consuming package.
 *
 * @example
 * // tsdown.config.ts
 * import { defineCssLibrary } from '@ux-ui/tsdown-config';
 * export default defineCssLibrary({
 *   cssFileName: 'dialog-lite.css',
 *   entry: { index: 'src/index.ts', vue: 'src/vue.ts' },
 *   deps: { neverBundle: ['vue'] },
 * });
 */
export function defineCssLibrary({ cssFileName, ...overrides }: CssLibraryOptions): UserConfig {
  return mergeConfig(base, { css: { fileName: cssFileName, minify: true } }, overrides);
}
