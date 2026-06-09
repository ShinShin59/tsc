# Agent instructions

## Agent skills

### Issue tracker

Issues live on GitHub (`ShinShin59/osc`). See `docs/agents/issue-tracker.md`.

### Triage labels

Canonical triage labels with no overrides. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.

## Design authority

Before implementing game mechanics or UI, read:

1. **`docs/reus/1-08-06-26.md`** — GDD from première réunion (authoritative for loop, UI, difficulty, daily seed)
2. **`CONTEXT.md`** — codebase map and implementation status vs GDD
3. **`UBIQUITOUS_LANGUAGE.md`** — canonical French terms (encoche, highlight/shadow, triangulation, etc.)
4. **`README.md`** — property taxonomy tables (etymology, stability, CHNOPS detail)

Current code diverges from the GDD: clicks are recorded immediately without encoche validation. Treat that as tech debt, not intended behaviour.
