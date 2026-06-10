/**
 * Fetches Wikipedia "Template:Periodic table (for higher organisms)" wikitext,
 * maps cell colors to OSC nutrition categories, writes nutrition.json.
 *
 * Wikipedia legend → OSC:
 *   #006000 basic organic (CHON) + P,S override → chnops
 *   #00b000 quantity elements                  → macro
 *   #7f0 essential trace elements              → micro
 *   #ee0 essentiality debated                  → uncertain
 *   #66c / uncolored                           → non-essential
 *
 * Usage: node scripts/generate-nutrition.mjs
 */

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_PATH = join(ROOT, "src/data/enriched/nutrition.json");
const TABLE_JSON = join(ROOT, "src/data/PeriodicTableJSON.json");

const WIKIPEDIA_TEMPLATE = "Template:Periodic_table_(for_higher_organisms)";
const CHNOPS_SYMBOLS = new Set(["H", "C", "N", "O", "P", "S"]);

/** @type {Record<string, import("../src/data/enriched/types.ts").NutritionCategory>} */
const MANUAL_OVERRIDES = {};

/** @typedef {"wiki-basic" | "macro" | "micro" | "uncertain" | "non-human"} WikiNutritionClass */

/** @param {WikiNutritionClass | undefined} wikiClass @param {string} symbol */
function mapToOscCategory(wikiClass, symbol) {
  if (CHNOPS_SYMBOLS.has(symbol)) {
    return "chnops";
  }

  switch (wikiClass) {
    case "wiki-basic":
      return "chnops";
    case "macro":
      return "macro";
    case "micro":
      return "micro";
    case "uncertain":
      return "uncertain";
    case "non-human":
    default:
      return "non-essential";
  }
}

/** @param {string} style */
function classifyStyle(style) {
  const normalized = style.toLowerCase();
  if (normalized.includes("#006000")) {
    return "wiki-basic";
  }
  if (normalized.includes("#00b000")) {
    return "macro";
  }
  if (normalized.includes("#7f0")) {
    return "micro";
  }
  if (normalized.includes("#ee0")) {
    return "uncertain";
  }
  if (normalized.includes("#66c")) {
    return "non-human";
  }
  return undefined;
}

async function fetchTemplateWikitext() {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(WIKIPEDIA_TEMPLATE)}&prop=wikitext&format=json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Wikipedia API ${response.status}`);
  }
  const json = await response.json();
  return json.parse.wikitext["*"];
}

/** @param {string} wikitext */
function parseColoredElements(wikitext) {
  /** @type {Record<string, WikiNutritionClass>} */
  const bySymbol = {};

  for (const row of wikitext.split("|-")) {
    for (const line of row.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("|") || trimmed.startsWith("|colspan")) {
        continue;
      }

      const cellMatch = trimmed.match(
        /^(\|style="([^"]*)")?\|(?:<span title="[^"]*">([A-Z][a-z]{0,2})<\/span>|([A-Z][a-z]{0,2}))$/,
      );
      if (!cellMatch) {
        continue;
      }

      const style = cellMatch[2] ?? "";
      const symbol = cellMatch[3] ?? cellMatch[4];
      if (!symbol || !/^[A-Z][a-z]?$/.test(symbol)) {
        continue;
      }

      const wikiClass = classifyStyle(style);
      if (wikiClass) {
        bySymbol[symbol] = wikiClass;
      }
    }
  }

  return bySymbol;
}

async function main() {
  const wikitext = await fetchTemplateWikitext();
  const wikiBySymbol = parseColoredElements(wikitext);

  if (Object.keys(wikiBySymbol).length < 30) {
    throw new Error(`Expected ~32 colored elements, got ${Object.keys(wikiBySymbol).length}`);
  }

  const tableJson = JSON.parse(readFileSync(TABLE_JSON, "utf8"));
  /** @type {Record<string, import("../src/data/enriched/types.ts").NutritionCategory>} */
  const byNumber = {};

  for (const element of tableJson.elements) {
    if (element.number > 118) {
      continue;
    }

    const override = MANUAL_OVERRIDES[element.symbol];
    if (override) {
      byNumber[String(element.number)] = override;
      continue;
    }

    byNumber[String(element.number)] = mapToOscCategory(
      wikiBySymbol[element.symbol],
      element.symbol,
    );
  }

  for (let n = 1; n <= 118; n++) {
    if (!byNumber[String(n)]) {
      throw new Error(`Missing element Z=${n}`);
    }
  }

  const chnopsCount = Object.values(byNumber).filter((c) => c === "chnops").length;
  if (chnopsCount !== 6) {
    throw new Error(`Expected 6 CHNOPS elements, got ${chnopsCount}`);
  }

  const payload = {
    source: `https://en.wikipedia.org/wiki/${WIKIPEDIA_TEMPLATE}`,
    generatedAt: new Date().toISOString(),
    byNumber,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);

  const counts = { chnops: 0, macro: 0, micro: 0, uncertain: 0, "non-essential": 0 };
  for (const category of Object.values(byNumber)) {
    counts[category]++;
  }

  console.log(`Wrote ${OUT_PATH} (118 elements, ${Object.keys(wikiBySymbol).length} from Wikipedia template)`);
  console.log("Category counts:", counts);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
