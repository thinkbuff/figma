import { forwardRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '../../utils';

type CheckboxElement = React.ElementRef<typeof CheckboxPrimitive.Root>;

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  indeterminate?: boolean;
}

/**
 * A control that allows the user to toggle between checked and not checked.
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/checkbox)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/checkbox#api-reference)
 */
const Checkbox = forwardRef<CheckboxElement, CheckboxProps>(
  ({ className, checked, indeterminate = false, disabled, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn([
        'relative',
        'size-3',
        'inline-flex',
        'items-center',
        'justify-center',
        'shrink-0',
        'cursor-default',
        'rounded-0.5',
        'outline',
        'outline-1',
        'outline-transparent',
        'border',
        'border-solid',
        'border-figma-icon',
        'bg-figma',
        disabled
          ? [
              'cursor-not-allowed',
              'text-figma-disabled',
              'border-figma-bg-disabled',
              '[&~label]:text-figma-disabled',
              'data-[state=checked]:(text-figma-ondisabled bg-figma-disabled)',
            ]
          : [
              'focus:(border-figma-selected-strong outline-figma-border-selected-strong)',
              'data-[state=checked]:focus:border-figma-bg',
              'data-[state=checked]:(bg-figma-brand text-figma-onbrand border-figma-bg-brand)',
            ],
        className,
      ])}
      {...props}
      checked={indeterminate ? 'indeterminate' : checked}
      disabled={disabled}
    >
      <CheckboxPrimitive.Indicator
        className="absolute inline-block text-size-10px"
        asChild
      >
        {indeterminate ? <span className="i-mdi-minus-thick"></span> : <span className="i-mdi-check-bold -mt-1px"></span>}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { type CheckboxProps, Checkbox };
