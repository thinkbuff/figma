import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { MdiCheckBold, MdiMinusThick } from '~/icons';
import { cn } from '~/utils';

interface CheckboxProps extends React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root> {
  indeterminate?: boolean;
}

/**
 * A control that allows the user to toggle between checked and not checked.
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/checkbox)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/checkbox#api-reference)
 */
const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked,
  indeterminate = false,
  disabled,
  ref,
  ...props
}) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer',
      'relative',
      'size-3',
      'inline-flex',
      'items-center',
      'justify-center',
      'shrink-0',
      'cursor-default',
      'rounded-figma-sm',
      'outline-solid',
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
            'data-[state=checked]:text-figma-ondisabled data-[state=checked]:bg-figma-disabled',
          ]
        : [
            'focus:border-figma-selected-strong focus:outline-figma-border-selected-strong',
            'data-[state=checked]:focus:border-figma-bg',
            'data-[state=checked]:bg-figma-brand data-[state=checked]:text-figma-onbrand data-[state=checked]:border-figma-bg-brand',
          ],
      className,
    )}
    {...props}
    checked={indeterminate ? 'indeterminate' : checked}
    disabled={disabled}
  >
    <CheckboxPrimitive.Indicator
      className="absolute inline-block size-2.5"
      asChild
    >
      {indeterminate ? <MdiMinusThick /> : <MdiCheckBold className="-mt-px" />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

export type { CheckboxProps };
