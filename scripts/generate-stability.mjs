/**
 * Fetches Wikimedia Periodic_Table_Radioactivity.svg, maps fill colors to OSC
 * stability tiers, writes src/data/enriched/stability.json.
 *
 * SVG legend (6 colors) → OSC (4 tiers):
 *   #00ffff cyan          → stable
 *   #00ff00 green         → moderate
 *   #ffff00 yellow        → moderate
 *   #ffa500 orange        → major
 *   #ff0000 red           → extreme
 *   #804080 purple        → extreme
 *
 * Usage: node scripts/generate-stability.mjs
 */

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_PATH = join(ROOT, "src/data/enriched/stability.json");
const TABLE_JSON = join(ROOT, "src/data/PeriodicTableJSON.json");

const SVG_PAGE =
  "https://commons.wikimedia.org/wiki/File:Periodic_Table_Radioactivity.svg";
const TEXT_LAYER_OFFSET = { x: 3.791, y: 0.5718 };

/** @type {Record<string, import("../src/data/stability-types.ts").StabilityTier>} */
const COLOR_TO_TIER = {
  "#00ffff": "stable",
  "#00ff00": "moderate",
  "#ffff00": "moderate",
  "#ffa500": "major",
  "#ff0000": "extreme",
  "#804080": "extreme",
};

/** @type {Record<string, import("../src/data/stability-types.ts").StabilityTier>} */
const MANUAL_OVERRIDES = {};

async function fetchSvgUrl() {
  const api =
    "https://commons.wikimedia.org/w/api.php?action=query&titles=File:Periodic_Table_Radioactivity.svg&prop=imageinfo&iiprop=url&format=json";
  const response = await fetch(api);
  if (!response.ok) {
    throw new Error(`Commons API ${response.status}`);
  }
  const json = await response.json();
  const page = Object.values(json.query.pages)[0];
  return page.imageinfo[0].url;
}

/** @param {string} svg */
function parseRects(svg) {
  /** @type {{ x: number; y: number; w: number; h: number; fill: string; cx: number; cy: number }[]} */
  const rects = [];

  for (const block of svg.matchAll(/<rect[\s\S]*?\/>/g)) {
    const fragment = block[0];
    const x = Number(fragment.match(/\bx="([^"]+)"/)?.[1]);
    const y = Number(fragment.match(/\by="([^"]+)"/)?.[1]);
    const w = Number(fragment.match(/width="([^"]+)"/)?.[1]);
    const h = Number(fragment.match(/height="([^"]+)"/)?.[1]);
    const fill = fragment.match(/fill:(#[0-9a-fA-F]{6})/i)?.[1]?.toLowerCase();

    if (!Number.isNaN(x) && fill && fill !== "#000000" && fill !== "#ffffff") {
      rects.push({ x, y, w, h, fill, cx: x + w / 2, cy: y + h / 2 });
    }
  }

  return rects;
}

/** @param {string} svg */
function parseElements(svg) {
  /** @type {{ z: number; symbol: string; x: number; y: number }[]} */
  const elements = [];

  for (const chunk of svg.split(/<text/).slice(1)) {
    const block = `<text${chunk.split("</text>")[0]}</text>`;
    const x = Number(block.match(/\bx="([^"]+)"/)?.[1]);
    const y = Number(block.match(/\by="([^"]+)"/)?.[1]);
    const tspans = [...block.matchAll(/<tspan[^>]*>([^<]+)<\/tspan>/g)].map((match) =>
      match[1].trim(),
    );

    if (
      tspans.length >= 2 &&
      /^\d+$/.test(tspans[0]) &&
      /^[A-Z][a-z]?$/.test(tspans[1])
    ) {
      elements.push({
        z: Number(tspans[0]),
        symbol: tspans[1],
        x: x + TEXT_LAYER_OFFSET.x,
        y: y + TEXT_LAYER_OFFSET.y,
      });
    }
  }

  return elements;
}

/** @param {ReturnType<typeof parseRects>} rects @param {number} px @param {number} py */
function findFill(rects, px, py) {
  const symbolY = py + 15;

  for (const rect of rects) {
    if (px >= rect.x && px <= rect.x + rect.w && symbolY >= rect.y && symbolY <= rect.y + rect.h) {
      return rect.fill;
    }
  }

  const nearest = rects
    .map((rect) => ({ fill: rect.fill, distance: Math.hypot(rect.cx - px, rect.cy - symbolY) }))
    .sort((a, b) => a.distance - b.distance)[0];

  return nearest && nearest.distance < 18 ? nearest.fill : null;
}

async function main() {
  const svgUrl = await fetchSvgUrl();
  const response = await fetch(svgUrl);
  if (!response.ok) {
    throw new Error(`SVG fetch ${response.status}`);
  }

  const svg = await response.text();
  const rects = parseRects(svg);
  const elements = parseElements(svg);

  if (elements.length !== 118) {
    throw new Error(`Expected 118 elements in SVG, got ${elements.length}`);
  }

  const tableJson = JSON.parse(readFileSync(TABLE_JSON, "utf8"));
  const symbolToNumber = new Map(
    tableJson.elements.map((/** @type {{ symbol: string; number: number }} */ el) => [
      el.symbol,
      el.number,
    ]),
  );

  /** @type {Record<string, import("../src/data/stability-types.ts").StabilityTier>} */
  const byNumber = {};

  for (const element of elements) {
    const number = symbolToNumber.get(element.symbol);
    if (number === undefined || number !== element.z) {
      throw new Error(`Symbol/Z mismatch for ${element.symbol} (Z=${element.z})`);
    }

    const fill = findFill(rects, element.x, element.y);
    if (!fill || !COLOR_TO_TIER[fill]) {
      throw new Error(`No tier for ${element.symbol} (fill=${fill})`);
    }

    const override = MANUAL_OVERRIDES[element.symbol];
    byNumber[String(number)] = override ?? COLOR_TO_TIER[fill];
  }

  for (let n = 1; n <= 118; n++) {
    if (!byNumber[String(n)]) {
      throw new Error(`Missing element Z=${n}`);
    }
  }

  const payload = {
    source: SVG_PAGE,
    generatedAt: new Date().toISOString(),
    colorMapping: COLOR_TO_TIER,
    byNumber,
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);

  const counts = { stable: 0, moderate: 0, major: 0, extreme: 0 };
  for (const tier of Object.values(byNumber)) {
    counts[tier]++;
  }

  console.log(`Wrote ${OUT_PATH} (${elements.length} elements)`);
  console.log("Tier counts:", counts);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
