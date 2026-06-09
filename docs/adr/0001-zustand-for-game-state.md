# ADR-0001: Zustand for game state

## Status

Accepted (revised 2026-06-09 — aligned with GDD)

## Context

Cross-surface game state spans the periodic table, identity cards, mystery card, history, coup counter, and match gauge. Header overlay open/close is local to `Header` and unrelated.

The GDD (§2–3) requires session state for: current selection vs validated essais, mystery element index, discovered mystery properties, difficulty/toggles, and palette mode.

## Decision

Use Zustand (`src/store/game.ts`) as the single game-state store. Extend it as GDD features land; do not split prematurely.

Header overlay state stays in `Header` until another module needs it.

## Consequences

- `PeriodicTable` currently calls `addClick` on cell click — **temporary**; GDD requires select → visualize → validate (encoche) before recording a coup (see ADR-0003).
- `CaseSelectionnee` subscribes for visualisation preview.
- Daily mystery: `dailySeed`, `mysteryNumber` (see ADR-0002).
- Comparison (ADR-0003): `hoveredNumber` + `committedNumber`; match/mismatch derived at render — no cached comparison set.
- **`history[]` deferred:** append each new click to `history[]` when the historique module lands (easy hook on `commitSelection`).
- Future slices: `discoveredProperties`, `coupCount`, `difficulty`, `paletteMode`, training seed.
- Settings affecting gameplay (difficulty, toggles) move from `SettingsButton` local state into the store when wired.
- LocalStorage persistence (GDD §6) layers on top of this store later — not in scope yet.
