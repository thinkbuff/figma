import * as TogglePrimitive from '@radix-ui/react-toggle';

import { cn } from '~/utils';

/**
 * A two-state button that can be either on or off.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/toggle)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/toggle#api-reference)
 */
const Toggle: React.FC<React.ComponentPropsWithRef<typeof TogglePrimitive.Root>> = ({
  className,
  disabled,
  ref,
  ...props
}) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      'size-8',
      'text-figma-sm leading-figma-sm',
      'text-figma',
      'inline-flex',
      'items-center',
      'justify-center',
      'shrink-0',
      'rounded-figma-sm',
      'font-medium',
      'cursor-default',
      'appearance-none',
      'text-figma-icon',
      'fill-figma-icon',
      'bg-transparent',
      'bg-clip-border',
      'outline-solid',
      'outline-1',
      '-outline-offset-1',
      'outline-transparent',
      'transition-colors',
      'focus:not-focus-visible:outline-0 focus:not-focus-visible:outline-transparent',
      disabled
        ? [
            'cursor-not-allowed',
            'pointer-events-none',
            'text-figma-disabled',
            'fill-figma-icon-disabled',
            'data-[state=on]:bg-figma-disabled',
          ]
        : [
            'hover:bg-figma-hover hover:text-figma-icon-hover hover:fill-figma-icon-hover',
            'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-figma-border-brand-strong',
            'data-[state=on]:bg-figma-brand data-[state=on]:text-figma-icon-onbrand data-[state=on]:fill-figma-icon-onbrand',
            'data-[state=on]:hover:bg-figma-brand data-[state=on]:hover:text-figma-icon-onbrand data-[state=on]:hover:fill-figma-icon-onbrand',
          ],
      className,
    )}
    {...props}
    disabled={disabled}
  />
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
