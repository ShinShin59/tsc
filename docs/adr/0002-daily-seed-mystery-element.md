# ADR-0002: Date-seed daily mystery element

## Status

Accepted

## Context

GDD §5 requires a synchronized daily mystery element worldwide without a server. All players on the same calendar day must get the same element (index 1–118). Rotation at 00:00 local or UTC must be decided at implementation time.

Training mode (GDD §6) uses a random seed after the daily element is solved.

## Decision

- **Daily mode:** derive mystery element index from `YYYY-MM-DD` as a deterministic client-side seed.
- **Training mode:** derive index from a random seed after daily completion.
- No server call for element selection in v1.

## Consequences

- Implement a pure `mysteryIndexFromSeed(seed: string): number` function (1–118) — testable, no `Math.random()` in daily path.
- Store mode (`daily` | `training`) and current seed in game state.
- UI must show which mode is active; training unlock only after daily solve.
- Timezone for midnight rotation: pick one (recommend UTC for global sync) and document in code comment.
- GitHub Pages static hosting is sufficient — no backend required for daily sync.
