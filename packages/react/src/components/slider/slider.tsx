import { Slider as SliderPrimitive } from '@base-ui/react/slider';

import { cn } from '~/utils';

interface SliderRootProps extends Omit<
  React.ComponentPropsWithRef<typeof SliderPrimitive.Root>,
  'className'
> {
  className?: string;
}

const toArray = (value: number | readonly number[]): readonly number[] =>
  typeof value === 'number' ? [value] : value;

const SliderRoot: React.FC<SliderRootProps> = ({ className, children, ref, ...props }) => (
  <SliderPrimitive.Root
    className={cn(
      'relative',
      'flex',
      'items-center',
      'w-full',
      'h-3',
      'touch-none',
      'select-none',
      'data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-3 data-[orientation=vertical]:h-full',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SliderPrimitive.Control className="group relative flex h-full w-full items-center group-data-[orientation=vertical]:flex-col">
      {children}
    </SliderPrimitive.Control>
  </SliderPrimitive.Root>
);

SliderRoot.displayName = 'SliderRoot';

const SliderTrack: React.FC<
  Omit<React.ComponentPropsWithRef<typeof SliderPrimitive.Track>, 'className'> & {
    className?: string;
  }
> = ({ className, ref, ...props }) => (
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

SliderTrack.displayName = 'SliderTrack';

const SliderRange: React.FC<
  Omit<React.ComponentPropsWithRef<typeof SliderPrimitive.Indicator>, 'className'> & {
    className?: string;
  }
> = ({ className, ref, ...props }) => (
  <SliderPrimitive.Indicator
    className={cn(
      'absolute',
      'bg-figma-brand',
      'data-[orientation=horizontal]:h-full',
      'data-[orientation=vertical]:w-full',
      'data-disabled:bg-figma-icon-disabled',
      className,
    )}
    {...props}
    ref={ref}
  />
);

SliderRange.displayName = 'SliderRange';

const SliderThumb: React.FC<
  Omit<React.ComponentPropsWithRef<typeof SliderPrimitive.Thumb>, 'className'> & {
    className?: string;
  }
> = ({ className, ref, ...props }) => (
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
      'after:block',
      'after:size-2',
      'after:shrink-0',
      'after:rounded-full',
      'after:content-[""]',
      'after:bg-figma-icon',
      '[&:not(data-disabled)]:focus:outline-figma-border-selected',
      'data-disabled:after:bg-figma-icon-disabled',
      'data-disabled:pointer-events-none',
      className,
    )}
    {...props}
    ref={ref}
  />
);

SliderThumb.displayName = 'SliderThumb';

/**
 * An input where the user selects a value from within a given range.
 *
 * - [Docs](https://base-ui.com/react/components/slider)
 * - [API Reference](https://base-ui.com/react/components/slider#api)
 */
const Slider: React.FC<React.ComponentPropsWithRef<typeof SliderRoot>> = ({ ref, ...props }) => {
  const values = toArray(props.value ?? props.defaultValue ?? 0);
  return (
    <SliderRoot
      {...props}
      ref={ref}
    >
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      {values.map((_: number, index: number) => (
        <SliderThumb
          key={index}
          index={index}
        />
      ))}
    </SliderRoot>
  );
};

Slider.displayName = 'Slider';

export { Slider, SliderRoot, SliderTrack, SliderRange, SliderThumb };
