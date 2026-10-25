import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { MdiCheckBold, MdiMinusThick } from '~/icons';
import { cn } from '~/utils';

interface CheckboxProps extends Omit<
  React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>,
  'className'
> {
  className?: string;
}

/**
 * A control that allows the user to toggle between checked and not checked.
 * - [Docs](https://base-ui.com/react/components/checkbox)
 * - [API Reference](https://base-ui.com/react/components/checkbox#api)
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
            'data-[checked]:text-figma-ondisabled data-[checked]:bg-figma-disabled',
          ]
        : [
            'focus:border-figma-selected-strong focus:outline-figma-border-selected-strong',
            'data-[checked]:focus:border-figma-bg',
            'data-[checked]:bg-figma-brand data-[checked]:text-figma-onbrand data-[checked]:border-figma-bg-brand',
          ],
      className,
    )}
    {...props}
    checked={checked}
    indeterminate={indeterminate}
    disabled={disabled}
  >
    <CheckboxPrimitive.Indicator className="absolute inline-block size-2.5">
      {indeterminate ? <MdiMinusThick /> : <MdiCheckBold className="-mt-px" />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };

export type { CheckboxProps };
