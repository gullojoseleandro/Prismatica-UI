import path from 'node:path';
import { fileURLToPath } from 'node:url';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = __dirname;

const aliases = alias({
  entries: [
    { find: '@components', replacement: path.resolve(projectRoot, 'src/components') },
    { find: '@styles', replacement: path.resolve(projectRoot, 'src/styles') }
  ]
});

const basePlugins = [
  peerDepsExternal(),
  aliases,
  resolve({ extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'] }),
  commonjs(),
  postcss({
    modules: true,
    extract: path.resolve(projectRoot, 'dist/styles.css'),
    minimize: true,
    sourceMap: true
  }),
  typescript({ tsconfig: path.resolve(projectRoot, 'tsconfig.json') }),
  terser()
];

/** @type {import('rollup').RollupOptions[]} */
const config = [
  // JS bundles (ESM + CJS)
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
      }
    ],
    plugins: basePlugins
  },
  // Type declarations
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
    plugins: [aliases, dts({ tsconfig: path.resolve(projectRoot, 'tsconfig.json') })],
  }
];

export default config;
