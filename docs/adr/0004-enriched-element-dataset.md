# ADR-0004: Enriched element dataset

## Status

Accepted

## Context

GDD §2–3 and §5 require identity-card properties beyond what `PeriodicTableJSON.json` currently provides:

- Bloc, état, synthèse (normalized cosmogenic classes), stabilité (grouped tiers), étymologie, CHNOPS, discovery period
- Palette modes need état, synthèse, and origine-du-nom values per element
- Multi-value properties (e.g. Thorium synthesis) need diagonal split rendering (GDD §3)

Sources: PubChem (physical constants), NASA SVS (nucleosynthesis). README tables define category enumerations.

## Decision

- Extend the `Element` type in `src/data/periodic-table.ts` with typed identity-card fields.
- Build or import a enriched dataset (JSON or generated module) — do not fetch PubChem at runtime in v1.
- Normalize synthesis into GDD classes: Big Bang, étoiles mourantes, fusion d'étoiles à neutrons, supernova, rayons cosmiques, synthèse humaine.
- Allow `synthesis: string[]` and `nameOrigin: string[]` for multi-value diagonal cells.

## Consequences

- `periodic-table.ts` becomes the data seam; palette colour functions read from enriched fields.
- Comparison engine compares normalized enum values, not raw PubChem strings.
- README property tables remain reference for enum design; GDD is authoritative for which properties exist.
- Data enrichment is a discrete task — can ship incrementally (famille first, then état, etc.).
