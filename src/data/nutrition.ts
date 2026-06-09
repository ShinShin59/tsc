import nutritionJson from "@/data/enriched/nutrition.json";
import {
  NUTRITION_LABELS,
  type NutritionCategory,
  type NutritionDataset,
} from "@/data/nutrition-types";

const dataset = nutritionJson as NutritionDataset;

export function getNutritionCategory(atomicNumber: number): NutritionCategory {
  return dataset.byNumber[String(atomicNumber)] ?? "non-essential";
}

export function formatNutrition(atomicNumber: number): string {
  return NUTRITION_LABELS[getNutritionCategory(atomicNumber)];
}
