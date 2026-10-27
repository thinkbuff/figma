import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { CheckmarkIcon, CheckmarkIndeterminateIcon } from '~/icons';
import { addClassName } from '~/utils';

interface CheckboxProps extends React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root> {
  /**
   * `muted` renders a de-emphasized grey box, `ghost` a solid dark box (for
   * inverse contexts); both per the UI3 spec variants.
   */
  variant?: 'default' | 'muted' | 'ghost';
}

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
  variant = 'default',
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
        variant === 'muted'
          ? [
              'border-transparent',
              'bg-figma-tertiary',
              'data-checked:bg-figma-tertiary data-checked:icon-figma-secondary',
              'data-indeterminate:icon-figma-secondary',
              disabled
                ? 'bg-figma-disabled data-checked:bg-figma-disabled data-checked:icon-figma-onbrand data-indeterminate:icon-figma-onbrand'
                : 'focus-visible:bg-figma focus-visible:outline-figma-border-selected',
            ]
          : variant === 'ghost'
            ? [
                'border-transparent',
                'bg-figma-icon',
                'data-checked:bg-figma-icon data-checked:icon-figma-onbrand',
                'data-indeterminate:icon-figma-onbrand',
                disabled
                  ? 'bg-figma-icon-disabled data-checked:bg-figma-icon-disabled data-checked:icon-figma-onbrand'
                  : 'focus-visible:outline-figma-border-selected',
              ]
            : [
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
