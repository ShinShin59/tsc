# Ubiquitous Language

French is the primary UI language. Code identifiers and types stay in English.  
**Source:** GDD in [`docs/reus/1-08-06-26.md`](docs/reus/1-08-06-26.md).

## Game concept

| Term | Definition | Aliases to avoid |
| ---- | ---------- | ---------------- |
| **Daily Mystery Element** | One mystery element per calendar day, same worldwide via date seed | Daily puzzle, word of the day |
| **Élément mystère** | The element to identify this session (daily or training) | Target, secret, answer |
| **Triangulation** | Elimination loop: each validated coup narrows candidates by property comparison | Deduction, elimination |
| **Partie** | Session from first selection to correct identification | Game, round |
| **Coup** | One **validated** attempt (encoche confirmed) — not a mere cell click | Try, guess, click |
| **Essai** | A selection that may or may not yet be validated | Attempt (prefer **essai** in history context) |
| **Mode entraînement** | Post-daily practice with random seed, unlimited replays | Practice mode, sandbox |

## Selection flow (ADR-0003; GDD §2 encoche deferred)

| Term | Definition | Aliases to avoid |
| ---- | ---------- | ---------------- |
| **Survol** | Pointer over a cell — browse Carte d'identité without committing | Hover |
| **Visualisation** | Carte d'identité preview (all properties dimmed, values visible) | Preview, inspect |
| **Commit** | Grid click runs comparison vs mystery (`commitSelection` in code) | Validation (GDD encoche deferred) |
| **Encoche** | GDD checkmark validation — **not implemented**; click commits instead | Check button, tick |

## Identity card & comparison

| Term | Definition | Aliases to avoid |
| ---- | ---------- | ---------------- |
| **Carte d'identité** | Property panel for the selected/validated element | Identity card, profile |
| **Carte mystère** | Summary card for the mystery element; properties lock in as matches are discovered | Mystery card, target card |
| **Highlight** (surbrillance) | Property value matches mystery element — accent on identity card | Green, similar |
| **Shadow** (ombre) | Property value differs from mystery — dimmed on identity card | Dim, different |
| **Jauge de correspondance** | Percentage gauge of overall property overlap with mystery | Match %, proximity score |

### Code identifiers (identity card)

| Code | Domain term | When |
| ---- | ----------- | ---- |
| `IdentityPropertyState.match` | Highlight | After commit, property in common with mystery |
| `IdentityPropertyState.mismatch` | Shadow (or undifferentiated preview) | After commit, no match; also all rows while hovering |
| `propertiesMatch()` | Comparison engine | Typed per-property check vs mystery |

## Identity-card properties

| Term | Definition | Aliases to avoid |
| ---- | ---------- | ---------------- |
| **Identifiants** | Symbol, atomic number, name | IDs, basics |
| **Période** | Row in periodic table | Period |
| **Groupe** | Column in periodic table | Group (don't confuse with chemical family) |
| **Bloc** | Orbital block (s, p, d, f) | Block, shell |
| **Famille** | Chemical family (IUPAC category) | Category |
| **Catégorie CHNOPS** | Biological macro-element classification | CHNOPS, nutrition class |
| **État** | Matter state at ambient conditions: solide, liquide, gaz | Phase, state |
| **Stabilité** | Nuclear stability / radioactivity danger class | Radioactivity tier |
| **Synthèse** | Nucleosynthesis origin (Big Bang, supernova, artificial, etc.) | Origin, cosmic source |
| **Étymologie** | Name origin category (divinity, geography, discoverer, etc.) | Etymology, name origin |

Normalized synthesis classes (GDD §5): Big Bang, étoiles mourantes, fusion d'étoiles à neutrons, supernova, rayons cosmiques, synthèse humaine.

## Periodic table UI

| Term | Definition | Aliases to avoid |
| ---- | ---------- | ---------------- |
| **Tableau périodique** | 18×7 main grid + lanthanide/actinide rows | Grid, board |
| **Case** | One grid slot (element or placeholder) | Cell, tile |
| **Case élément** | Clickable `ElementCell` | Element tile |
| **Case fantôme** | Range label for lanthanides (57–71) or actinides (89–103) | Placeholder |
| **Case sélectionnée** | Enlarged preview during visualisation (`CaseSelectionnee`) | Selected cell, zoom |
| **Division diagonale** | Split cell colouring when an element has multiple palette values | Split cell, dual colour |
| **Légende** | Property-type or palette legend strip (`Legende`) | Legend |

## Colour palettes (GDD §3)

| Mode | Definition |
| ---- | ---------- |
| **Palette Famille** | ~10 IUPAC family colours (current default) |
| **Palette État** | 3 colours: solide / liquide / gaz |
| **Palette Synthèse** | Cosmogenic origin colours |
| **Palette Origine du nom** | Thematic etymology colours |
| **Palette Aucune** | Monochrome — maximum challenge |

## Difficulty (GDD §4)

| Term | Definition |
| ---- | ---------- |
| **Facile** | Identity card on click; full grid labels; mystery card completes |
| **Moyen** | Identity card after validation; symbol-only grid; partial mystery help |
| **Hardcore** | Hidden identity card; empty grid; no mystery card |

**Toggles:** independent switches for légendes, codes couleurs, étiquettes textuelles in cells.

## App chrome (GDD §3)

| Term | Definition | Aliases to avoid |
| ---- | ---------- | ---------------- |
| **Bouée** | Tutorial / help overlay (rules) | Help, lifebuoy |
| **Roue crantée** | Settings overlay (difficulty, toggles, palette) | Gear, settings |
| **Histogramme** | Stats overlay — score distribution | Stats, chart |
| **Module d'historique** | Chronological essai list; hover replays identity card states | History, log |
| **Compteur de coups** | Prominent move counter | Move counter, score |
| **Overlay** | Modal from header icon | Modal, dialog |

## Technical terms

| Term | Definition | Aliases to avoid |
| ---- | ---------- | ---------------- |
| **Seed** | `YYYY-MM-DD` Paris calendar day for daily mystery; random for training | Random seed (qualify which mode) |
| **hoveredNumber** | Store: element under pointer on grid; `null` off table | hover state |
| **committedNumber** | Store: last clicked element; comparison frozen until next commit | last selection |
| **commitSelection** | Store action: run comparison on click; hook for future `history[]` | validate, encoche |
