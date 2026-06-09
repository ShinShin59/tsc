# ADR-0005: Partie lifecycle, Carte mystère discovery, training reset

## Status

Accepted (2026-06-09)

## Context

MVP playable loop required:

1. **Carte mystère** — remove mock reveals; lock in properties discovered via committed coups.
2. **Win / loss** — partie ends on correct element commit or when the coup cap is reached.
3. **Nouvelle partie** — reset state with a random training mystery (daily gating deferred per ADR-0002).
4. **Configurable coup cap** — settings slider 1–118; preference applies at next partie start.

Grilled decisions documented in session handoff (2026-06-09).

## Decision

### Carte mystère discovery

- **Rule:** property `id` is **discovered** iff `history.some(coup => propertiesMatch(coup, mysteryNumber, id))` — including partial matches from wrong elements (GDD §2 L29).
- **State:** derived at render via `getDiscoveredPropertyIds(history, mysteryNumber)` in `properties-match.ts` — not a persisted store Set (ADR-0003 pattern).
- **Display:** discovered rows show the **full mystery value** via `resolveIdentityPropertyValue(mysteryElement, id)`; undiscovered rows show `"?"`.

### Win / loss

| Event | Effect |
| ----- | ------ |
| Commit on `mysteryNumber` | `partieStatus: "won"`; append final coup to `history` |
| `history.length >= partieMaxTries` without win | `partieStatus: "lost"` |
| `partieStatus !== "playing"` | `commitSelection` no-op; hover browse + historique replay still work |

**Win = commit mystery element** (not “all properties discovered”).

### Header subtitle

| State | Copy |
| ----- | ---- |
| Playing | `• Retrouve l'Élément mystère •` |
| Won | `Bravo — {name} en {n} coup(s)` |
| Lost | `Plus de coups — l'élément était {name} ({symbol})` |

Restored to default subtitle on `startTrainingPartie` or page reload.

### CaseMystere reveal

While `partieStatus === "playing"`: `?`. On win or loss: symbol + famille background colour (HistoryCase-style).

Carte mystère on loss keeps **partial** discoveries only — no force-fill.

### Coup cap (`maxTries` / `partieMaxTries`)

- `maxTries` — user preference (settings slider), default 118, session-only (no localStorage).
- `partieMaxTries` — snapshotted at daily init and `startTrainingPartie`; commits and loss use this field.
- `setMaxTries(n)` clamps to `[1, MAX_ATOMIC_NUMBER]` and does **not** change `partieMaxTries` mid-partie.

Settings UI: `HeaderDialog` with range slider (replaces dropdown shell).

### Training reset (`startTrainingPartie`)

Always available (daily win gate deferred). Button bottom-left of game area.

- Confirm dialog if `partieStatus === "playing"` and `history.length > 0`.
- Otherwise instant reset.
- Sets `gameMode: "training"`, `seed: crypto.randomUUID()`, new `mysteryNumber`, clears history/hover/commit, `partieStatus: "playing"`, `partieMaxTries = maxTries`.
- No mode label in UI for MVP (`gameMode` in store only).
- Return to daily: page reload only (deferred).

### Store shape (additions)

```ts
gameMode: "daily" | "training";
seed: string;
partieStatus: "playing" | "won" | "lost";
maxTries: number;
partieMaxTries: number;
setMaxTries: (n: number) => void;
startTrainingPartie: () => void;
```

Remove module-level `const dailySeed = getDailySeed()` — seed is reactive.

## Consequences

- `CarteMystere` subscribes to `history` + `mysteryNumber`.
- `CaseMystere` subscribes to `partieStatus`.
- `PeriodicTable` guards commits on `partieStatus`.
- `Header` subscribes for dynamic subtitle (`resolveHeaderSubtitle`).
- `NouvellePartieButton` in `Game.tsx`.
- Unit tests: `getDiscoveredPropertyIds`, win/loss/cap/reset in `game.test.ts`.
- Deferred: training gated behind daily win, localStorage, mode indicator UI, compteur UI, « Retour au daily ».

## Related

- ADR-0002 — daily seed; training gating follow-up
- ADR-0003 — hover/click loop; historique
- GDD §2 L29 — Carte mystère lock-in
- GDD §6 — mode entraînement (partial MVP)
