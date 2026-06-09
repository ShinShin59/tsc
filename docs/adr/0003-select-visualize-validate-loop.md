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
| **Hover** cell | Live preview in `CaseSelectionnee`; Carte d'identité all rows **dimmed** (values visible) |
| **Click** cell | **Coup** — commit comparison on that element: matching rows **accent**, rest dimmed — even while pointer stays on the cell; append to `history[]` when element changes |
| **Mouse leave** grid | Restore last **committed** element (100% + frozen comparison) |
| **Hover** another cell after commit | Live preview again (dimmed rows); leave restores commit |
| **Re-click** same cell | No-op |

### Touch (`pointer: coarse`)

**Tap = click** — single tap commits comparison immediately (no hover preview). Acceptable for landscape mobile (GDD responsive constraint).

**Deferred:** two-tap preview-then-commit on touch-only devices (`pointer: coarse`) — same store shape, extra click-branch later.

### Store (`src/store/game.ts`)

| Field | Role |
| ----- | ------ |
| `hoveredNumber` | Current grid hover; `null` when pointer off table |
| `committedNumber` | Last clicked element; persists on mouse leave |

Comparison is **derived at render** from `committedNumber` vs `mysteryNumber` — no cached match set.

**Coup = click commit** (encoche deferred indefinitely). Each distinct commit is one **coup** — historique lists coups chronologically (see module d'historique in `UBIQUITOUS_LANGUAGE.md`).

**Historique:** append atomic number to `history[]` inside `commitSelection` when `committedNumber` changes; cap length by `maxTries` (store field, default 118; enforcement deferred until difficulty/settings).

### Property matching (`propertiesMatch`)

Typed per property — not formatted-string equality:

- Scalars (`period`, `group`, `block`, `family`, `state`, `nutrition`, `discovery`, `stability`): equality on resolved values.
- **Synthèse** / **Étymologie**: set overlap on raw origins/categories (`getSynthesisOrigins`, `getNameOriginCategories`).

### Identity card row states

`IdentityPropertyState = "match" | "mismatch"` — dimmed rows show values; accent only after commit on that element.

## Consequences

- `PeriodicTable`: `onMouseEnter` / `onMouseLeave` on grid wrapper + per-cell click; remove click-to-select-only flow.
- `CaseSelectionnee`: shows hovered or committed element at full slot scale (hover scale / commit animation deferred).
- `CarteIdentite`: row state from hover vs committed comparison mode.
- `CarteMystere`: unchanged this slice (mock reveals remain).
- Difficulty modes (§4) and compteur de coups UI deferred; **commit = coup** is canonical.
- Unit tests for `propertiesMatch` (scalar + multi-value overlap cases).
