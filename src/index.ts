/**
 * UI-kit agnostic React learner surface for a current TreeSpec decision.
 *
 * This package intentionally owns only presentation. Hosts supply the current
 * node (for example a `NodeView` from `@signalsafe/simulator-core`) and decide how choices are persisted,
 * submitted, or advanced.
 */

export { default, default as TreeSpecDecisionView } from "./TreeSpecDecisionView.js";
export type {
    TreeSpecDecisionChoice,
    TreeSpecDecisionNode,
    TreeSpecDecisionViewProps,
    TreeSpecDecisionChoiceState,
} from "./TreeSpecDecisionView.js";
export {
    default as DecisionFeedbackToast,
} from "./DecisionFeedbackToast.js";
export type {
    DecisionFeedback,
    DecisionFeedbackToastProps,
} from "./DecisionFeedbackToast.js";
