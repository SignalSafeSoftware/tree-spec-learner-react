# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2026-08-28

### Changed

- Require published `@signalsafe/simulator-core` **^0.1.10**.
- Update the documentation/demo dependency to `@signalsafe/tree-spec` **^0.3.4**.

### Added

- UI-kit agnostic `TreeSpecDecisionView` React component for presenting the
  current TreeSpec learner decision.
- UI-kit agnostic `DecisionFeedbackToast` React component for optional
  post-decision learner feedback.

### Notes

- The host application owns session state, persistence, routing, analytics, and
  styling.
- The package has no Bootstrap or other UI-library dependency.

[Unreleased]: https://github.com/SignalSafeSoftware/tree-spec-learner-react/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/SignalSafeSoftware/tree-spec-learner-react/releases/tag/v0.1.1
