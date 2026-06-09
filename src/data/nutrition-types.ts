export const NUTRITION_CATEGORIES = [
  "chnops",
  "macro",
  "micro",
  "uncertain",
  "non-essential",
] as const;

export type NutritionCategory = (typeof NUTRITION_CATEGORIES)[number];

export const NUTRITION_LABELS: Record<NutritionCategory, string> = {
  chnops: "CHNOPS",
  macro: "Macroélément",
  micro: "Microélément",
  uncertain: "Rôle incertain",
  "non-essential": "Non essentiel",
};

export type NutritionDataset = {
  source: string;
  generatedAt: string;
  byNumber: Record<string, NutritionCategory>;
};
