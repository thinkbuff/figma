import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { CheckmarkIcon, CheckmarkIndeterminateIcon } from '~/icons';
import { addClassName } from '~/utils';

interface CheckboxProps extends React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root> {}

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * - [Docs](https://base-ui.com/react/components/checkbox)
 * - [API Reference](https://base-ui.com/react/components/checkbox#api)
 */
function Checkbox({
  className,
  checked,
  indeterminate = false,
  disabled,
  ref,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={addClassName(
        className,
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
        'data-checked:border-transparent data-checked:bg-figma-brand data-checked:icon-figma-onbrand',
        'data-indeterminate:icon-figma',
        disabled
          ? [
              'border-figma-border-disabled-strong',
              'data-checked:border-transparent data-checked:bg-figma-border-disabled-strong',
              'data-indeterminate:icon-figma-disabled',
            ]
          : [
              'focus-visible:outline-figma-border-selected',
              'data-checked:focus-visible:border-figma-icon-onbrand data-checked:focus-visible:outline-figma-border-selected-strong data-checked:focus-visible:outline-offset-0',
            ],
      )}
      {...props}
      checked={checked}
      indeterminate={indeterminate}
      disabled={disabled}
    >
      <CheckboxPrimitive.Indicator className="absolute inset-0 flex items-center justify-center">
        {indeterminate ? <CheckmarkIndeterminateIcon size="4" /> : <CheckmarkIcon size="4" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

Checkbox.displayName = 'Checkbox';

export { Checkbox };

export type { CheckboxProps };
