import tableJson from "./PeriodicTableJSON.json";

export const MAX_ATOMIC_NUMBER = 118;

const RAW_CATEGORY_ENTRIES = {
  "Alkali metal": ["alkali metal"],
  "Alkaline earth metal": ["alkaline earth metal"],
  "Transition metal": ["transition metal", "unknown, probably transition metal"],
  "Post-transition metal": ["post-transition metal", "unknown, probably post-transition metal"],
  Metalloid: ["metalloid", "unknown, probably metalloid"],
  Nonmetal: ["diatomic nonmetal", "polyatomic nonmetal"],
  Halogen: [] as string[],
  "Noble gas": ["noble gas", "unknown, predicted to be noble gas"],
  Lanthanide: ["lanthanide"],
  Actinide: ["actinide"],
} as const;

export type ElementCategory = keyof typeof RAW_CATEGORY_ENTRIES;

const RAW_TO_CATEGORY = Object.fromEntries(
  Object.entries(RAW_CATEGORY_ENTRIES).flatMap(([category, rawValues]) =>
    rawValues.map((value) => [value, category]),
  ),
) as Record<string, ElementCategory>;

function resolveCategory(rawCategory: string, group: number): ElementCategory {
  if (group === 17) {
    return "Halogen";
  }
  return RAW_TO_CATEGORY[rawCategory] ?? "Transition metal";
}

export type Element = {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: ElementCategory;
  period: number;
  group: number;
  phase: string;
  xpos: number;
  ypos: number;
};

export const elements: Element[] = tableJson.elements
  .filter((el) => el.number <= MAX_ATOMIC_NUMBER)
  .map((el) => ({
    number: el.number,
    symbol: el.symbol,
    name: el.name,
    atomic_mass: el.atomic_mass,
    category: resolveCategory(el.category, el.group),
    period: el.period,
    group: el.group,
    phase: el.phase,
    xpos: el.xpos,
    ypos: el.ypos,
  }));

export const elementsByNumber: ReadonlyMap<number, Element> = new Map(
  elements.map((element) => [element.number, element]),
);

export function getElement(number: number): Element | undefined {
  return elementsByNumber.get(number);
}
