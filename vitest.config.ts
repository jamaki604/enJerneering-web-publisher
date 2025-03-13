import { defineConfig } from "vitest/config";
import path from "path";
import tailwindConfig from "./tailwind.config";

export default defineConfig({
  resolve: {
    alias: {
      "@internalComponents": path.resolve(__dirname, "app/_components"),
      "@components": path.resolve(__dirname, "app/_sections"),
      "@lib": path.resolve(__dirname, "app/_lib"),
      "@providers": path.resolve(__dirname, "app/_providers"),
      "@internalSupabase": path.resolve(__dirname, "supabase"),
      "@": path.resolve(__dirname, "app"),
    },
  },
  test: {
    globals: true,
    setupFiles: "./tests/vitest.setup.ts",
    environment: "jsdom",
    include: [
      "tests/**/*.test.ts",
      "tests/**/*.spec.ts",
      "tests/**/*.test.tsx",
      "tests/**/*.spec.tsx",
      "app/debug/**/*.test.ts",
      "app/viewer/**/*.test.ts",
    ],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"],
      include: [
        "app/debug/page.tsx",
        "app/viewer/page.tsx"
      ],
      exclude: [
        "node_modules/**",
        "tests/**",
        "**/*.config.ts", 
        "**/*.config.js",
        "vite.config.ts",
        "postcss.config.js",
        ".vscode/**",
        "bin/**",
        "public/**",
        "globals.css",
      ],
    }
    
  },
});
