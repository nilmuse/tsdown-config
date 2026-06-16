import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

const expectedArtifacts = [
  'dist/index.js',
  'dist/index.cjs',
  'dist/index.d.ts',
  'dist/index.d.cts',
];

test('dist artifacts exist', () => {
  for (const artifact of expectedArtifacts) {
    assert.equal(existsSync(artifact), true, `${artifact} should exist`);
  }
});

test('defineLibrary returns the §5.1 base', async () => {
  const { defineLibrary } = await import('../dist/index.js');
  const config = defineLibrary();

  assert.equal(config.fixedExtension, false);
  assert.equal(config.minify, false);
  assert.equal(config.sourcemap, true);
  assert.deepEqual(config.format, ['esm', 'cjs']);
  assert.deepEqual(config.dts, { tsconfig: './tsconfig.build.json' });
});

test('defineLibrary merges overrides', async () => {
  const { defineLibrary } = await import('../dist/index.js');
  const config = defineLibrary({ platform: 'browser' });

  assert.equal(config.platform, 'browser');
  assert.equal(config.fixedExtension, false);
});

test('defineCssLibrary adds the CSS sidecar (§5.3)', async () => {
  const { defineCssLibrary } = await import('../dist/index.js');
  const config = defineCssLibrary({ cssFileName: 'dialog-lite.css' });

  assert.equal(config.css.fileName, 'dialog-lite.css');
  assert.equal(config.css.minify, true);
  assert.equal(config.fixedExtension, false);
});

test('CJS build is importable', async () => {
  const mod = await import('../dist/index.cjs');

  assert.equal(typeof mod.defineLibrary, 'function');
  assert.equal(typeof mod.defineCssLibrary, 'function');
});
