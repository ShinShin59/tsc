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

## Target game loop (GDD §2)

Strict three-step flow — selection alone must **not** count as a coup:

```
1. Sélection    → player picks a cell on the tableau
2. Visualisation → Carte d'identité appears for consultation
3. Validation   → player confirms via encoche (checkmark) on the element
                  → comparison engine runs vs élément mystère
                  → coup counter increments
```

### Comparison engine (triangulation)

For each property on the validated element vs the mystery element:

| Result | UI term | Behaviour |
| ------ | ------- | --------- |
| Same value | **Highlight** (surbrillance) | Property illuminates on the identity card |
| Different value | **Shadow** (ombre) | Property stays greyed / recessed |
| Discovered match | **Carte mystère** | Matching properties lock onto the mystery summary card |

Each validated coup narrows the search space — the core **triangulation** loop.

## Daily mystery + training (GDD §5)

| Mode | Seed | When |
| ---- | ---- | ---- |
| **Daily** | `YYYY-MM-DD` (client-side) | One shared mystery element worldwide; rotates at 00:00 |
| **Entraînement** | Random | Unlocked after solving the daily element; unlimited practice |

No server required for daily sync — seed-derived index into elements 1–118.

## Stack

React 19, TypeScript, Vite 8, Tailwind CSS 4, Zustand, Base UI, Lucide. GitHub Pages (`base: /osc/`). Data sources: PubChem (physical constants), NASA (nucleosynthesis).

## Module map (current code)

```
App
├── Header          — title + overlays (stats, help, info, settings)
└── Game
    ├── PeriodicTable   — 18-column grid, ElementCell + PlaceholderCell
    ├── CaseSelectionnee  — enlarged preview during visualisation
    ├── CarteIdentite     — identity card for selected element
    ├── CaseMystere       — mystery element placeholder
    ├── CarteMystere      — mystery card (discovered properties)
    └── Legende         — property-type legend strip
```

### Data layer

- `src/data/periodic-table.ts` — `PeriodicTableJSON.json` → `Element` records with category colours and grid positions. **Missing GDD fields:** bloc, état, synthèse, stabilité, étymologie, CHNOPS, discovery date.
- `src/store/game.ts` — Zustand: `clicks[]` (last 6 atomic numbers), `addClick`, `reset`. **Diverges from GDD:** click immediately records a coup; no select → visualize → validate flow.

### UI primitives

- `src/components/ui/` — shadcn-style Base UI wrappers
- `src/components/header/` — overlay buttons; `OverlayId` in `shared.ts`

## Planned UI (GDD §3–4)

| Feature | GDD name | Notes |
| ------- | -------- | ----- |
| Move counter | Compteur de coups | Prominent; optimizes deduction |
| History | Module d'historique | Chronological essais; hover replays identity card with highlight/shadow |
| Match gauge | Jauge de correspondance | % proximity from shared properties |
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
| Click → immediate `clicks` record | Done | **Diverges** — should be select-only until encoche |
| CaseSelectionnee enlarged preview | Prototype | Maps to visualisation step, not validation |
| Legende property strip | UI shell | Not wired to identity cards or palettes |
| Encoche validation button | Not started | §2 core mechanic |
| Carte d'identité + highlight/shadow | Not started | §2 |
| Carte mystère (discovered properties) | Prototype | Presentation mock; wire to comparison engine |
| Date-seed daily mystery | Not started | §5 |
| History + hover replay | Not started | §3 |
| Compteur / jauge / histogramme | Not started | §3 |
| Colour palette modes | Not started | §3 |
| Difficulty levels + toggles | Not started | §4 |
| PubChem + NASA enriched dataset | Not started | §5 |
| LocalStorage session persistence | Not started | §6 future |
| Training mode (post-daily) | Not started | §6 future |

## Constraints

- **Mobile:** landscape only (18:7 grid ratio); UI should prompt rotation.
- **Multi-value cells:** diagonal split colouring when an element has multiple synthesis/origin values (e.g. Thorium).

## Key files

| Path | Role |
| ---- | ---- |
| `docs/reus/1-08-06-26.md` | GDD — mechanics, UI spec, data, difficulty |
| `src/store/game.ts` | Game state — needs validation flow, mystery seed, history |
| `src/data/periodic-table.ts` | Element model — extend with identity-card properties |
| `src/components/game/ElementCell.tsx` | Cell + future encoche button |
| `src/components/game/Legende.tsx` | Property legend; palette mode selector candidate |
| `src/components/Header.tsx` | Overlay coordination |

## Conventions

- French UI copy; English code identifiers.
- Atomic numbers 1-based. Grid positions 1-based (`xpos`, `ypos`).
- Path alias `@/` → `src/`.
- Use GDD terms (highlight/shadow, encoche, triangulation) in issues and docs.

## Related docs

- `UBIQUITOUS_LANGUAGE.md` — canonical terms
- `docs/adr/` — architectural decisions
- `docs/agents/` — skill wiring
