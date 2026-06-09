# CONTEXT — OSC / ELEMENTAIRE

**Daily Mystery Element** deduction game inspired by Metazoa. Each day, players worldwide triangulate toward **l'élément mystère** by comparing element properties. Identify it in as few **coups** as possible.

**Authoritative design:** [`docs/reus/1-08-06-26.md`](docs/reus/1-08-06-26.md) (GDD, première réunion, 2026-06-08).  
**Property taxonomy reference:** `README.md` (etymology, stability, CHNOPS tables).  
**Live site:** [shinshin59.github.io/osc](https://shinshin59.github.io/osc/) · **Repo:** [github.com/ShinShin59/osc](https://github.com/ShinShin59/osc)

## Pedagogical goals

- Periodic structure: periods, groups, blocks (s, p, d, f)
- Biological classification: macro-elements, CHNOPS system
- Nucleosynthesis: cosmic origins (Big Bang, neutron-star merger, etc.)
- Intrinsic properties: matter state, nuclear stability, etymology

## Target game loop (ADR-0003; GDD §2 encoche deferred)

Hover → browse, click → compare against l'élément mystère:

```
1. Survol       → Carte d'identité preview (all properties dimmed, values visible)
2. Clic         → comparison vs élément mystère (Highlight / Shadow on identity card)
3. Carte mystère → matching properties lock in from committed coups (ADR-0005)
4. Fin de partie → win on mystery commit; loss at coup cap; CaseMystere reveal
5. Nouvelle partie → training reset with random seed (ADR-0005)
```

> _GDD §2 originally required encoche before comparison — superseded by ADR-0003 for the prototype._

### Comparison engine (triangulation)

For each property on the validated element vs the mystery element:

| Result | UI term | Behaviour |
| ------ | ------- | --------- |
| Same value | **Highlight** (surbrillance) | `match` in code — accent on identity card |
| Different value | **Shadow** (ombre) | `mismatch` in code — dimmed on identity card |
| Discovered match | **Carte mystère** | Matching properties lock onto the mystery summary card |

Each validated coup narrows the search space — the core **triangulation** loop.

## Daily mystery + training (GDD §5)

| Mode | Seed | When |
| ---- | ---- | ---- |
| **Daily** | `YYYY-MM-DD` (Europe/Paris, client-side) | One shared mystery element; rotates at Paris midnight |
| **Entraînement** | Random | Unlocked after solving the daily element; unlimited practice |

No server required for daily sync — seed-derived index into elements 1–118.

## Stack

React 19, TypeScript, Vite 8, Tailwind CSS 4, Zustand, Base UI, Lucide. GitHub Pages (`base: /osc/`). Data sources: PubChem (physical constants), NASA (nucleosynthesis).

## Module map (current code)

```
App
├── Header          — title + overlays (stats, help, info, settings)
└── Game
    ├── PeriodicTable   — 18-column grid, ElementCell (hover + click)
    ├── CaseSelectionnee  — enlarged cell preview (hover or last commit)
    ├── CarteIdentite     — identity card; Highlight/Shadow via match/mismatch
    ├── CaseMystere       — mystery element placeholder; reveals symbol on win/loss
    ├── CarteMystere      — mystery card (discovered properties from history)
    ├── Historique        — last 10 coups + jauge bars; hover replays identity card
    ├── NouvellePartieButton — training reset (bottom-left)
    └── Legende         — property-type legend strip
```

### Data layer

- `src/data/elements.ts` — `PeriodicTableJSON.json` → `Element` records; enriched identity fields via `src/data/enriched/`.
- `src/store/game.ts` — Zustand: `seed`, `gameMode`, `mysteryNumber`, `partieStatus`, `maxTries`, `partieMaxTries`, hover/commit comparison, `history`, `startTrainingPartie`.
- `src/lib/properties-match.ts` — `propertiesMatch`, `getDiscoveredPropertyIds`, `countMatchingProperties`.

### UI primitives

- `src/components/ui/` — shadcn-style Base UI wrappers
- `src/components/header/` — overlay buttons; `OverlayId` in `shared.ts`

## Planned UI (GDD §3–4)

| Feature | GDD name | Notes |
| ------- | -------- | ----- |
| Move counter | Compteur de coups | Prominent; optimizes deduction |
| History | Module d'historique | Chronological coups; hover replay; per-coup jauge de correspondance |
| Help | Bouée | Tutorial / rules |
| Settings | Roue crantée | Difficulty, toggles, palette mode |
| Stats | Histogramme | Score distribution; local mock first, server later |
| Colour palettes | Menu déroulant | Famille · État · Synthèse · Origine du nom · Aucune; diagonal split for multi-value cells |
| Difficulty | Facile / Moyen / Hardcore | Controls identity-card timing, grid labels, mystery-card help |
| Toggles | — | Legends, colour codes, text labels independently |

### Difficulty matrix (GDD §4)

| | Facile | Moyen | Hardcore |
| --- | ------ | ----- | -------- |
| Carte d'identité | On simple click | After validation | Hidden |
| Grid display | Symbol + name + number | Symbol only | Empty grid (position only) |
| Mystery card help | Full completion | Partial | None |

## Implemented vs planned

| Area | Status | GDD alignment |
| ---- | ------ | ------------- |
| Periodic table grid (118 elements) | Done | Famille palette only |
| Hover preview + click comparison | Done | ADR-0003 (GDD encoche deferred) |
| Daily mystery (Paris date seed) | Done | ADR-0002 |
| CaseSelectionnee enlarged preview | Done | Hover or last commit |
| Legende property strip | UI shell | Not wired to palette modes |
| Carte d'identité Highlight/Shadow | Done | Identity card only |
| Carte mystère (discovered properties) | Done | ADR-0005; derived from `history[]` |
| Win / loss + CaseMystere reveal | Done | ADR-0005 |
| Coup cap slider (settings) | Done | `maxTries` / `partieMaxTries`; session-only |
| Nouvelle partie (training) | Done | ADR-0005; always available MVP |
| Encoche validation | Deferred | Superseded by click-to-compare (ADR-0003) |
| History + hover replay + per-coup jauge | Done | §3 |
| Compteur / histogramme | Not started | §3 |
| Colour palette modes | Not started | §3 |
| Difficulty levels + toggles | Not started | §4 |
| LocalStorage session persistence | Not started | §6 future |
| Training gated behind daily win | Deferred | ADR-0002 full flow |

## Constraints

- **Mobile:** landscape only (18:7 grid ratio); UI should prompt rotation.
- **Multi-value cells:** diagonal split colouring when an element has multiple synthesis/origin values (e.g. Thorium).

## Key files

| Path | Role |
| ---- | ---- |
| `docs/reus/1-08-06-26.md` | GDD — mechanics, UI spec, data, difficulty |
| `src/store/game.ts` | Game state — mystery seed, hover/commit comparison |
| `src/lib/properties-match.ts` | Typed property comparison vs mystery |
| `src/lib/daily-mystery.ts` | Paris date seed → mystery index |
| `src/data/elements.ts` | Element model + grid positions |
| `src/components/game/ElementCell.tsx` | Table cell (hover + click) |
| `src/components/game/Legende.tsx` | Property legend; palette mode selector candidate |
| `src/components/Header.tsx` | Overlay coordination |

## Conventions

- French UI copy; English code identifiers.
- Atomic numbers 1-based. Grid positions 1-based (`xpos`, `ypos`).
- Path alias `@/` → `src/`.
- Use GDD terms (Highlight/Shadow, triangulation) in issues and docs; code uses `match`/`mismatch` (see `UBIQUITOUS_LANGUAGE.md`).

## Related docs

- `UBIQUITOUS_LANGUAGE.md` — canonical terms
- `docs/adr/` — architectural decisions
- `docs/agents/` — skill wiring
