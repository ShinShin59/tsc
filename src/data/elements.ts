import tableJson from "./PeriodicTableJSON.json";
import { resolveCategory, type ElementCategory } from "./categories";

export const MAX_ATOMIC_NUMBER = 118;

export type Element = {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: ElementCategory;
  period: number;
  group: number;
  phase: string;
  xpos: number;
  ypos: number;
};

export const elements: Element[] = tableJson.elements
  .filter((el) => el.number <= MAX_ATOMIC_NUMBER)
  .map((el) => ({
    number: el.number,
    symbol: el.symbol,
    name: el.name,
    atomic_mass: el.atomic_mass,
    category: resolveCategory(el.category, el.group),
    period: el.period,
    group: el.group,
    phase: el.phase,
    xpos: el.xpos,
    ypos: el.ypos,
  }));

export const elementsByNumber: ReadonlyMap<number, Element> = new Map(
  elements.map((element) => [element.number, element]),
);

export function getElement(number: number): Element | undefined {
  return elementsByNumber.get(number);
}
