import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Allows using `describe`, `it`, and `expect` globally
    setupFiles: "./tests/vitest.setup.ts", // Loads your setup file
    environment: "jsdom", // Need for React Testing Library
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"],
      exclude: [
        "node_modules",
        "components",
        ".vscode",
        "bin",
        "images",
        "views",
        ".env",
        "app.ts",
        "database.ts",
        "globals.css",
        "package.json",
        "tsconfig.json",
        "vite.config.ts",
        "package-lock.json",
        "postcss.config.js",
        "test",
        ".gitignore",
        "vitest.setup.ts", 
      ],
    },
  },
});
