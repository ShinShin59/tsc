import type { LegendPropertyId } from "@/data/properties";

export type IdentityRowState = "match" | "mismatch";
export type MysteryRowState = "discovered" | "undiscovered";
export type PropertyRowState = IdentityRowState | MysteryRowState;

export type PropertyCardRow = {
  id: LegendPropertyId;
  icon: string;
  value: string;
  state: PropertyRowState;
};
