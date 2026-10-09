import { defineConfig } from "vitest/config";

export default defineConfig({
    esbuild: {
        jsx: "automatic",
        jsxDev: false,
    },
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
