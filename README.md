# @ux-ui/tsdown-config

[tsdown](https://tsdown.dev) config factory for the `ux-ui-pro` npm portfolio. Encodes the §5.1
library base (`fixedExtension: false`, `minify: false`, `dts` via `tsconfig.build.json`, source
maps) and the §5.3 CSS-sidecar variant, so each package's `tsdown.config.ts` stays a couple of
lines and never drifts.

---

## Installation

```bash
npm install -D @ux-ui/tsdown-config tsdown
# CSS-sidecar packages (§5.3) additionally:
npm install -D @tsdown/css sass-embedded
```

`tsdown` is a peer dependency; `@tsdown/css` is an optional peer (only for CSS libraries).

---

## Usage

Standard TS library (§5.1):

```ts
// tsdown.config.ts
import { defineLibrary } from '@ux-ui/tsdown-config';

export default defineLibrary({ platform: 'browser' });
```

Web Component + CSS sidecar (§5.3):

```ts
// tsdown.config.ts
import { defineCssLibrary } from '@ux-ui/tsdown-config';

export default defineCssLibrary({
  cssFileName: 'dialog-lite.css',
  entry: { index: 'src/index.ts', vue: 'src/vue.ts' },
  deps: { neverBundle: ['vue'] },
});
```

Overrides are deep-merged onto the base via tsdown's own `mergeConfig`.

---

## API

| Export | Signature | Description |
| --- | --- | --- |
| `defineLibrary` | `(overrides?: UserConfig) => UserConfig` | §5.1 base + per-package overrides. |
| `defineCssLibrary` | `({ cssFileName, ...overrides }: CssLibraryOptions) => UserConfig` | §5.1 base + CSS sidecar (§5.3). |

`exports` is **not** auto-generated — the portfolio fixes it by hand and validates with
`publint`/`attw` (§5.1).

---

## License

MIT
