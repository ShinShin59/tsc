import discoveryJson from "@/data/enriched/discovery.json";
import nameOriginJson from "@/data/enriched/name-origin.json";
import nutritionJson from "@/data/enriched/nutrition.json";
import stabilityJson from "@/data/enriched/stability.json";
import synthesisJson from "@/data/enriched/synthesis.json";
import {
  DISCOVERY_LABELS,
  type DiscoveryDataset,
  type DiscoveryPeriod,
} from "@/data/discovery-types";
import {
  NAME_ORIGIN_LABELS,
  type NameOriginCategory,
  type NameOriginDataset,
} from "@/data/name-origin-types";
import {
  NUTRITION_LABELS,
  type NutritionCategory,
  type NutritionDataset,
} from "@/data/nutrition-types";
import {
  STABILITY_LABELS,
  type StabilityDataset,
  type StabilityTier,
} from "@/data/stability-types";
import {
  SYNTHESIS_LABELS,
  type SynthesisDataset,
  type SynthesisOrigin,
} from "@/data/synthesis-types";

const synthesisDataset = synthesisJson as SynthesisDataset;
const nutritionDataset = nutritionJson as NutritionDataset;
const discoveryDataset = discoveryJson as DiscoveryDataset;
const stabilityDataset = stabilityJson as StabilityDataset;
const nameOriginDataset = nameOriginJson as NameOriginDataset;

export function getSynthesisOrigins(atomicNumber: number): SynthesisOrigin[] {
  return synthesisDataset.byNumber[String(atomicNumber)] ?? ["artificial"];
}

export function formatSynthesis(atomicNumber: number): string {
  const origins = getSynthesisOrigins(atomicNumber);
  if (origins.length >= 2) {
    return "Multiple";
  }
  return SYNTHESIS_LABELS[origins[0] ?? "artificial"];
}

export function getNutritionCategory(atomicNumber: number): NutritionCategory {
  return nutritionDataset.byNumber[String(atomicNumber)] ?? "non-essential";
}

export function formatNutrition(atomicNumber: number): string {
  return NUTRITION_LABELS[getNutritionCategory(atomicNumber)];
}

export function getDiscoveryPeriod(atomicNumber: number): DiscoveryPeriod {
  return discoveryDataset.byNumber[String(atomicNumber)]?.period ?? "pre-18";
}

export function formatDiscovery(atomicNumber: number): string {
  return DISCOVERY_LABELS[getDiscoveryPeriod(atomicNumber)];
}

export function getStabilityTier(atomicNumber: number): StabilityTier {
  return stabilityDataset.byNumber[String(atomicNumber)] ?? "extreme";
}

export function formatStability(atomicNumber: number): string {
  return STABILITY_LABELS[getStabilityTier(atomicNumber)];
}

export function getNameOriginCategories(atomicNumber: number): NameOriginCategory[] {
  return nameOriginDataset.byNumber[String(atomicNumber)] ?? ["other"];
}

export function formatNameOrigin(atomicNumber: number): string {
  return getNameOriginCategories(atomicNumber)
    .map((category) => NAME_ORIGIN_LABELS[category])
    .join(" · ");
}

export type {
  DiscoveryPeriod,
  NameOriginCategory,
  NutritionCategory,
  StabilityTier,
  SynthesisOrigin,
};
