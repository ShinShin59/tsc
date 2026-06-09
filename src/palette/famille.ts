import type { ElementCategory } from "@/data/categories";

export type CellAppearance = {
  backgroundColor: string;
  textClass: string;
  mutedTextClass: string;
};

const CATEGORY_COLORS = {
  "Alkali metal": { backgroundColor: "#e74c3c", text: "light" },
  "Alkaline earth metal": { backgroundColor: "#f39c12", text: "dark" },
  "Transition metal": { backgroundColor: "#f1c40f", text: "dark" },
  "Post-transition metal": { backgroundColor: "#2ecc71", text: "dark" },
  Metalloid: { backgroundColor: "#1abc9c", text: "dark" },
  Nonmetal: { backgroundColor: "#3498db", text: "light" },
  Halogen: { backgroundColor: "#ecf0f1", text: "dark" },
  "Noble gas": { backgroundColor: "#d35400", text: "light" },
  Lanthanide: { backgroundColor: "#e84393", text: "light" },
  Actinide: { backgroundColor: "#9b59b6", text: "light" },
} as const satisfies Record<ElementCategory, { backgroundColor: string; text: "light" | "dark" }>;

export function cellAppearance(category: ElementCategory): CellAppearance {
  const { backgroundColor, text } = CATEGORY_COLORS[category];
  const isLight = text === "light";

  return {
    backgroundColor,
    textClass: isLight ? "text-white" : "text-gray-900",
    mutedTextClass: isLight ? "text-white/85" : "text-gray-900/75",
  };
}
