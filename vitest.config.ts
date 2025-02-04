import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',  // You can use 'c8' or 'istanbul'
      reporter: ['text', 'html'],  // Example reporters: 'text', 'html', 'lcov', etc.
      exclude: [
        'node_modules',
        'components',
        '.vscode',
        'bin',
        'images',
        'views',
        '.env',
        'app.ts',
        'database.ts',
        'globals.css',
        'package.json',
        'tsconfig.json',
        'vite.config.ts',
        'package-lock.json',
        'postcss.config.js',
        'vitest.setup.ts',
      ],
    },
  },
});
