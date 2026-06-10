export const SYNTHESIS_ORIGINS = [
  "big-bang",
  "dying-star",
  "supernova",
  "cosmic-rays",
  "neutron-star-merger",
  "radioactive-decay",
  "artificial",
] as const;

export type SynthesisOrigin = (typeof SYNTHESIS_ORIGINS)[number];

export const SYNTHESIS_LABELS: Record<SynthesisOrigin, string> = {
  "big-bang": "Big Bang",
  "dying-star": "Étoile mourante",
  supernova: "Supernova",
  "cosmic-rays": "Collision de rayons cosmiques",
  "neutron-star-merger": "Fusion d'étoiles à neutrons",
  "radioactive-decay": "Désintégration radioactive",
  artificial: "Artificiel",
};

export type SynthesisDataset = {
  source: string;
  generatedAt: string;
  thresholdPercent: number;
  byNumber: Record<string, SynthesisOrigin[]>;
};

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

export const DISCOVERY_PERIODS = ["pre-18", "18th", "19th", "20th", "21st"] as const;

export type DiscoveryPeriod = (typeof DISCOVERY_PERIODS)[number];

export const DISCOVERY_LABELS: Record<DiscoveryPeriod, string> = {
  "pre-18": "Avant le XVIIIᵉ siècle",
  "18th": "XVIIIᵉ siècle",
  "19th": "XIXᵉ siècle",
  "20th": "XXᵉ siècle",
  "21st": "XXIᵉ siècle",
};

export type DiscoveryDataset = {
  source: string;
  generatedAt: string;
  byNumber: Record<
    string,
    {
      period: DiscoveryPeriod;
      year: number | null;
    }
  >;
};

export const STABILITY_TIERS = ["stable", "moderate", "major", "extreme"] as const;

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

export const NAME_ORIGIN_CATEGORIES = [
  "person",
  "character",
  "organization",
  "locality",
  "other",
] as const;

export type NameOriginCategory = (typeof NAME_ORIGIN_CATEGORIES)[number];

export const NAME_ORIGIN_LABELS: Record<NameOriginCategory, string> = {
  person: "Personne",
  character: "Personnage",
  organization: "Organisation",
  locality: "Localité",
  other: "Autre",
};

export type NameOriginDataset = {
  source: string;
  generatedAt: string;
  byNumber: Record<string, NameOriginCategory[]>;
};
