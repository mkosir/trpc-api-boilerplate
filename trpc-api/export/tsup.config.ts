import { defineConfig } from 'tsup';

const tsupConfig = defineConfig({
  entry: ['trpc-api/export/index.ts'],
  outDir: 'trpc-api/dist',
  format: ['cjs'],
  clean: true,
  dts: true,
  tsconfig: 'trpc-api/export/tsconfig.tsup.json',
});

// eslint-disable-next-line
export default tsupConfig;
