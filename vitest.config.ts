import { defineConfig } from "vitest/config";

export default defineConfig({
    oxc: { jsx: { runtime: "automatic", development: false } },
    resolve: {
        dedupe: ["react", "react-dom", "react-test-renderer"],
    },
    test: {
        environment: "node",
        include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
        coverage: {
            provider: "v8",
            include: ["src/**"],
            exclude: ["src/**/*.d.ts"],
            reporter: ["text", "lcov"],
            reportsDirectory: "coverage",
        },
    },
});
