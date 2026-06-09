export const DISCOVERY_PERIODS = [
  "pre-18",
  "18th",
  "19th",
  "20th",
  "21st",
] as const;

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
