import { forwardRef } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';

import { cn } from '../../utils';

/**
 * A two-state button that can be either on or off.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/toggle)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/toggle#api-reference)
 */
const Toggle = forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
>(({ className, disabled, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      'size-8',
      'font-size-11',
      'text-figma',
      'inline-flex',
      'items-center',
      'justify-center',
      'shrink-0',
      'rounded-0.5',
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
      'focus:not-focus-visible:(outline-0 outline-transparent)',
      disabled
        ? [
            'cursor-not-allowed',
            'pointer-events-none',
            'text-figma-disabled',
            'fill-figma-icon-disabled',
            'data-[state=on]:bg-figma-disabled',
          ]
        : [
            'hover:(bg-figma-hover text-figma-icon-hover fill-figma-icon-hover)',
            'focus-visible:(outline-2 -outline-offset-2 outline-figma-border-brand-strong)',
            'data-[state=on]:(bg-figma-brand text-figma-icon-onbrand fill-figma-icon-onbrand)',
            'data-[state=on]:hover:(bg-figma-brand text-figma-icon-onbrand fill-figma-icon-onbrand)',
          ],
      className,
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
