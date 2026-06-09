# ADR-0003: Hover preview → click comparison loop

## Status

Accepted (revised 2026-06-09 — supersedes encoche-based flow)

## Context

GDD §2 originally defined select → visualise → **encoche** validation before comparison. During implementation we chose a lighter loop: **hover to browse**, **click to compare** against l'élément mystère. No encoche affordance.

> _Contradicts GDD §2 (validation via encoche)_ — intentional prototype simplification; revisit if difficulty modes (§4) need delayed identity-card reveal.

Comparison feeds the **Carte d'identité** only in this slice. **Carte mystère** wiring is a follow-up.

## Decision

### Interaction

| Input | Effect |
| ----- | ------ |
| **Hover** cell | Live preview in `CaseSelectionnee`; Carte d'identité all rows **dimmed** (values visible) — unless that element is already in `history[]` (see historique replay) |
| **Click** cell | **Coup** — commit comparison on that element: matching rows **accent**, rest dimmed — even while pointer stays on the cell; append to `history[]` when element changes |
| **Mouse leave** grid | Restore last **committed** element (100% + frozen comparison) |
| **Hover** another cell after commit | Live preview again (dimmed rows) if not yet in `history[]`; leave restores commit |
| **Hover** historique entry (tile + jauge) | Same as `setHoveredNumber` — replays that coup with Highlight/Shadow (no separate store field) |
| **Mouse leave** historique strip | `hoveredNumber = null` on container leave; restore last commit |
| **Historique UI** | Hidden until `history.length > 0`; last 10 coups visible (`HISTORY_VISIBLE_COUNT`), oldest left → newest right; `absolute top-6 right-[11%]` on game area; symbol-only tiles (`HISTORY_CELL_SIZE = 26`, container ~278px) |
| **Re-click** same cell | No-op |

### Touch (`pointer: coarse`)

**Tap = click** — single tap commits comparison immediately (no hover preview). Acceptable for landscape mobile (GDD responsive constraint).

**Deferred:** two-tap preview-then-commit on touch-only devices (`pointer: coarse`) — same store shape, extra click-branch later.

### Store (`src/store/game.ts`)

| Field | Role |
| ----- | ------ |
| `hoveredNumber` | Grid or historique hover; `null` when pointer off both |
| `committedNumber` | Last clicked element; persists on mouse leave |
| `history` | Chronological coup list (atomic numbers); append on commit when element changes and under `partieMaxTries` |
| `maxTries` | User preference for coup cap (settings slider, default 118) |
| `partieMaxTries` | Active cap for current partie; snapshotted at init / `startTrainingPartie` (ADR-0005) |
| `partieStatus` | `"playing" \| "won" \| "lost"` — blocks commits when not playing (ADR-0005) |

Comparison is **derived at render** from `committedNumber` vs `mysteryNumber` — no cached match set. Carte mystère discovery derived from `history[]` (ADR-0005).

**Historique:** append atomic number to `history[]` inside `commitSelection` when `committedNumber` changes and `history.length < partieMaxTries`. When at cap or partie ended, **commits are no-ops**; grid hover browse and historique replay still work. Win/loss UI: ADR-0005.

### Property matching (`propertiesMatch`)

Typed per property — not formatted-string equality:

- Scalars (`period`, `group`, `block`, `family`, `state`, `nutrition`, `discovery`, `stability`): equality on resolved values.
- **Synthèse** / **Étymologie**: set overlap on raw origins/categories (`getSynthesisOrigins`, `getNameOriginCategories`).

### Identity card row states

`IdentityPropertyState = "match" | "mismatch"` — dimmed rows show values.

**Show comparison** (Highlight/Shadow) when `displayNumber` is in `history[]`, or when showing last commit with no hover (`hoveredNumber === null && displayNumber === committedNumber`). Otherwise all rows dimmed (grid browse of an uncommitted element).

## Consequences

- `PeriodicTable`: `onMouseEnter` / `onMouseLeave` on grid wrapper + per-cell click; remove click-to-select-only flow.
- `CaseSelectionnee`: shows hovered or committed element at full slot scale (hover scale / commit animation deferred).
- `CarteIdentite`: row state from hover vs committed comparison mode.
- `Historique` + `HistoryCase`: per-coup jauge via `countMatchingProperties`; hover replay via shared `hoveredNumber`.
- `CarteMystere`: discovery from `history[]` via `getDiscoveredPropertyIds` (ADR-0005).
- Difficulty modes (§4) and compteur de coups UI deferred; **commit = coup** is canonical.
- Unit tests for `propertiesMatch` (scalar + multi-value overlap cases).
