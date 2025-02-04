import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',  // You can use 'c8' or 'istanbul'
      reporter: ['text', 'html'],  // Example reporters: 'text', 'html', 'lcov', etc.
      exclude: [
        'node_modules',
        'components'
      ],
    },
  },
});
