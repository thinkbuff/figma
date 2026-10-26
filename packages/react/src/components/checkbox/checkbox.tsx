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
 *
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
      'size-4',
      'my-1',
      'inline-flex',
      'items-center',
      'justify-center',
      'shrink-0',
      'cursor-default',
      'rounded-figma-md',
      'outline-solid',
      'outline-1',
      '-outline-offset-1',
      'outline-transparent',
      'border',
      'border-solid',
      'border-figma-border-strong',
      'bg-transparent',
      'data-checked:border-transparent data-checked:bg-figma-brand data-checked:text-figma-icon-onbrand',
      'data-indeterminate:text-figma-icon',
      disabled
        ? [
            'border-figma-border-disabled-strong',
            'data-checked:border-transparent data-checked:bg-figma-border-disabled-strong',
            'data-indeterminate:text-figma-icon-disabled',
          ]
        : [
            'focus-visible:outline-figma-border-selected',
            'data-checked:focus-visible:border-figma-icon-onbrand data-checked:focus-visible:outline-figma-border-selected-strong',
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
