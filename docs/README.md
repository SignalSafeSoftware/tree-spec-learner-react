# Documentation images

These SVGs are generated from the incident-response TreeSpec example in [`demo/treeSpecExample.mjs`](./demo/treeSpecExample.mjs). The generator imports the built public exports from `@signalsafe/tree-spec-learner-react`, runs the `@signalsafe/simulator-core` session, and renders the learner view and feedback toast into the SVG assets.

- [TreeSpec example flow](./tree-spec-example-flow.svg) — branching nodes and terminal outcomes.
- [Learner decision view](./tree-spec-learner-view.svg) — the current node rendered with DeliveryPlus-style host CSS.
- [Decision feedback toast](./tree-spec-feedback-toast.svg) — optional post-decision learner guidance.

The package emits semantic class hooks and leaves visual styling to the host application. The DeliveryPlus host uses Bootstrap-compatible tokens to produce the appearance shown here.

Regenerate the images after changing the components or example data:

```bash
yarn docs:images
```

CI can verify that committed images match the generator with:

```bash
yarn docs:check
```
