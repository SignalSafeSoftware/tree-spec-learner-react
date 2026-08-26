import { Children, type ReactNode } from "react";
import { joinClasses } from "./classNames.js";

const ROOT_CLASS = "tree-spec-decision-feedback-toast";
const MAX_RED_FLAGS = 6;

/** Feedback shown after a learner submits a decision. */
export interface DecisionFeedback {
    title?: ReactNode;
    body?: ReactNode;
    redFlags?: readonly ReactNode[];
    takeaway?: ReactNode;
}

export interface DecisionFeedbackToastProps {
    /** Feedback to display. The toast renders nothing when it has no content. */
    feedback: DecisionFeedback | null | undefined;
    /** Called when the learner dismisses the toast. */
    onClose: () => void;
    /** Optional host styling hook in addition to the package's semantic classes. */
    className?: string;
    /** Label rendered on the dismiss button. */
    closeLabel?: ReactNode;
}

function hasContent(value: ReactNode | undefined): boolean {
    return value !== undefined && value !== null && value !== false && value !== "";
}

function displayableRedFlags(feedback: DecisionFeedback): ReactNode[] {
    return (feedback.redFlags ?? []).filter(hasContent).slice(0, MAX_RED_FLAGS);
}

export default function DecisionFeedbackToast({
    feedback,
    onClose,
    className,
    closeLabel = "Close",
}: Readonly<DecisionFeedbackToastProps>) {
    if (!feedback) return null;

    const redFlags = displayableRedFlags(feedback);
    const hasFeedback =
        hasContent(feedback.title) ||
        hasContent(feedback.body) ||
        redFlags.length > 0 ||
        hasContent(feedback.takeaway);

    if (!hasFeedback) return null;

    return (
        <aside
            className={joinClasses(ROOT_CLASS, className)}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            data-testid="decision-feedback-toast"
        >
            <div className={`${ROOT_CLASS}__body`}>
                <div className={`${ROOT_CLASS}__header`}>
                    <div className={`${ROOT_CLASS}__content`}>
                        {hasContent(feedback.title) && (
                            <div className={`${ROOT_CLASS}__title`}>{feedback.title}</div>
                        )}
                        {hasContent(feedback.body) && (
                            <div className={`${ROOT_CLASS}__body-text`}>{feedback.body}</div>
                        )}
                    </div>
                    <button
                        type="button"
                        className={`${ROOT_CLASS}__close`}
                        onClick={onClose}
                    >
                        {closeLabel}
                    </button>
                </div>

                {redFlags.length > 0 && (
                    <div className={`${ROOT_CLASS}__red-flags`}>
                        <div className={`${ROOT_CLASS}__red-flags-title`}>Red flags</div>
                        <ul className={`${ROOT_CLASS}__red-flags-list`}>
                            {Children.map(redFlags, (redFlag) => (
                                <li className={`${ROOT_CLASS}__red-flag`}>
                                    {redFlag}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {hasContent(feedback.takeaway) && (
                    <div className={`${ROOT_CLASS}__takeaway`}>
                        <span className={`${ROOT_CLASS}__takeaway-label`}>Takeaway:</span>{" "}
                        {feedback.takeaway}
                    </div>
                )}
            </div>
        </aside>
    );
}
