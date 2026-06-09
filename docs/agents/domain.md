# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

1. **`docs/reus/1-08-06-26.md`** — GDD (game loop, UI spec, difficulty, daily seed, data sources). **Authoritative for mechanics.**
2. **`CONTEXT.md`** — agent-facing codebase map, implemented vs planned, known divergences.
3. **`UBIQUITOUS_LANGUAGE.md`** — canonical French/English domain terms.
4. **`docs/adr/`** — architectural decisions (read ADRs touching your area).
5. **`README.md`** — detailed property taxonomy tables (supplements GDD).

If `CONTEXT.md` or ADRs don't exist yet for a topic, proceed — but never contradict the GDD without flagging it.

## File structure

Single-context repo:

```
/
├── CONTEXT.md
├── UBIQUITOUS_LANGUAGE.md
├── docs/
│   ├── reus/           ← meeting notes & GDD
│   │   └── 1-08-06-26.md
│   ├── adr/
│   └── agents/
└── src/
```

## Use the glossary's vocabulary

When naming domain concepts (issues, refactors, tests), use terms from `UBIQUITOUS_LANGUAGE.md`:

- **Coup** = validated attempt (encoche), not a bare click
- **Highlight** / **Shadow**, not "match/mismatch" or "green/red"
- **Triangulation**, not "filtering" or "narrowing"
- **Carte mystère**, not "answer card"

## Flag conflicts

If your output contradicts the GDD or an ADR, surface it explicitly:

> _Contradicts GDD §2 (validation via encoche) — current `addClick` records immediately…_

> _Contradicts ADR-0002 (date-seed daily mystery) — but worth reopening because…_
