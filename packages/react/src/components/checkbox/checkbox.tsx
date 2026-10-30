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
              'border-figma',
              'bg-figma-secondary',
              'data-checked:icon-figma-secondary data-checked:focus-visible:icon-figma',
              'data-indeterminate:icon-figma',
              disabled
                ? [
                    'border-figma-border-disabled bg-transparent',
                    'data-checked:border-transparent data-checked:bg-figma-disabled data-checked:icon-figma-bg',
                    'data-indeterminate:border-transparent data-indeterminate:bg-figma-disabled data-indeterminate:icon-figma-disabled',
                  ]
                : [
                    'focus-visible:border-figma-border-selected-strong',
                    'data-checked:focus-visible:shadow-[inset_0_0_0_2px_var(--figma-color-bg)]',
                    'data-indeterminate:focus-visible:shadow-[inset_0_0_0_2px_var(--figma-color-bg)]',
                  ],
            ]
          : variant === 'ghost'
            ? [
                'border-0',
                'bg-figma-menu',
                'data-checked:icon-figma-onbrand',
                'data-indeterminate:icon-figma-onbrand',
                disabled
                  ? [
                      'bg-figma-icon-disabled',
                      'data-checked:bg-figma-icon-disabled data-checked:icon-figma-bg',
                      'data-indeterminate:bg-figma-icon-disabled data-indeterminate:icon-figma-disabled',
                    ]
                  : [
                      'focus-visible:border focus-visible:border-figma-border-selected-strong',
                      'data-checked:focus-visible:border-figma-border-selected',
                      'data-indeterminate:focus-visible:border-figma-border-selected',
                    ],
              ]
            : [
                'border-figma',
                'bg-figma-secondary',
                'data-checked:border-figma-border-selected-strong data-checked:bg-figma-brand data-checked:icon-figma-onbrand',
                'data-indeterminate:border-figma-border-selected-strong data-indeterminate:bg-figma-brand data-indeterminate:icon-figma-onbrand',
                disabled
                  ? [
                      'border-figma-border-disabled bg-transparent',
                      'data-checked:border-transparent data-checked:bg-figma-disabled data-checked:icon-figma-bg',
                      'data-indeterminate:border-transparent data-indeterminate:bg-figma-disabled data-indeterminate:icon-figma-disabled',
                    ]
                  : [
                      'focus-visible:border-figma-border-selected-strong',
                      'data-checked:focus-visible:shadow-[inset_0_0_0_2px_var(--figma-color-bg)]',
                      'data-indeterminate:focus-visible:shadow-[inset_0_0_0_2px_var(--figma-color-bg)]',
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
