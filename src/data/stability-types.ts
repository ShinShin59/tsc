export const STABILITY_TIERS = [
  "stable",
  "moderate",
  "major",
  "extreme",
] as const;

export type StabilityTier = (typeof STABILITY_TIERS)[number];

export const STABILITY_LABELS: Record<StabilityTier, string> = {
  stable: "Stable",
  moderate: "Radioactif modéré",
  major: "Radioactif majeur",
  extreme: "Radioactif extrême",
};

export type StabilityDataset = {
  source: string;
  generatedAt: string;
  colorMapping: Record<string, StabilityTier>;
  byNumber: Record<string, StabilityTier>;
};
