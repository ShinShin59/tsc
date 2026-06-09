import nameOriginJson from "@/data/enriched/name-origin.json";
import {
  NAME_ORIGIN_LABELS,
  type NameOriginCategory,
  type NameOriginDataset,
} from "@/data/name-origin-types";

const dataset = nameOriginJson as NameOriginDataset;

export function getNameOriginCategories(atomicNumber: number): NameOriginCategory[] {
  return dataset.byNumber[String(atomicNumber)] ?? ["other"];
}

export function formatNameOrigin(atomicNumber: number): string {
  return getNameOriginCategories(atomicNumber)
    .map((category) => NAME_ORIGIN_LABELS[category])
    .join(" · ");
}
