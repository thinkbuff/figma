type RGB = { r: number; g: number; b: number };
type RGBA = RGB & { a: number };

type ParserResult<V> =
  | {
      valid: true;
      value: V;
    }
  | {
      valid: false;
    };

type IncrementTargets = Record<string, boolean> | null;

type Formatter<V> = {
  parse: (input: string, value: V) => ParserResult<V>;
  format: (value: V) => string;
  incrementBy?: (value: V, amount: number, incrementTargets: IncrementTargets) => V;
  getIncrementTargets?: (element: HTMLInputElement) => IncrementTargets;
  getIncrementSelection?: (incrementTargets: IncrementTargets) => [start: number, end: number];
};

export type { Formatter, IncrementTargets, ParserResult, RGB, RGBA };
