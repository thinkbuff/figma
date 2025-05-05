import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '~/utils';

const SliderRoot: React.FC<React.ComponentPropsWithRef<typeof SliderPrimitive.Root>> = ({
  className,
  ref,
  ...props
}) => (
  <SliderPrimitive.Root
    className={cn(
      'relative',
      'flex',
      'items-center',
      'w-full',
      'h-3',
      'touch-none',
      'select-none',
      'data-[orientation=vertical]:(flex-col w-3 h-full)',
      className,
    )}
    {...props}
    ref={ref}
  />
);

SliderRoot.displayName = SliderPrimitive.Root.displayName;

const SliderTrack: React.FC<React.ComponentPropsWithRef<typeof SliderPrimitive.Track>> = ({
  className,
  ref,
  ...props
}) => (
  <SliderPrimitive.Track
    className={cn(
      'relative',
      'h-0.5',
      'grow',
      'overflow-hidden',
      'rounded-full',
      'bg-figma-tertiary',
      'data-[orientation=vertical]:w-0.5',
      className,
    )}
    {...props}
    ref={ref}
  />
);

SliderTrack.displayName = SliderPrimitive.Track.displayName;

const SliderRange: React.FC<React.ComponentPropsWithRef<typeof SliderPrimitive.Range>> = ({
  className,
  ref,
  ...props
}) => (
  <SliderPrimitive.Range
    className={cn(
      'absolute',
      'bg-figma-brand',
      'data-[orientation=horizontal]:h-full',
      'data-[orientation=vertical]:w-full',
      'data-[disabled]:bg-figma-icon-disabled',
      className,
    )}
    {...props}
    ref={ref}
  />
);

SliderRange.displayName = SliderPrimitive.Range.displayName;

const SliderThumb: React.FC<React.ComponentPropsWithRef<typeof SliderPrimitive.Thumb>> = ({
  className,
  ref,
  ...props
}) => (
  <SliderPrimitive.Thumb
    className={cn(
      'flex',
      'items-center',
      'justify-center',
      'border',
      'border-solid',
      'border-transparent',
      'rounded-full',
      'bg-figma',
      'outline-solid',
      'outline-2',
      'outline-transparent',
      'after:(block size-2 shrink-0 rounded-full content-[""] bg-figma-icon)',
      '[&:not(data-disabled)]:focus:outline-figma-border-selected',
      'data-[disabled]:after:bg-figma-icon-disabled',
      'data-[disabled]:pointer-events-none',
      className,
    )}
    {...props}
    ref={ref}
  />
);

SliderThumb.displayName = SliderPrimitive.Thumb.displayName;

/**
 * An input where the user selects a value from within a given range.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/slider)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/slider#api-reference)
 */
const Slider: React.FC<React.ComponentPropsWithRef<typeof SliderRoot>> = ({ ref, ...props }) => {
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
};

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider, SliderRoot, SliderTrack, SliderRange, SliderThumb };
