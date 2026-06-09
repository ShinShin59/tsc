# ADR-0003: Select → visualize → validate game loop

## Status

Accepted

## Context

GDD §2 defines a three-step flow to preserve strategic play:

1. **Sélection** — pick a cell (no coup yet)
2. **Visualisation** — consult the Carte d'identité
3. **Validation** — encoche (checkmark) confirms the essai, runs comparison, increments coup counter

The current prototype records a click immediately in `useGameStore.addClick`, which skips visualisation and validation and misaligns with difficulty rules (GDD §4: Moyen/Hardcore hide or delay the identity card).

## Decision

Split interaction state:

| Phase | State | Effect |
| ----- | ----- | ------ |
| Sélection | `selectedNumber: number \| null` | Highlights cell, shows Carte d'identité per difficulty |
| Validation | encoche on `ElementCell` | Appends to `validatedEssais[]`, runs highlight/shadow, increments `coupCount` |
| Cancel | deselect / pick another | Clears selection without coup |

Remove direct `addClick` on grid click. The provisional `clicks[]` array will be replaced by `validatedEssais` + `selectedNumber`.

## Consequences

- `ElementCell` gains an encoche affordance visible during visualisation (hidden in Hardcore until rules say otherwise).
- `CaseSelectionnee` shows the element under visualisation, not the last validated coup.
- History module (GDD §3) reads from `validatedEssais`, not raw clicks.
- Difficulty setting gates when the identity card appears (on select vs on validate vs never).
- Comparison engine triggers only on validation, feeding the Carte mystère.
