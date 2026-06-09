import tableJson from "./PeriodicTableJSON.json";
import { resolveCategory, type ElementCategory } from "./categories";

export const MAX_ATOMIC_NUMBER = 118;

export type Element = {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: ElementCategory;
  xpos: number;
  ypos: number;
};

export type PlaceholderCell = {
  label: string;
  subtitle: string;
  category: ElementCategory;
  xpos: number;
  ypos: number;
};

export const PLACEHOLDER_CELLS: PlaceholderCell[] = [
  { label: "57–71", subtitle: "Lanthanide", category: "Lanthanide", xpos: 3, ypos: 6 },
  { label: "89–103", subtitle: "Actinide", category: "Actinide", xpos: 3, ypos: 7 },
];

export const elements: Element[] = tableJson.elements
  .filter((el) => el.number <= MAX_ATOMIC_NUMBER)
  .map((el) => ({
    number: el.number,
    symbol: el.symbol,
    name: el.name,
    atomic_mass: el.atomic_mass,
    category: resolveCategory(el.category, el.group),
    xpos: el.xpos,
    ypos: el.ypos,
  }));

export const elementsByNumber: ReadonlyMap<number, Element> = new Map(
  elements.map((element) => [element.number, element]),
);

export function getElement(number: number): Element | undefined {
  return elementsByNumber.get(number);
}
