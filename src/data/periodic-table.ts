import tableJson from "./PeriodicTableJSON.json";

const MAX_ATOMIC_NUMBER = 118;

const CATEGORY_STYLES = {
  "Alkali metal": {
    backgroundColor: "#e74c3c",
    text: "light",
    raw: ["alkali metal"],
  },
  "Alkaline earth metal": {
    backgroundColor: "#f39c12",
    text: "dark",
    raw: ["alkaline earth metal"],
  },
  "Transition metal": {
    backgroundColor: "#f1c40f",
    text: "dark",
    raw: ["transition metal", "unknown, probably transition metal"],
  },
  "Post-transition metal": {
    backgroundColor: "#2ecc71",
    text: "dark",
    raw: ["post-transition metal", "unknown, probably post-transition metal"],
  },
  Metalloid: {
    backgroundColor: "#1abc9c",
    text: "dark",
    raw: ["metalloid", "unknown, probably metalloid"],
  },
  Nonmetal: {
    backgroundColor: "#3498db",
    text: "light",
    raw: ["diatomic nonmetal", "polyatomic nonmetal"],
  },
  Halogen: {
    backgroundColor: "#ecf0f1",
    text: "dark",
    raw: [],
  },
  "Noble gas": {
    backgroundColor: "#d35400",
    text: "light",
    raw: ["noble gas", "unknown, predicted to be noble gas"],
  },
  Lanthanide: {
    backgroundColor: "#e84393",
    text: "light",
    raw: ["lanthanide"],
  },
  Actinide: {
    backgroundColor: "#9b59b6",
    text: "light",
    raw: ["actinide"],
  },
} as const;

export type ElementCategory = keyof typeof CATEGORY_STYLES;

type CellStyle = {
  backgroundColor: string;
  textClass: string;
  mutedTextClass: string;
};

function cellStyle(category: ElementCategory): CellStyle {
  const { backgroundColor, text } = CATEGORY_STYLES[category];
  const isLight = text === "light";

  return {
    backgroundColor,
    textClass: isLight ? "text-white" : "text-gray-900",
    mutedTextClass: isLight ? "text-white/70" : "text-gray-900/60",
  };
}

export const PLACEHOLDER_CELLS = [
  {
    label: "57–71",
    subtitle: "Lanthanide",
    xpos: 3,
    ypos: 6,
    ...cellStyle("Lanthanide"),
  },
  {
    label: "89–103",
    subtitle: "Actinide",
    xpos: 3,
    ypos: 7,
    ...cellStyle("Actinide"),
  },
] as const;

export type PlaceholderCellData = Omit<(typeof PLACEHOLDER_CELLS)[number], "xpos" | "ypos">;

export interface Element {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: ElementCategory;
  backgroundColor: string;
  textClass: string;
  mutedTextClass: string;
  xpos: number;
  ypos: number;
}

const RAW_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_STYLES).flatMap(([category, { raw }]) =>
    raw.map((value) => [value, category]),
  ),
) as Record<string, ElementCategory>;

export const elements: Element[] = tableJson.elements
  .filter((el) => el.number <= MAX_ATOMIC_NUMBER)
  .map((el) => {
    const category =
      el.group === 17 ? "Halogen" : (RAW_TO_CATEGORY[el.category] ?? "Transition metal");

    return {
      number: el.number,
      symbol: el.symbol,
      name: el.name,
      atomic_mass: el.atomic_mass,
      category,
      ...cellStyle(category),
      xpos: el.xpos,
      ypos: el.ypos,
    };
  });
