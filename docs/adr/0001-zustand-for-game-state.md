# ADR-0001: Zustand for game state

## Status

Accepted (revised 2026-06-09 — aligned with GDD)

## Context

Cross-surface game state spans the periodic table, identity cards, mystery card, history, and coup counter. Header overlay open/close is local to `Header` and unrelated.

The GDD (§2–3) requires session state for: current selection vs committed coups, mystery element index, discovered mystery properties, difficulty/toggles, and palette mode.

## Decision

Use Zustand (`src/store/game.ts`) as the single game-state store. Extend it as GDD features land; do not split prematurely.

Header overlay state stays in `Header` until another module needs it.

## Consequences

- `PeriodicTable`: hover → `setHoveredNumber`, click → `commitSelection` (see ADR-0003).
- `CaseSelectionnee` subscribes for visualisation preview.
- Daily mystery: `dailySeed`, `mysteryNumber` (see ADR-0002).
- Comparison (ADR-0003): `hoveredNumber` + `committedNumber`; match/mismatch derived at render — no cached comparison set.
- **`history[]` + `partieMaxTries`:** append on `commitSelection` when element changes (see ADR-0003, ADR-0005). UI: `Historique` at `top-6 right-[11%]` — last 10 coups visible, `HistoryCase` tiles + per-coup jauge (`HISTORY_CELL_SIZE = 26`, container ~278px).
- **`maxTries`:** user preference for coup cap (settings slider); snapshotted as `partieMaxTries` at partie start (ADR-0005).
- **`partieStatus`, `gameMode`, `seed`:** win/loss lifecycle and training reset (ADR-0005).
- Carte mystère discovery derived from `history[]` via `getDiscoveredPropertyIds` — not a persisted Set (ADR-0005).
- Future slices: `coupCount` UI, `difficulty`, `paletteMode`, localStorage persistence.
- Settings affecting gameplay (difficulty, toggles) move from `SettingsButton` local state into the store when wired.
- LocalStorage persistence (GDD §6) layers on top of this store later — not in scope yet.
