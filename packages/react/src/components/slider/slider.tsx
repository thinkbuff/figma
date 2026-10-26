import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { useState } from 'react';

import { addClassName, cn } from '~/utils';

const SNAP_PERCENTAGE_THRESHOLD = 2;

function getSnappedValue(value: number, hints: number[] | undefined, min: number, max: number) {
  const snappingFactor = ((max - min) / 100) * SNAP_PERCENTAGE_THRESHOLD;
  const closestHint = hints?.find((hint) => Math.abs(hint - value) <= snappingFactor);
  return typeof closestHint === 'number' ? closestHint : value;
}

function snapValue(
  value: number | readonly number[],
  hints: number[] | undefined,
  min: number,
  max: number,
): number | number[] {
  return typeof value === 'number'
    ? getSnappedValue(value, hints, min, max)
    : value.map((v) => getSnappedValue(v, hints, min, max));
}

interface SliderRootProps extends React.ComponentPropsWithRef<typeof SliderPrimitive.Root> {}

function toArray(value: number | readonly number[]) {
  return typeof value === 'number' ? [value] : value;
}

function SliderRoot({ className, children, ref, ...props }: SliderRootProps) {
  return (
    <SliderPrimitive.Root
      thumbAlignment="center"
      className={addClassName(
        className,
        'relative',
        'flex',
        'items-center',
        'grow',
        'w-full',
        'h-6',
        'touch-none',
        'select-none',
        'border-0 border-x-8 border-solid border-transparent',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-6 data-[orientation=vertical]:h-full data-[orientation=vertical]:border-x-0 data-[orientation=vertical]:border-y-8',
      )}
      {...props}
      ref={ref}
    >
      <SliderPrimitive.Control className="group relative flex h-full w-full items-center group-data-[orientation=vertical]:flex-col">
        {children}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

SliderRoot.displayName = 'SliderRoot';

function SliderTrack({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SliderPrimitive.Track>) {
  return (
    <SliderPrimitive.Track
      className={addClassName(
        className,
        'static',
        'h-4',
        'grow',
        'overflow-visible',
        'rounded-full',
        'bg-figma-secondary',
        'outline-solid outline-1 -outline-offset-1 outline-[#0000001a] dark:outline-[#ffffff1a]',
        'data-[orientation=horizontal]:-mx-2',
        'data-[orientation=vertical]:w-4 data-[orientation=vertical]:-my-2',
      )}
      {...props}
      ref={ref}
    />
  );
}

SliderTrack.displayName = 'SliderTrack';

function SliderRange({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SliderPrimitive.Indicator>) {
  return (
    <SliderPrimitive.Indicator
      className={addClassName(
        className,
        'absolute',
        'block',
        'rounded-full',
        'bg-figma-brand',
        'box-content',
        'data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:px-2 data-[orientation=horizontal]:-ml-2',
        'data-[orientation=vertical]:w-4 data-[orientation=vertical]:py-2 data-[orientation=vertical]:-mt-2',
        'data-disabled:bg-figma-disabled',
      )}
      {...props}
      ref={ref}
    />
  );
}

SliderRange.displayName = 'SliderRange';

function SliderThumb({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SliderPrimitive.Thumb>) {
  return (
    <SliderPrimitive.Thumb
      className={addClassName(
        className,
        'block',
        'z-10',
        'size-4',
        'border-4',
        'border-solid',
        'border-figma-icon-onbrand',
        'rounded-full',
        'bg-transparent',
        'shadow-figma-elevation-200',
        'outline-0',
        'focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-figma-border-selected',
        'data-disabled:border-0 data-disabled:bg-figma-disabled-secondary data-disabled:shadow-none data-disabled:pointer-events-none',
      )}
      {...props}
      ref={ref}
    />
  );
}

SliderThumb.displayName = 'SliderThumb';

interface SliderHintProps {
  hint: number;
  baseValue?: number;
  min: number;
  max: number;
  orientation?: 'horizontal' | 'vertical';
}

function SliderHint({ hint, baseValue, min, max, orientation = 'horizontal' }: SliderHintProps) {
  const offset = ((hint - min) / (max - min)) * 100;
  const horizontal = orientation !== 'vertical';
  return (
    <span
      data-hint=""
      data-orientation={orientation}
      className={cn(
        'pointer-events-none absolute block size-1 rounded-full bg-figma-icon-tertiary',
        horizontal
          ? 'top-1/2 -translate-y-1/2 -translate-x-1/2'
          : 'left-1/2 -translate-x-1/2 translate-y-1/2',
        hint === baseValue && 'bg-figma-icon',
      )}
      style={horizontal ? { left: `${offset}%` } : { bottom: `${offset}%` }}
    />
  );
}

interface SliderProps extends React.ComponentPropsWithRef<typeof SliderRoot> {
  /**
   * Values shown as tick marks on the track. Pointer values snap to the
   * nearest hint within 2% of the range (UI3 "Stepper" slider).
   */
  hints?: number[];
  /**
   * The value treated as the baseline (UI3 "Delta" slider): its hint is
   * emphasized and the thumb at that value renders filled.
   */
  baseValue?: number;
}

/**
 * An input where the user selects a value from within a given range.
 *
 * - [Docs](https://base-ui.com/react/components/slider)
 * - [API Reference](https://base-ui.com/react/components/slider#api)
 */
function Slider({
  ref,
  hints,
  baseValue,
  value: valueProp,
  defaultValue,
  onValueChange,
  onValueCommitted,
  ...props
}: SliderProps) {
  const min = props.min ?? 0;
  const max = props.max ?? 100;
  // Internally controlled so hint snapping also moves the thumb in
  // uncontrolled usage — wrapping the callback alone can't feed back
  // into Base UI's internal state.
  const isControlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = useState<number | number[]>(() =>
    typeof defaultValue === 'number' || defaultValue === undefined
      ? (defaultValue ?? min)
      : [...defaultValue],
  );
  const value = isControlled ? valueProp : innerValue;
  const values = toArray(value);

  return (
    <SliderRoot
      {...props}
      ref={ref}
      value={value as number | number[]}
      onValueChange={(next, details) => {
        // Snap only on pointer input — snapping keyboard steps would trap
        // the value inside a hint's threshold.
        const snapped: number | number[] = details.event?.type.startsWith('key')
          ? typeof next === 'number'
            ? next
            : [...next]
          : snapValue(next, hints, min, max);
        if (!isControlled) {
          setInnerValue(snapped);
        }
        onValueChange?.(snapped, details);
      }}
      onValueCommitted={
        onValueCommitted
          ? (next, details) => onValueCommitted(snapValue(next, hints, min, max), details)
          : undefined
      }
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      {values.map((v: number, index: number) => (
        <SliderThumb
          key={index}
          index={index}
          className={v === baseValue ? 'bg-figma-icon-onbrand' : undefined}
        />
      ))}
      {hints?.map((hint) => (
        <SliderHint
          key={hint}
          hint={hint}
          baseValue={baseValue}
          min={min}
          max={max}
          orientation={props.orientation}
        />
      ))}
    </SliderRoot>
  );
}

Slider.displayName = 'Slider';

export { Slider, SliderRoot, SliderTrack, SliderRange, SliderThumb };
export type { SliderProps };
