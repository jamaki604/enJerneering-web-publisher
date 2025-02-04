import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
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
        'test',
        '.gitignore'
      ],
    },
  },
});
