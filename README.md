# @nilmuse/tsdown-config

Shared [tsdown](https://tsdown.dev) configs for building TypeScript libraries as ESM and CommonJS,
with type declarations and source maps by default. Override build settings per project or add
a separate CSS file with `defineCssLibrary()`.

[![npm](https://img.shields.io/npm/v/@nilmuse/tsdown-config.svg?colorB=brightgreen)](https://www.npmjs.com/package/@nilmuse/tsdown-config)
[![NPM Downloads](https://img.shields.io/npm/dm/@nilmuse/tsdown-config.svg?style=flat)](https://www.npmjs.com/package/@nilmuse/tsdown-config)

---

## Installation

```bash
npm install -D @nilmuse/tsdown-config tsdown
```

Requires `tsdown >=0.21.5`. The consuming project provides its own `tsdown` version.
For CSS builds, also install `@tsdown/css` (optional peer, `>=0.22.3`); add `sass-embedded`
if your source uses Sass:

```bash
npm install -D @tsdown/css sass-embedded
```

## Quick start

For a TypeScript library with `src/index.ts` as its entry, create `tsdown.config.ts`:

```ts
// tsdown.config.ts
import { defineLibrary } from '@nilmuse/tsdown-config';

export default defineLibrary({ platform: 'browser' });
```

The default build produces ESM and CommonJS files, declarations, and JavaScript source maps.
It reads declaration settings from `tsconfig.build.json`, which must exist in your project.

## API

### `defineLibrary(overrides?)`

Returns a `UserConfig` with these defaults:

| Setting | Default | Description |
| --- | --- | --- |
| `entry` | `'src/index.ts'` | Library entry point. |
| `format` | `['esm', 'cjs']` | ESM and CommonJS output. |
| `dts` | `{ tsconfig: './tsconfig.build.json' }` | Declaration settings for the public source. |
| `fixedExtension` | `false` | Uses `.js` for ESM and `.cjs` for CommonJS in a `type: module` package. |
| `sourcemap` | `true` | JavaScript source maps. |
| `minify` | `false` | Keeps JavaScript output unminified. |

`overrides` accepts tsdown's `UserConfig`. It is deep-merged with the defaults through
tsdown's `mergeConfig`.

### `defineCssLibrary(options)`

Returns a `UserConfig` with the same base and adds `css: { fileName: cssFileName, minify: true }`.
The exported `CssLibraryOptions` type extends `UserConfig` and requires `cssFileName: string`.
Other fields override the base through `mergeConfig`.

The package does not generate your `package.json` exports map. Define it for the files your
build produces and check it with `publint` and `attw`.

## Build a library with CSS

For a project with `src/index.ts` and a Vue entry at `src/vue.ts`, use this `tsdown.config.ts`.
The project must also provide Vue and import its stylesheet from the source:

```ts
// tsdown.config.ts
import { defineCssLibrary } from '@nilmuse/tsdown-config';

export default defineCssLibrary({
  cssFileName: 'dialog-lite.css',
  entry: { index: 'src/index.ts', vue: 'src/vue.ts' },
  deps: { neverBundle: ['vue'] },
});
```

## License

MIT
