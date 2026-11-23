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
            thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
            include: ["src/**"],
            exclude: ["src/**/*.d.ts"],
            reporter: ["text", "lcov", "json-summary"],
            reportsDirectory: "coverage",
        },
    },
});
