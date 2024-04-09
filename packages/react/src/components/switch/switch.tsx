import { forwardRef } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '../../utils';

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/switch)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/switch#api-reference)
 */
const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer',
      'inline-flex',
      'shrink-0',
      'items-center',
      'w-6',
      'h-3',
      'rounded-full',
      'cursor-default',
      'border-1',
      'border-solid',
      'border-transparent',
      'transition-colors',
      'disabled:(cursor-not-allowed bg-figma-disabled)',
      'data-[state=checked]:bg-figma-brand',
      'data-[state=unchecked]:bg-figma-icon-tertiary',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className="pointer-events-none block size-2.5 rounded-full transition-transform bg-figma-icon-onbrand data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0"
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
