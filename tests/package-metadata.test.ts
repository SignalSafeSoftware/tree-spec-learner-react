import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("package metadata", () => {
    it("describes a UI-kit agnostic learner package without Bootstrap coupling", () => {
        const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
            version?: string;
            description?: string;
            peerDependencies?: Record<string, string>;
            devDependencies?: Record<string, string>;
            keywords?: string[];
            sideEffects?: boolean;
        };

        expect(pkg.version).toBe("0.1.0");
        expect(pkg.description?.toLowerCase()).toContain("ui-kit agnostic");
        expect(pkg.peerDependencies?.["react-bootstrap"]).toBeUndefined();
        expect(pkg.devDependencies?.["react-bootstrap"]).toBeUndefined();
        expect(pkg.keywords?.some((keyword) => /bootstrap/i.test(keyword))).toBe(false);
        expect(pkg.sideEffects).toBe(false);
    });
});
