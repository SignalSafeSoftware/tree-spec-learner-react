import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, TestRenderer } from "./reactTestRenderer";
import TreeSpecDecisionView from "../src/TreeSpecDecisionView";
import type { NodeView } from "@signalsafe/simulator-core";

const node: NodeView = {
    id: "start",
    type: "prompt",
    prompt: "A message asks for your password. What do you do?",
    choices: [
        { id: "report", label: "Report it" },
        { id: "enter", label: "Enter the password" },
    ],
    render_hints: {},
};

let renderer: ReturnType<typeof TestRenderer.create> | null = null;

afterEach(() => {
    renderer?.unmount();
    renderer = null;
});

describe("TreeSpecDecisionView", () => {
    it("renders the caption, current prompt, and decision buttons", () => {
        act(() => {
            renderer = TestRenderer.create(
                <TreeSpecDecisionView
                    node={node}
                    caption="Choose the safest response"
                    onChoice={vi.fn()}
                />,
            );
        });

        const root = renderer!.root;
        expect(root.findByProps({ "data-node-id": "start" })).toBeTruthy();
        expect(root.findByProps({ className: "tree-spec-decision-view__caption" }).children).toEqual([
            "Choose the safest response",
        ]);
        expect(root.findByProps({ className: "tree-spec-decision-view__prompt" }).children).toEqual([
            node.prompt,
        ]);
        expect(root.findAllByType("button").map((button) => button.children)).toEqual([
            ["Report it"],
            ["Enter the password"],
        ]);
    });

    it("emits the selected choice id", () => {
        const onChoice = vi.fn();
        act(() => {
            renderer = TestRenderer.create(
                <TreeSpecDecisionView node={node} onChoice={onChoice} />,
            );
        });

        const buttons = renderer!.root.findAllByType("button");
        act(() => {
            buttons[0].props.onClick();
        });
        expect(onChoice).toHaveBeenCalledWith("report");
    });

    it("disables decisions without emitting a choice", () => {
        const onChoice = vi.fn();
        act(() => {
            renderer = TestRenderer.create(
                <TreeSpecDecisionView node={node} onChoice={onChoice} disabled />,
            );
        });

        const buttons = renderer!.root.findAllByType("button");
        expect(buttons.every((button) => button.props.disabled === true)).toBe(true);

        act(() => {
            buttons[0].props.onClick();
        });
        expect(onChoice).not.toHaveBeenCalled();
    });

    it("renders the empty state when there is no current node", () => {
        act(() => {
            renderer = TestRenderer.create(
                <TreeSpecDecisionView node={null} emptyState={<p>Complete</p>} onChoice={vi.fn()} />,
            );
        });

        expect(renderer!.root.findByType("p").children).toEqual(["Complete"]);
    });
});
