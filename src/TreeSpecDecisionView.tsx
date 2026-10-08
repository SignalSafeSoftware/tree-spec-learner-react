import type { ReactNode } from "react";
import type { NodeView } from "@signalsafe/simulator-core";
import { joinClasses } from "./classNames.js";

const ROOT_CLASS = "tree-spec-decision-view";

export type TreeSpecDecisionChoice = NodeView["choices"][number];

export interface TreeSpecDecisionChoiceState {
    /** Whether the host allows this choice; omitted means available. */
    readonly available?: boolean;
    /** Optional accessible explanation shown when the choice is unavailable. */
    readonly explanation?: ReactNode;
}

export interface TreeSpecDecisionViewProps {
    /** The current runtime node. Pass null when the session has ended or is unavailable. */
    node: NodeView | null;
    /** Optional learner-facing instruction shown above the node prompt. */
    caption?: ReactNode;
    /** Called with the selected choice id. The host owns persistence and session orchestration. */
    onChoice: (choiceId: string) => void;
    /** Disables all decisions while the host is loading or submitting. */
    disabled?: boolean;
    /** Additional classes for the root element. */
    className?: string;
    /** Content shown when no current node is available. Defaults to null. */
    emptyState?: ReactNode;
    /** Optional custom prompt renderer while retaining the package's decision controls. */
    renderPrompt?: (node: NodeView) => ReactNode;
    /** Host-owned eligibility and explanation for each choice. */
    choiceState?: (choice: TreeSpecDecisionChoice) => TreeSpecDecisionChoiceState | undefined;
}

export default function TreeSpecDecisionView({
    node,
    caption,
    onChoice,
    disabled = false,
    className,
    emptyState = null,
    renderPrompt,
    choiceState,
}: Readonly<TreeSpecDecisionViewProps>) {
    if (node == null) return emptyState;

    return (
        <article
            className={joinClasses(ROOT_CLASS, className)}
            data-node-id={node.id}
        >
            {caption != null && <div className={`${ROOT_CLASS}__caption`}>{caption}</div>}

            <div className={`${ROOT_CLASS}__prompt`}>
                {renderPrompt ? renderPrompt(node) : node.prompt}
            </div>

            <fieldset
                className={`${ROOT_CLASS}__choices`}
            >
                <legend className={`${ROOT_CLASS}__choices-legend`}>Decisions</legend>
                {node.choices.map((choice) => {
                    const state = choiceState?.(choice);
                    const available = state?.available !== false;
                    const explanationId = `${ROOT_CLASS}__explanation-${choice.id}`;
                    return (
                        <div key={choice.id} className={`${ROOT_CLASS}__choice-wrapper`}>
                            <button
                                type="button"
                                className={`${ROOT_CLASS}__choice`}
                                disabled={disabled || !available}
                                aria-disabled={!available}
                                aria-describedby={state?.explanation == null ? undefined : explanationId}
                                onClick={() => {
                                    if (!disabled && available) onChoice(choice.id);
                                }}
                            >
                                {choice.label}
                            </button>
                            {state?.explanation != null && (
                                <span id={explanationId} className={`${ROOT_CLASS}__choice-explanation`}>
                                    {state.explanation}
                                </span>
                            )}
                        </div>
                    );
                })}
            </fieldset>
        </article>
    );
}
