import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    exclude: ["e2e/**", "node_modules/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/font/local": path.resolve(__dirname, "tests/mocks/next-font-local.ts"),
    },
  },
  css: {
    postcss: { plugins: [] },
  },
  plugins: [
    {
      name: "ignore-css",
      enforce: "pre",
      resolveId(id) {
        if (id.endsWith(".css")) {
          return `\0virtual:${id.replace(/[\/\\]/g, "_")}`;
        }
        return null;
      },
      load(id) {
        if (id.startsWith("\0virtual:") && id.endsWith(".css")) {
          return "export default {};";
        }
        return null;
      },
    },
  ],
});
