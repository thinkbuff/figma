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
    thumbAlignment="center"
    className={cn(
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
      'static',
      'h-4',
      'grow',
      'overflow-visible',
      'rounded-full',
      'bg-figma-secondary',
      'outline-solid outline-1 -outline-offset-1 outline-[#0000001a] dark:outline-[#ffffff1a]',
      'data-[orientation=horizontal]:-mx-2',
      'data-[orientation=vertical]:w-4 data-[orientation=vertical]:-my-2',
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
      'block',
      'rounded-full',
      'bg-figma-brand',
      'box-content',
      'data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:px-2 data-[orientation=horizontal]:-ml-2',
      'data-[orientation=vertical]:w-4 data-[orientation=vertical]:py-2 data-[orientation=vertical]:-mt-2',
      'data-disabled:bg-figma-disabled',
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
