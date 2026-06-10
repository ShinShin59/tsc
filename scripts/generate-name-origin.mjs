/**
 * Fetches Wikipedia "List of chemical element name etymologies" wikitext,
 * maps Nature of origin → game categories, writes src/data/enriched/name-origin.json.
 *
 * Mapping (Wikipedia → OSC):
 *   eponym                          → person
 *   mythological / astrological     → character
 *   toponym                         → locality
 *   descriptive / (none) / other    → other
 *   combined values                 → string[] (e.g. Eu → locality + character)
 *
 * "organization" is not in Wikipedia's taxonomy — add manual overrides if needed.
 *
 * Usage: node scripts/generate-name-origin.mjs
 */

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_PATH = join(ROOT, "src/data/enriched/name-origin.json");
const TABLE_JSON = join(ROOT, "src/data/PeriodicTableJSON.json");

/** @type {Record<string, import("../src/data/enriched/types.ts").NameOriginCategory[]>} */
const MANUAL_OVERRIDES = {
  // Wikipedia has no "organization" bucket; add entries here when needed.
};

/** @param {string | null | undefined} origin */
function classifyWikipediaOrigin(origin) {
  if (!origin) {
    return ["other"];
  }

  const normalized = origin.replace(/<br\s*\/?>/gi, ";").toLowerCase();
  /** @type {Set<string>} */
  const categories = new Set();

  if (normalized.includes("eponym")) {
    categories.add("person");
  }
  if (normalized.includes("mythological") || normalized.includes("astrological")) {
    categories.add("character");
  }
  if (normalized.includes("toponym")) {
    categories.add("locality");
  }

  const hasNamedCategory =
    categories.has("person") || categories.has("character") || categories.has("locality");

  if (!hasNamedCategory || normalized.startsWith("descriptive")) {
    if (!normalized.includes("toponym") && !normalized.includes("eponym")) {
      categories.add("other");
    }
  }

  if (categories.size === 0) {
    categories.add("other");
  }

  return /** @type {import("../src/data/enriched/types.ts").NameOriginCategory[]} */ ([
    ...categories,
  ]);
}

async function fetchWikitext() {
  const url =
    "https://en.wikipedia.org/w/api.php?action=parse&page=List_of_chemical_element_name_etymologies&prop=wikitext&format=json";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Wikipedia API ${response.status}`);
  }
  const json = await response.json();
  return json.parse.wikitext["*"];
}

/** @param {string} wikitext */
function parseEtymologyRows(wikitext) {
  const rowRe = /\{\{List of chemical element name etymologies row\s*\n([\s\S]*?)\n\}\}/g;
  /** @type {{ symbol: string; origin: string | null }[]} */
  const rows = [];

  for (const match of wikitext.matchAll(rowRe)) {
    const block = match[1];
    /** @type {Record<string, string>} */
    const params = {};
    for (const paramMatch of block.matchAll(/\|(\w+)\s*=\s*([\s\S]*?)(?=\n\|)/g)) {
      params[paramMatch[1]] = paramMatch[2].trim();
    }
    if (params.symbol) {
      rows.push({
        symbol: params.symbol.trim(),
        origin: params.origin?.replace(/<br\s*\/?>/gi, ";") ?? null,
      });
    }
  }

  return rows;
}

function main() {
  fetchWikitext()
    .then((wikitext) => {
      const tableJson = JSON.parse(readFileSync(TABLE_JSON, "utf8"));
      const symbolToNumber = new Map(
        tableJson.elements.map((/** @type {{ symbol: string; number: number }} */ el) => [
          el.symbol,
          el.number,
        ]),
      );

      const rows = parseEtymologyRows(wikitext);
      if (rows.length !== 118) {
        throw new Error(`Expected 118 rows, got ${rows.length}`);
      }

      /** @type {Record<string, import("../src/data/enriched/types.ts").NameOriginCategory[]>} */
      const byNumber = {};

      for (const row of rows) {
        const number = symbolToNumber.get(row.symbol);
        if (number === undefined) {
          throw new Error(`Unknown symbol: ${row.symbol}`);
        }

        const override = MANUAL_OVERRIDES[row.symbol];
        byNumber[String(number)] = override ?? classifyWikipediaOrigin(row.origin);
      }

      for (let n = 1; n <= 118; n++) {
        if (!byNumber[String(n)]) {
          throw new Error(`Missing element Z=${n}`);
        }
      }

      const payload = {
        source: "https://en.wikipedia.org/wiki/List_of_chemical_element_name_etymologies",
        generatedAt: new Date().toISOString(),
        byNumber,
      };

      mkdirSync(dirname(OUT_PATH), { recursive: true });
      writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
      console.log(`Wrote ${OUT_PATH} (${rows.length} elements)`);

      const counts = { person: 0, character: 0, organization: 0, locality: 0, other: 0 };
      for (const cats of Object.values(byNumber)) {
        for (const cat of cats) {
          counts[cat]++;
        }
      }
      console.log("Category hits (multi-value elements counted once per category):", counts);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

main();
