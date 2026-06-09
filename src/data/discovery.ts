import discoveryJson from "@/data/enriched/discovery.json";
import {
  DISCOVERY_LABELS,
  type DiscoveryDataset,
  type DiscoveryPeriod,
} from "@/data/discovery-types";

const dataset = discoveryJson as DiscoveryDataset;

export function getDiscoveryPeriod(atomicNumber: number): DiscoveryPeriod {
  return dataset.byNumber[String(atomicNumber)]?.period ?? "pre-18";
}

export function formatDiscovery(atomicNumber: number): string {
  return DISCOVERY_LABELS[getDiscoveryPeriod(atomicNumber)];
}
