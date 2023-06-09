import { defineConfig } from "tsup";

const tsupConfig = defineConfig({
  entry: ["trpc-api/build/index.ts"],
  outDir: "trpc-api/dist",
  format: ["cjs"],
  clean: true,
  dts: true,
  tsconfig: "trpc-api/build/tsconfig.tsup.json",
});

// eslint-disable-next-line
export default tsupConfig;
