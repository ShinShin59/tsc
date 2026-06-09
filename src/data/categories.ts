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

export function resolveCategory(rawCategory: string, group: number): ElementCategory {
  if (group === 17) {
    return "Halogen";
  }
  return RAW_TO_CATEGORY[rawCategory] ?? "Transition metal";
}
