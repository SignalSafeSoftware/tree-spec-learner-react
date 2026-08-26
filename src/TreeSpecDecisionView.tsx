import type { ReactNode } from "react";
import type { NodeView } from "@signalsafe/simulator-core";
import { joinClasses } from "./classNames.js";

const ROOT_CLASS = "tree-spec-decision-view";

export type TreeSpecDecisionChoice = NodeView["choices"][number];

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
}

export default function TreeSpecDecisionView({
    node,
    caption,
    onChoice,
    disabled = false,
    className,
    emptyState = null,
    renderPrompt,
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
                {node.choices.map((choice) => (
                    <button
                        key={choice.id}
                        type="button"
                        className={`${ROOT_CLASS}__choice`}
                        disabled={disabled}
                        onClick={() => {
                            if (!disabled) onChoice(choice.id);
                        }}
                    >
                        {choice.label}
                    </button>
                ))}
            </fieldset>
        </article>
    );
}
