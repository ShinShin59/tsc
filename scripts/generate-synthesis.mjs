/**
 * Fetches Wikimedia "Nucleosynthesis periodic table.svg" (Jennifer Johnson /
 * NASA SVS data) and writes src/data/enriched/synthesis.json.
 *
 * Johnson source labels → OSC:
 *   Big Bang fusion              → big-bang
 *   Dying low-mass stars         → dying-star
 *   Exploding massive stars      → supernova
 *   Exploding white dwarfs       → supernova
 *   Cosmic ray fission           → cosmic-rays
 *   Merging neutron stars        → neutron-star-merger
 *   Human synthesis (Tc, Pm)     → radioactive-decay
 *   Human synthesis (transuranic)→ artificial
 *   Z ≥ 104 (absent from SVG)    → artificial
 *
 * Origins with ≥ thresholdPercent contribution are kept; 2+ → Multiple display.
 *
 * Usage: node scripts/generate-synthesis.mjs
 */

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_PATH = join(ROOT, "src/data/enriched/synthesis.json");
const TABLE_JSON = join(ROOT, "src/data/PeriodicTableJSON.json");

const SVG_URL =
  "https://upload.wikimedia.org/wikipedia/commons/3/31/Nucleosynthesis_periodic_table.svg";
const NASA_SVS_URL = "https://svs.gsfc.nasa.gov/13873/";
const THRESHOLD_PERCENT = 5;

/** @type {Record<string, import("../src/data/enriched/types.ts").SynthesisOrigin[]>} */
const MANUAL_OVERRIDES = {};

/** @type {Set<number>} */
const RADIOACTIVE_DECAY_NUMBERS = new Set([43, 61]);

/** @param {string} source */
function mapJohnsonSource(source) {
  const normalized = source.toLowerCase();
  if (normalized.includes("big bang")) {
    return "big-bang";
  }
  if (normalized.includes("dying low-mass")) {
    return "dying-star";
  }
  if (normalized.includes("exploding massive") || normalized.includes("exploding white dwarf")) {
    return "supernova";
  }
  if (normalized.includes("cosmic ray")) {
    return "cosmic-rays";
  }
  if (normalized.includes("merging neutron")) {
    return "neutron-star-merger";
  }
  if (normalized.includes("human synthesis")) {
    return "human-synthesis";
  }
  return null;
}

/** @param {string} title @param {number} atomicNumber */
function parseTitleOrigins(title, atomicNumber) {
  /** @type {{ origin: import("../src/data/enriched/types.ts").SynthesisOrigin; percent: number }[]} */
  const weighted = [];

  for (const segment of title.split(",")) {
    const match = segment.trim().match(/(\d+(?:\.\d+)?)%\s*(.+)/);
    if (!match) {
      continue;
    }

    const percent = Number(match[1]);
    const mapped = mapJohnsonSource(match[2].trim());
    if (!mapped) {
      continue;
    }

    if (mapped === "human-synthesis") {
      weighted.push({
        origin: RADIOACTIVE_DECAY_NUMBERS.has(atomicNumber) ? "radioactive-decay" : "artificial",
        percent,
      });
      continue;
    }

    weighted.push({ origin: mapped, percent });
  }

  const selected = weighted
    .filter((entry) => entry.percent >= THRESHOLD_PERCENT)
    .sort((a, b) => b.percent - a.percent);

  /** @type {import("../src/data/enriched/types.ts").SynthesisOrigin[]} */
  const origins = [];
  for (const entry of selected) {
    if (!origins.includes(entry.origin)) {
      origins.push(entry.origin);
    }
  }

  return origins.length > 0 ? origins : ["artificial"];
}

/** @param {string} svg */
function parseSvgElements(svg) {
  /** @type {Map<number, { symbol: string; title: string }>} */
  const byNumber = new Map();
  const re = /cursor="help">([\s\S]*?)<title>([\s\S]*?)<\/title>/g;

  for (const match of svg.matchAll(re)) {
    const block = match[1];
    const title = match[2].replace(/\s+/g, " ").trim();
    const symbol = block.match(/<tspan>([A-Z][a-z]{0,2})<\/tspan>/)?.[1];
    const atomicNumber = Number(block.match(/font-size="30">(\d+)<\/tspan>/)?.[1]);

    if (!symbol || !atomicNumber) {
      continue;
    }

    byNumber.set(atomicNumber, { symbol, title });
  }

  return byNumber;
}

async function main() {
  const response = await fetch(SVG_URL);
  if (!response.ok) {
    throw new Error(`SVG fetch ${response.status}`);
  }

  const svg = await response.text();
  const svgByNumber = parseSvgElements(svg);

  if (svgByNumber.size < 90) {
    throw new Error(`Expected ~103 SVG elements, got ${svgByNumber.size}`);
  }

  const tableJson = JSON.parse(readFileSync(TABLE_JSON, "utf8"));
  /** @type {Record<string, import("../src/data/enriched/types.ts").SynthesisOrigin[]>} */
  const byNumber = {};

  for (const element of tableJson.elements) {
    if (element.number > 118) {
      continue;
    }

    const override = MANUAL_OVERRIDES[String(element.number)];
    if (override) {
      byNumber[String(element.number)] = override;
      continue;
    }

    const svgEntry = svgByNumber.get(element.number);
    if (!svgEntry) {
      byNumber[String(element.number)] = ["artificial"];
      continue;
    }

    byNumber[String(element.number)] = parseTitleOrigins(svgEntry.title, element.number);
  }

  for (let n = 1; n <= 118; n++) {
    if (!byNumber[String(n)]) {
      throw new Error(`Missing element Z=${n}`);
    }
  }

  const payload = {
    source: NASA_SVS_URL,
    dataAsset: SVG_URL,
    generatedAt: new Date().toISOString(),
    thresholdPercent: THRESHOLD_PERCENT,
    byNumber,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);

  const counts = {};
  let multi = 0;
  for (const origins of Object.values(byNumber)) {
    if (origins.length >= 2) {
      multi++;
    }
    for (const origin of origins) {
      counts[origin] = (counts[origin] ?? 0) + 1;
    }
  }

  console.log(`Wrote ${OUT_PATH} (${Object.keys(byNumber).length} elements)`);
  console.log("Origin hits (multi-origin elements counted per category):", counts);
  console.log("Multi-origin elements:", multi);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
