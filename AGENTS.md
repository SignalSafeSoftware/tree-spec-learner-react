# Development rules

## Scope

`@signalsafe/tree-spec-learner-react` is presentation only: `TreeSpecDecisionView` and `DecisionFeedbackToast`. The host owns sessions, persistence, routing, analytics and styling. The package has no UI-kit dependency.

- Do not import `@signalsafe/simulator-core` at runtime or in published types. Components are generic over the structural `TreeSpecDecisionNode`, which any simulator-core `NodeView` satisfies; this keeps one simulator-core copy in consumers whatever version they use.
- `@signalsafe/simulator-core` is a development dependency for the docs generator only (`docs/demo`). Keep its range on the 0.2.x line the generator targets.
- New behavior arrives as optional props or slots with defaults that preserve current output. Follow `.codex/skills/react-solid-principles/SKILL.md`.

## Quality gates

Run `yarn typecheck`, `yarn test:coverage`, `yarn smoke:package` and `yarn docs:check`. Update the pinned version in `tests/package-metadata.test.ts` when bumping.

## Releases

Follow `.codex/skills/ecosystem-release/SKILL.md`. Never tag, publish or push without explicit user approval.
