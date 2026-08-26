# `@signalsafe/tree-spec-learner-react`

UI-kit agnostic React view for presenting one current TreeSpec decision to a learner.

| | |
|---|---|
| **npm** | `@signalsafe/tree-spec-learner-react` |
| **Peer deps** | `react`, `react-dom` |
| **Runtime types** | `NodeView` from `@signalsafe/simulator-core` |

## What this package does

- Renders the current node prompt.
- Renders each available choice as an accessible button using its caption/label.
- Provides a learner-facing caption slot.
- Exposes semantic `tree-spec-decision-view-*` class hooks without requiring Bootstrap or another UI library.

The host owns loading, persistence, authentication, routing, analytics, and session advancement. Use `@signalsafe/simulator-core` to create and advance a TreeSpec session, or supply a server-returned current node.

## What this package does not do

- It does not render a phone or device shell; use `@signalsafe/simulator-react` for that.
- It does not render a graph editor; use `@signalsafe/tree-spec-editor-react` or `@signalsafe/tree-spec-editor` for authoring.
- It does not call an API or persist learner decisions.

## Install

```bash
npm install @signalsafe/tree-spec-learner-react @signalsafe/simulator-core react react-dom
```

## Usage

```tsx
import { useState } from "react";
import {
    createInitialTreeSpecSession,
    getTreeSpecNodeView,
    dispatchTreeSpecChoice,
    type TreeSpecSessionState,
} from "@signalsafe/simulator-core";
import TreeSpecDecisionView from "@signalsafe/tree-spec-learner-react";

export function Learner({ treeSpec }) {
    const [session, setSession] = useState<TreeSpecSessionState>(() =>
        createInitialTreeSpecSession(treeSpec),
    );
    const [ended, setEnded] = useState(false);

    const node = ended ? null : getTreeSpecNodeView(session.spec, session.currentNodeId);

    function choose(choiceId: string) {
        const result = dispatchTreeSpecChoice(session, session.currentNodeId, choiceId);
        setSession(result.state);
        setEnded(result.status === "ended");
    }

    return (
        <TreeSpecDecisionView
            node={node}
            caption="What would you do?"
            onChoice={choose}
            emptyState={<p>Scenario complete.</p>}
        />
    );
}
```

The `renderPrompt` prop lets a host add presentation around the prompt while retaining the package's choice controls. For a server-backed flow, pass the current API node and call the host's decision endpoint from `onChoice`.

## Styling

The package does not import CSS. Add host-owned styles for the semantic hooks:

```css
.tree-spec-decision-view__caption {
    color: var(--learner-muted, #5f6368);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.tree-spec-decision-view__prompt {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
}

.tree-spec-decision-view__choices {
    display: grid;
    gap: 0.5rem;
}

.tree-spec-decision-view__choice {
    cursor: pointer;
    padding: 0.65rem 0.9rem;
    text-align: left;
}
```

## Security

Hosts must validate TreeSpec content before presentation, authorize access to learner content, and treat labels/prompts as untrusted content when adding custom HTML renderers.
