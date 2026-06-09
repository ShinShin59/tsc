import { MAX_ATOMIC_NUMBER } from "@/data/elements";

/** Midnight rotation uses the Paris calendar day (primary player base). */
const PARIS_TIME_ZONE = "Europe/Paris";

export function getDailySeed(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PARIS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** djb2 — do not change; golden tests lock daily puzzle history. */
export function hashStringDjb2(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function mysteryIndexFromSeed(seed: string): number {
  return (hashStringDjb2(seed) % MAX_ATOMIC_NUMBER) + 1;
}
