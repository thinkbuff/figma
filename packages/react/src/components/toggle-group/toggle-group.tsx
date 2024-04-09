import { forwardRef } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { cn } from '../../utils';

/**
 * A set of two-state buttons that can be toggled on or off.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/toggle-group)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/toggle-group#api-reference)
 */
const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, children, disabled, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn([
      'group',
      'flex',
      'items-center',
      'justify-center',
      'bg-figma',
      'border',
      'border-solid',
      'border-transparent',
      'rounded-0.5',
      disabled ? 'cursor-not-allowed' : 'hover:border-figma',
      className,
    ])}
    {...props}
    disabled={disabled}
  >
    {children}
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn([
        'size-6',
        'font-size-11',
        'flex',
        'justify-center',
        'items-center',
        'cursor-default',
        'appearance-none',
        'text-figma',
        'fill-figma-icon',
        'bg-transparent',
        'transition-colors',
        'data-[state=on]:bg-figma-tertiary',
        'disabled:(pointer-events-none cursor-not-allowed text-figma-disabled fill-figma-icon-disabled)',
        'disabled:data-[state=on]:(bg-figma-disabled text-figma-ondisabled fill-figma-icon-ondisabled)',
        className,
      ])}
      {...props}

    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
