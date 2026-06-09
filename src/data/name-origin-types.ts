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
