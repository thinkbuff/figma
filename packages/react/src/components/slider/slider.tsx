import { forwardRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '../../utils';

const SliderRoot = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    className={cn([
      'relative',
      'flex',
      'items-center',
      'w-full',
      'h-3',
      'touch-none',
      'select-none',
      'data-[orientation=vertical]:(flex-col w-3 h-full)',
      className,
    ])}
    {...props}
    ref={ref}
  />
));

SliderRoot.displayName = SliderPrimitive.Root.displayName;

const SliderTrack = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Track
    className={cn([
      'relative',
      'h-0.5',
      'grow',
      'overflow-hidden',
      'rounded-full',
      'bg-figma-tertiary',
      'data-[orientation=vertical]:w-0.5',
      className,
    ])}
    {...props}
    ref={ref}
  />
));

SliderTrack.displayName = SliderPrimitive.Track.displayName;

const SliderRange = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Range
    className={cn([
      'absolute',
      'bg-figma-brand',
      'data-[orientation=horizontal]:h-full',
      'data-[orientation=vertical]:w-full',
      'data-[disabled]:bg-figma-icon-disabled',
      className,
    ])}
    {...props}
    ref={ref}
  />
));

SliderRange.displayName = SliderPrimitive.Range.displayName;

const SliderThumb = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Thumb
    className={cn([
      'flex',
      'items-center',
      'justify-center',
      'border',
      'border-solid',
      'border-transparent',
      'rounded-full',
      'bg-figma',
      'outline',
      'outline-2',
      'outline-transparent',
      'after:(block size-2 shrink-0 rounded-full content-[""] bg-figma-icon)',
      '[&:not(data-disabled)]:focus:outline-figma-border-selected',
      'data-[disabled]:after:bg-figma-icon-disabled',
      'data-[disabled]:pointer-events-none',
      className,
    ])}
    {...props}
    ref={ref}
  />
));

SliderThumb.displayName = SliderPrimitive.Thumb.displayName;

/**
 * An input where the user selects a value from within a given range.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/slider)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/slider#api-reference)
 */
const Slider = forwardRef<
  React.ElementRef<typeof SliderRoot>,
  React.ComponentPropsWithoutRef<typeof SliderRoot>
>((props, ref) => {
  const value = props.value ?? props.defaultValue ?? [0];
  return (
    <SliderRoot {...props} ref={ref}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      {value.map((_, index) => (
        <SliderThumb key={index} />
      ))}
    </SliderRoot>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider, SliderRoot, SliderTrack, SliderRange, SliderThumb };
