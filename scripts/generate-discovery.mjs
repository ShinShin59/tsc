/**
 * Fetches Wikipedia "Timeline of chemical element discoveries" wikitext and
 * writes src/data/enriched/discovery.json.
 *
 * Prefer Wikipedia over PubChem: PubChem only exposes discovery years inside
 * unstructured History prose, while Wikipedia lists observed/isolated years per
 * element in sortable tables.
 *
 * Year policy: observed (first report) when present, else isolated year.
 * Pre-modern rows (BC earliest use) map to pre-18.
 *
 * Usage: node scripts/generate-discovery.mjs
 */

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_PATH = join(ROOT, "src/data/enriched/discovery.json");
const TABLE_JSON = join(ROOT, "src/data/PeriodicTableJSON.json");

const WIKIPEDIA_PAGE = "Timeline_of_chemical_element_discoveries";

/** @type {Record<string, { period: import("../src/data/discovery-types.ts").DiscoveryPeriod; year: number | null }>} */
const MANUAL_OVERRIDES = {};

/** @param {number} year */
function yearToPeriod(year) {
  if (year <= 1699) {
    return "pre-18";
  }
  if (year <= 1799) {
    return "18th";
  }
  if (year <= 1899) {
    return "19th";
  }
  if (year <= 1999) {
    return "20th";
  }
  return "21st";
}

/** @param {string | null | undefined} cell */
function parseYearCell(cell) {
  if (!cell) {
    return null;
  }

  const rangeMatch = cell.match(/(\d{4})\s*[–-]\s*(\d{4})/);
  if (rangeMatch) {
    return Number(rangeMatch[1]);
  }

  const yearMatch = cell.match(/(\d{4})/);
  return yearMatch ? Number(yearMatch[1]) : null;
}

async function fetchWikitext() {
  const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${WIKIPEDIA_PAGE}&prop=wikitext&format=json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Wikipedia API ${response.status}`);
  }
  const json = await response.json();
  return json.parse.wikitext["*"];
}

/** @param {string} wikitext */
function parsePreModernRows(wikitext) {
  const start = wikitext.indexOf("== Pre-modern");
  const end = wikitext.indexOf("==Modern discoveries==");
  if (start < 0 || end < 0) {
    throw new Error("Pre-modern section not found");
  }

  /** @type {Record<number, number | null>} */
  const byNumber = {};

  for (const row of wikitext.slice(start, end).split("|-").slice(1)) {
    const zMatch = row.match(/^\s*\|\s*(\d{1,3})(?:<!--[\s\S]*?-->)?\s*\n/);
    if (!zMatch) {
      continue;
    }

    const sortMatch = row.match(/data-sort-value=(-?\d+)\|/);
    byNumber[Number(zMatch[1])] = sortMatch ? Number(sortMatch[1]) : null;
  }

  return byNumber;
}

/** @param {string} wikitext */
function parseModernRows(wikitext) {
  const section = wikitext.slice(wikitext.indexOf("==Modern discoveries=="));
  /** @type {Record<number, { observed: number | null; isolated: number | null }>} */
  const byNumber = {};

  for (const row of section.split("|-").slice(2)) {
    if (!row.trim() || row.includes("! Year")) {
      continue;
    }

    const zMatch = row.match(/^\s*\|\s*(\d{1,3})(?:<!--[\s\S]*?-->)?\s*\n/);
    if (!zMatch) {
      continue;
    }

    const z = Number(zMatch[1]);
    const lines = row
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("|"));

    const yearCells = lines
      .slice(2)
      .filter((line) => /^\|\s*(\d{4}|$|\d{4}\s*[–-])/.test(line) || /^\|\s*$/.test(line))
      .map((line) => line.replace(/^\|\s*/, "").replace(/<!--[\s\S]*?-->/g, "").trim());

    const observed = parseYearCell(yearCells[0]);
    const isolated = parseYearCell(yearCells[2] ?? yearCells[1]);

    byNumber[z] = { observed, isolated };
  }

  return byNumber;
}

/** @param {Record<number, number | null>} preModern @param {Record<number, { observed: number | null; isolated: number | null }>} modern */
function mergeDiscoveryYears(preModern, modern) {
  /** @type {Record<number, number | null>} */
  const byNumber = {};

  for (const [z, sortValue] of Object.entries(preModern)) {
    const number = Number(z);
    if (sortValue !== null && sortValue < 0) {
      byNumber[number] = null;
      continue;
    }
    byNumber[number] = sortValue;
  }

  for (const [z, years] of Object.entries(modern)) {
    const number = Number(z);
    byNumber[number] = years.observed ?? years.isolated ?? byNumber[number] ?? null;
  }

  return byNumber;
}

async function main() {
  const wikitext = await fetchWikitext();
  const preModern = parsePreModernRows(wikitext);
  const modern = parseModernRows(wikitext);
  const yearsByNumber = mergeDiscoveryYears(preModern, modern);

  const tableJson = JSON.parse(readFileSync(TABLE_JSON, "utf8"));
  /** @type {Record<string, { period: import("../src/data/discovery-types.ts").DiscoveryPeriod; year: number | null }>} */
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

    const year = yearsByNumber[element.number] ?? null;
    const period = year === null ? "pre-18" : yearToPeriod(year);
    byNumber[String(element.number)] = { period, year };
  }

  for (let n = 1; n <= 118; n++) {
    if (!byNumber[String(n)]) {
      throw new Error(`Missing element Z=${n}`);
    }
  }

  const payload = {
    source: `https://en.wikipedia.org/wiki/${WIKIPEDIA_PAGE}`,
    generatedAt: new Date().toISOString(),
    byNumber,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);

  const counts = { "pre-18": 0, "18th": 0, "19th": 0, "20th": 0, "21st": 0 };
  for (const entry of Object.values(byNumber)) {
    counts[entry.period]++;
  }

  console.log(`Wrote ${OUT_PATH} (118 elements)`);
  console.log("Period counts:", counts);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
