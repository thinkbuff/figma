import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { createContext, useContext, useState } from 'react';

import { addClassName, cn } from '~/utils';

const SNAP_PERCENTAGE_THRESHOLD = 2;

interface SliderValuesContextValue {
  min: number;
  values: readonly number[];
}

/**
 * The resolved slider values, mirrored from `SliderRoot` so `SliderRange`
 * can tell when the range is empty and skip its under-thumb bleed (a
 * zero-width indicator would otherwise still paint its padding, leaving a
 * stray fill stub inside the hollow thumb at the min edge).
 */
const SliderValuesContext = createContext<SliderValuesContextValue>({ min: 0, values: [1] });

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

function SliderRoot({
  className,
  children,
  ref,
  value,
  defaultValue,
  onValueChange,
  min = 0,
  ...props
}: SliderRootProps) {
  // In uncontrolled usage Base UI keeps the value internally — mirror it so
  // the context below always reflects the resolved range.
  const [mirroredValue, setMirroredValue] = useState<number | readonly number[] | undefined>(
    defaultValue,
  );
  const values = toArray(value ?? mirroredValue ?? min);

  return (
    <SliderValuesContext.Provider value={{ min, values }}>
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
        min={min}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next, details) => {
          setMirroredValue(next);
          onValueChange?.(next, details);
        }}
        {...props}
        ref={ref}
      >
        <SliderPrimitive.Control className="group relative flex h-full w-full items-center data-[orientation=vertical]:flex-col">
          {children}
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    </SliderValuesContext.Provider>
  );
}

SliderRoot.displayName = 'SliderRoot';

function SliderTrack({
  className,
  children,
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
        'overflow-hidden',
        'rounded-full',
        'bg-figma-secondary',
        'outline-solid outline-1 -outline-offset-1 outline-figma-bordertranslucent',
        'data-[orientation=horizontal]:-mx-2',
        'data-[orientation=vertical]:w-4 data-[orientation=vertical]:-my-2',
      )}
      {...props}
      ref={ref}
    >
      <div className="absolute group-data-[orientation=horizontal]:inset-x-2 group-data-[orientation=horizontal]:top-0 group-data-[orientation=horizontal]:h-full group-data-[orientation=vertical]:inset-y-2 group-data-[orientation=vertical]:left-0 group-data-[orientation=vertical]:w-full">
        {children}
      </div>
    </SliderPrimitive.Track>
  );
}

SliderTrack.displayName = 'SliderTrack';

function SliderRange({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SliderPrimitive.Indicator>) {
  const { min, values } = useContext(SliderValuesContext);
  // The track bleeds 8px past the value domain so the hollow thumb at the
  // extremes still sits on the rail; the fill must reach -8 on the min side
  // to stay flush with the rounded cap, and +6 on the value side to reach
  // under the thumb's 4px hollow center. On an empty range the indicator is
  // zero-size and the bleed alone would still paint a stub — skip it.
  const empty = values.length === 1 ? values[0] <= min : values[values.length - 1] <= values[0];
  return (
    <SliderPrimitive.Indicator
      className={addClassName(
        className,
        'absolute',
        'block',
        'rounded-full',
        'bg-figma-brand',
        'box-content',
        'data-[orientation=horizontal]:h-4 data-[orientation=vertical]:w-4',
        !empty &&
          'data-[orientation=horizontal]:-ml-2 data-[orientation=horizontal]:pl-2 data-[orientation=horizontal]:pr-1.5 data-[orientation=vertical]:-mb-2 data-[orientation=vertical]:pb-2 data-[orientation=vertical]:pt-1.5',
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
        'relative',
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
        'after:pointer-events-none after:absolute after:inset-1 after:rounded-full after:content-[""] after:shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.1)]',
        'focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-figma-border-selected',
        'data-disabled:border-0 data-disabled:bg-figma-disabled data-disabled:shadow-none data-disabled:pointer-events-none data-disabled:after:hidden',
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

// UI3 paints a white sheen fading down over the hue/opacity/gradient fills.
const TRACK_SHEEN = 'linear-gradient(to bottom, rgb(255 255 255), rgb(255 255 255 / 0))';

const HUE_TRACK =
  'linear-gradient(to right, hsl(0 100% 50%), hsl(60 100% 50%), hsl(120 100% 50%), hsl(180 100% 50%), hsl(240 100% 50%), hsl(300 100% 50%), hsl(360 100% 50%))';

const CHECKERBOARD = 'repeating-conic-gradient(#00000026 0% 25%, transparent 0% 50%) 0 0 / 8px 8px';

// A bare color can't be a non-final `background` layer — wrap it as a
// solid gradient so it can stack above the checkerboard.
function toLayer(fill: string) {
  return /gradient|url\(/.test(fill) ? fill : `linear-gradient(${fill}, ${fill})`;
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
  /**
   * UI3 "Slider Color" / "Slider Gradient" presentation:
   *
   * - `'hue'` paints the spectrum track and derives the thumb's inner color disc from the value.
   * - `'opacity'` paints a checkerboard fading into `fill`; the thumb disc shows `fill` at the
   *   value's alpha.
   * - `'gradient'` renders `fill` on the track and square chit.24-style thumbs (spec's gradient stop
   *   handles).
   */
  variant?: 'hue' | 'opacity' | 'gradient';
  /**
   * The color being edited: the fade-in endpoint for `variant="opacity"`,
   * the track paint for `variant="gradient"`, and the thumb preview fill.
   */
  fill?: string;
  /**
   * Per-thumb preview fills — e.g. each gradient stop's own color.
   * Overrides `fill` inside the thumb at that index.
   */
  thumbFills?: string[];
  /**
   * Renders the spec's `Stroke (Modified)` thumb: a `bg-default` knob with
   * an `icon-onbrand` ring and elevation-300.
   */
  modified?: boolean;
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
  variant,
  fill,
  thumbFills,
  modified,
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
  const trackFill = fill;

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
      <SliderTrack
        className={variant && cn('bg-transparent outline-none', 'overflow-hidden')}
        style={
          variant === 'hue'
            ? { background: `${TRACK_SHEEN}, ${HUE_TRACK}` }
            : variant === 'opacity'
              ? {
                  background: `${TRACK_SHEEN}, ${trackFill ? `linear-gradient(to right, transparent, ${trackFill}), ` : ''}${CHECKERBOARD}`,
                }
              : variant === 'gradient'
                ? {
                    background: `${TRACK_SHEEN}, ${trackFill ? `${toLayer(trackFill)}, ` : ''}${CHECKERBOARD}`,
                  }
                : undefined
        }
      >
        {variant === undefined && <SliderRange />}
      </SliderTrack>
      {values.map((v: number, index: number) => {
        const thumbFill = thumbFills?.[index] ?? trackFill;
        return (
          <SliderThumb
            key={index}
            index={index}
            className={cn(
              v === baseValue && 'bg-figma-icon-onbrand',
              (variant || v === baseValue) &&
                variant !== 'gradient' &&
                'flex items-center justify-center',
              variant === 'gradient' &&
                'group/thumb size-4 border-0 bg-transparent shadow-none focus-visible:outline-0 after:hidden',
              modified &&
                'border bg-figma shadow-figma-elevation-300 flex items-center justify-center',
            )}
          >
            {modified && variant !== 'gradient' && (
              <span className="block size-2 rounded-full outline-1 outline-figma-bordertranslucent" />
            )}
            {variant && variant !== 'gradient' && !modified && (
              <span
                data-thumb-fill=""
                className="block size-2 shrink-0 rounded-full"
                style={{
                  background:
                    variant === 'hue'
                      ? `hsl(${((v - min) / (max - min)) * 360} 100% 50%)`
                      : thumbFill
                        ? `color-mix(in srgb, ${thumbFill} ${(((v - min) / (max - min)) * 100).toFixed(1)}%, transparent)`
                        : undefined,
                }}
              />
            )}
            {variant === undefined && v === baseValue && (
              <span
                data-thumb-fill=""
                className="block size-1.5 rounded-full bg-figma-icon-secondary"
              />
            )}
            {variant === 'gradient' && (
              <span
                data-thumb-fill=""
                className="absolute bottom-[21px] left-1/2 block -translate-x-1/2"
              >
                <span
                  className={cn(
                    'relative block size-6 rounded-figma-md bg-figma p-1.25',
                    'outline-1 -outline-offset-1 outline-solid outline-figma-bordertranslucent',
                    'drop-shadow-[0_0_0.25px_rgba(0,0,0,0.18),0_3px_4px_rgba(0,0,0,0.1),0_1px_1.5px_rgba(0,0,0,0.1)]',
                    'after:absolute after:bottom-[-5px] after:left-1/2 after:block after:h-1.5 after:w-3',
                    'after:-translate-x-1/2 after:bg-inherit after:content-[""]',
                    'after:[clip-path:polygon(0_0,100%_0,58%_100%,42%_100%)]',
                    'group-focus-within/thumb:bg-figma-selected-strong',
                  )}
                >
                  <span
                    className="block size-full rounded-figma-sm outline-1 -outline-offset-1 outline-solid outline-figma-bordertranslucent"
                    style={{
                      background: `${thumbFill ? `${toLayer(thumbFill)}, ` : ''}${CHECKERBOARD}, linear-gradient(#fff, #fff)`,
                    }}
                  />
                </span>
              </span>
            )}
          </SliderThumb>
        );
      })}
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
