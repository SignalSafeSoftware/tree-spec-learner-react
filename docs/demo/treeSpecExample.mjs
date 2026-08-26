import { END_NODE_ID } from "@signalsafe/tree-spec";

/**
 * Single source of truth for the documentation images. The generator runs the
 * same session runtime that a host application would use.
 */
export const incidentResponseTreeSpec = {
    start_node: "triage",
    nodes: {
        triage: {
            type: "prompt",
            prompt: "An employee reports a suspicious attachment. What is the first response?",
            choices: [
                {
                    id: "investigate",
                    label: "Investigate the email headers and isolate the device",
                    feedback: {
                        title: "Good instinct",
                        body: "You paused before trusting the attachment.",
                        red_flags: ["Unexpected request", "Suspicious attachment"],
                        takeaway: "Verify through a trusted channel before opening or responding.",
                    },
                },
                {
                    id: "dismiss",
                    label: "Assume it is harmless and dismiss the report",
                },
            ],
            render_hints: { layout: "split-panel", priority: "high" },
        },
        investigate: {
            type: "prompt",
            prompt: "The attachment contacted an unknown host. What do you do next?",
            choices: [
                {
                    id: "escalate",
                    label: "Escalate to incident response and preserve evidence",
                },
                {
                    id: "reimage",
                    label: "Reimage immediately without collecting evidence",
                },
            ],
            render_hints: { layout: "decision-card" },
        },
        recovery: {
            type: "info",
            prompt: "Notify stakeholders, document the timeline, and restore the endpoint safely.",
            choices: [{ id: "close", label: "Close incident" }],
            render_hints: { layout: "callout", tone: "success" },
        },
    },
    transitions: [
        {
            from: ["triage", "investigate"],
            to: "investigate",
            delta: { total: 5, verification: 3 },
        },
        {
            from: ["triage", "dismiss"],
            to: END_NODE_ID,
            outcome: "compromised",
        },
        {
            from: ["investigate", "escalate"],
            to: "recovery",
        },
        {
            from: ["investigate", "reimage"],
            to: END_NODE_ID,
            outcome: "at_risk",
        },
        {
            from: ["recovery", "close"],
            to: END_NODE_ID,
            outcome: "safe",
        },
    ],
};

export const learnerChoiceId = "investigate";
