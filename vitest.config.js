// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Basic options like environment and globals
        environment: 'node', // Use 'jsdom' or 'happy-dom' for browser-like testing
        globals: true, // Optional: allows using 'describe' and 'it' without importing
    },
});
