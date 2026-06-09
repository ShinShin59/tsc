import stabilityJson from "@/data/enriched/stability.json";
import {
  STABILITY_LABELS,
  type StabilityDataset,
  type StabilityTier,
} from "@/data/stability-types";

const dataset = stabilityJson as StabilityDataset;

export function getStabilityTier(atomicNumber: number): StabilityTier {
  return dataset.byNumber[String(atomicNumber)] ?? "extreme";
}

export function formatStability(atomicNumber: number): string {
  return STABILITY_LABELS[getStabilityTier(atomicNumber)];
}
