/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import evaluate from '@emmetio/math-expression';
import { useMemo } from 'react';

import type { Formatter } from './types';
import { Base, type BaseProps } from './value-field-base';

const MAX_SUPPORTED_PRECISION = 15;

type NumericProps = Omit<
  BaseProps<number>,
  'value' | 'onChange' | 'formatter' | 'min' | 'max' | 'type'
> & {
  /**
   * The numeric value of the input.
   */
  value: number;

  /**
   * Callback to call upon submission.
   */
  onChange: (value: number) => void;

  /**
   * The minimum allowed value.
   */
  min?: number;

  /**
   * The maximum allowed value.
   */
  max?: number;

  /**
   * The numeric range that the `value` prop will be normalized to when displayed in the input.
   * Requires non-equal 'max' and 'min' values.
   *
   * @example
   *   <Numeric value={0.5} min={0} max={1} targetRange={[0, 100]} /> // Displays value of 50
   */
  targetRange?: [number, number];

  /**
   * The decimal precision that user input will be rounded to.
   */
  precision?: number;

  /**
   * Units that will be accepted as valid input (e.g., "px", "%").
   */
  allowedUnits?: string[];

  /**
   * Suffix to be appended to the value (e.g., "px", "%"). Suffix is treated as an allowed unit.
   */
  suffix?: string;

  /**
   * The small nudge increment for the value.
   */
  smallNudge?: number;

  /**
   * The big nudge increment for the value.
   */
  bigNudge?: number;
};

function Numeric({
  ref,
  value,
  onChange,
  min,
  max,
  targetRange,
  precision,
  suffix,
  allowedUnits,
  ...inputProps
}: NumericProps) {
  const formatter = useMemo(
    () => createFormatter({ min, max, precision, targetRange, suffix, allowedUnits }),
    [min, max, precision, targetRange, suffix, allowedUnits],
  );

  return (
    <Base
      ref={ref}
      value={value}
      onChange={onChange}
      formatter={formatter}
      {...inputProps}
    />
  );
}

type FormatterOptions = Pick<
  NumericProps,
  'min' | 'max' | 'targetRange' | 'precision' | 'suffix' | 'allowedUnits'
>;

function createFormatter(options: FormatterOptions = {}): Formatter<number> {
  const {
    min,
    max,
    targetRange,
    precision = MAX_SUPPORTED_PRECISION,
    suffix,
    allowedUnits = [],
  } = options;
  const { toDisplayValue, fromDisplayValue } = getValueTransformers({ min, max, targetRange });

  return {
    parse: (input: string, currentValue: number) => {
      try {
        const evaluated = evaluateExpression({
          expression: input,
          displayValue: toDisplayValue(currentValue),
          suffix,
          allowedUnits,
        });
        const rounded = roundTo(precision, evaluated);
        return {
          valid: true,
          value: clampRange(fromDisplayValue(rounded), { min, max }),
        };
      } catch {
        return { valid: false };
      }
    },
    format: (value: number) => {
      const clamped = clampRange(value, { min, max });
      return toValueString(roundTo(precision, toDisplayValue(clamped)), suffix);
    },
    incrementBy(value: number, amount: number) {
      return value + fromDisplayValue(amount);
    },
  };
}

function getValueTransformers(props: Pick<NumericProps, 'min' | 'max' | 'targetRange'>) {
  const { min, max, targetRange } = props;

  if (!targetRange) {
    return {
      toDisplayValue: (value: number) => value,
      fromDisplayValue: (value: number) => value,
    };
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw Error("'targetRange' requires specifying 'min' and 'max'.");
  }

  if (min === max) {
    throw Error("'min' and 'max' cannot be equal.");
  }

  return {
    toDisplayValue: normalize([min, max], targetRange),
    fromDisplayValue: normalize(targetRange, [min, max]),
  };
}

/**
 * Map a value to a specified range.
 * https://stats.stackexchange.com/a/281164
 *
 * @example
 *   normalize([0, 1], [0, 100])(0.5) -> 50
 */
function normalize(sourceRange: [number, number], targetRange: [number, number]) {
  const [sourceMin, sourceMax] = sourceRange;
  const [targetMin, targetMax] = targetRange;

  return function (value: number): number {
    if (sourceMin === sourceMax || targetMin === targetMax) {
      return targetMin;
    }

    return ((value - sourceMin) / (sourceMax - sourceMin)) * (targetMax - targetMin) + targetMin;
  };
}

function roundTo(precision: number, value: number) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

function clampRange(value: number, range: { min?: number; max?: number }) {
  const { min, max } = range;

  if (min !== undefined && value < min) {
    return min;
  }

  if (max !== undefined && value > max) {
    return max;
  }

  return value;
}

function toValueString(value: number, suffix: string | undefined) {
  if (Number.isNaN(value)) {
    return '';
  }

  return suffix ? `${value}${suffix}` : `${value}`;
}

function evaluateExpression(params: {
  expression: string;
  displayValue: number;
  suffix?: string;
  allowedUnits?: string[];
}) {
  const { displayValue, expression, suffix = '', allowedUnits = [] } = params;
  const numberPattern = '(\\d*\\.?\\d+)';
  const unitsPattern = `(?:${[...allowedUnits, suffix].join('|')})*`;

  const modifiedExpression = expression
    .replace(new RegExp(`${numberPattern}${unitsPattern}`, 'gi'), (_, p1) => p1)
    .replace(new RegExp(`${unitsPattern}${numberPattern}`, 'gi'), (_, p1) => p1)
    .replace(new RegExp(`${numberPattern}%`, 'gi'), (_, p1) => `(${displayValue}*${p1}/100)`)
    .replace(new RegExp(`%${numberPattern}`, 'gi'), (_, p1) => `(${displayValue}*${p1}/100)`)
    .replace(new RegExp(`${numberPattern}x`, 'gi'), (_, p1) => `(${displayValue}*${p1})`)
    .replace(new RegExp(`x${numberPattern}`, 'gi'), (_, p1) => `(${displayValue}*${p1})`)
    .replace(/(?<!\d)x(?!\d)/gi, `${displayValue}`)
    .trim();

  let result: number | null;
  try {
    result = evaluate(modifiedExpression);
  } catch {
    result = null;
  }
  if (result === null) {
    throw new Error('Invalid expression.');
  }
  return result;
}

export { evaluateExpression, Numeric };
export type { NumericProps };
