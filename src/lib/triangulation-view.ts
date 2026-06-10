export type DisplayNumberInput = {
  hoveredNumber: number | null;
  committedNumber: number | null;
};

export function resolveDisplayNumber({
  hoveredNumber,
  committedNumber,
}: DisplayNumberInput): number | null {
  return hoveredNumber ?? committedNumber;
}

export type TriangulationVisibilityInput = {
  displayNumber: number | null;
  hoveredNumber: number | null;
  committedNumber: number | null;
  history: readonly number[];
};

export function shouldShowTriangulation({
  displayNumber,
  hoveredNumber,
  committedNumber,
  history,
}: TriangulationVisibilityInput): boolean {
  return (
    displayNumber !== null &&
    (history.includes(displayNumber) ||
      (hoveredNumber === null && displayNumber === committedNumber))
  );
}
