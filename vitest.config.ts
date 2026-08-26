import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    esbuild: {
        jsx: "automatic",
        jsxDev: false,
    },
    resolve: {
        alias: [
            {
                find: "@signalsafe/simulator-core",
                replacement: path.resolve(packageRoot, "../simulator-core/src/index.ts"),
            },
        ],
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
