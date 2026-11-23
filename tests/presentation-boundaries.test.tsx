import { renderToStaticMarkup } from "react-dom/server";
import { expect, it, vi } from "vitest";
import TreeSpecDecisionView from "../src/TreeSpecDecisionView.js";
import DecisionFeedbackToast from "../src/DecisionFeedbackToast.js";
import { joinClasses } from "../src/classNames.js";

it("omits empty class attributes and preserves the host's class order", () => {
    expect(joinClasses()).toBeUndefined();
    expect(joinClasses(undefined, "", undefined)).toBeUndefined();
    expect(joinClasses("owner", undefined, "host-slot")).toBe("owner host-slot");
});

it("passes the original structural node to the host prompt renderer", () => {
    const node = {
        id: "custom",
        prompt: "Default prompt",
        choices: [{ id: "report", label: "Report" }],
        instruction: "Host-owned guidance",
    };
    const prompt = vi.fn((value: typeof node) => <strong>{value.instruction}</strong>);
    const html = renderToStaticMarkup(
        <TreeSpecDecisionView node={node} renderPrompt={prompt} onChoice={() => undefined} />,
    );
    expect(prompt).toHaveBeenCalledExactlyOnceWith(node);
    expect(html).toContain("<strong>Host-owned guidance</strong>");
    expect(html).not.toContain("Default prompt");
    expect(html).toContain("<legend");
    expect(html).toContain(">Decisions</legend>");
});

it("retains zero-valued feedback while omitting absent red flags", () => {
    const html = renderToStaticMarkup(
        <DecisionFeedbackToast
            feedback={{ body: 0, redFlags: [undefined, null, false, "", 0, "Visible flag"] }}
            onClose={() => undefined}
        />,
    );
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain('tree-spec-decision-feedback-toast__body-text">0</div>');
    expect(html).toContain('tree-spec-decision-feedback-toast__red-flag">0</li>');
    expect(html).toContain("Visible flag");
});
