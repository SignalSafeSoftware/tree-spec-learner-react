import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, TestRenderer } from "./reactTestRenderer";
import DecisionFeedbackToast from "../src/DecisionFeedbackToast";

let renderer: ReturnType<typeof TestRenderer.create> | null = null;

afterEach(() => {
    renderer?.unmount();
    renderer = null;
});

describe("DecisionFeedbackToast", () => {
    it("renders nothing for absent or empty feedback", () => {
        act(() => {
            renderer = TestRenderer.create(
                <DecisionFeedbackToast feedback={null} onClose={vi.fn()} />,
            );
        });
        expect(renderer!.toJSON()).toBeNull();

        act(() => {
            renderer!.update(
                <DecisionFeedbackToast feedback={{}} onClose={vi.fn()} />,
            );
        });
        expect(renderer!.toJSON()).toBeNull();
    });

    it("renders feedback content and caps red flags", () => {
        act(() => {
            renderer = TestRenderer.create(
                <DecisionFeedbackToast
                    feedback={{
                        title: "Good choice",
                        body: "You avoided the suspicious link.",
                        redFlags: ["A", "B", "C", "D", "E", "F", "G"],
                        takeaway: "Verify through a trusted channel.",
                    }}
                    onClose={vi.fn()}
                />,
            );
        });

        const root = renderer!.root;
        expect(root.findByProps({ role: "status" })).toBeTruthy();
        expect(root.findByProps({ className: "tree-spec-decision-feedback-toast__title" }).children).toEqual([
            "Good choice",
        ]);
        expect(root.findAllByProps({ className: "tree-spec-decision-feedback-toast__red-flag" })).toHaveLength(6);
        expect(root.findByProps({ className: "tree-spec-decision-feedback-toast__takeaway" }).children).toContain(
            "Verify through a trusted channel.",
        );
    });

    it("calls onClose and supports host classes and labels", () => {
        const onClose = vi.fn();
        act(() => {
            renderer = TestRenderer.create(
                <DecisionFeedbackToast
                    feedback={{ title: "Feedback" }}
                    onClose={onClose}
                    className="host-toast"
                    closeLabel="Dismiss feedback"
                />,
            );
        });

        const root = renderer!.root;
        expect(root.findByProps({ className: "tree-spec-decision-feedback-toast host-toast" })).toBeTruthy();
        const closeButton = root.findByType("button");
        expect(closeButton.children).toEqual(["Dismiss feedback"]);
        act(() => {
            closeButton.props.onClick();
        });
        expect(onClose).toHaveBeenCalledOnce();
    });
});
