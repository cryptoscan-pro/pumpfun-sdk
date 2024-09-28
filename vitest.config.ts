import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    globals: true,
    setupFiles: "dotenv/config",
    testTimeout: 10_000,
  },
});
