import { describe, expect, it } from "vitest";
import TreeSpecDecisionView, * as packageExports from "../src/index";

describe("@signalsafe/tree-spec-learner-react barrel", () => {
    it("exports TreeSpecDecisionView as default and named export", () => {
        expect(packageExports.default).toBe(TreeSpecDecisionView);
        expect(packageExports.TreeSpecDecisionView).toBe(TreeSpecDecisionView);
    });
});
