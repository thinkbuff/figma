import { Toggle as BaseToggle } from '@base-ui/react/toggle';

import { addClassName } from '~/utils';

interface ToggleProps extends React.ComponentPropsWithRef<typeof BaseToggle> {
  /**
   * `default` shows no fill when pressed (the spec's icon-swap toggle);
   * `highlighted` fills the pressed state with `bg-selected`;
   * `secondary` draws the persistent translucent stroke from the
   * "Dialog Toggle w/ Stroke" spec.
   *
   * @default 'highlighted'
   */
  variant?: 'default' | 'highlighted' | 'secondary';
}

/**
 * A two-state button that can be either on or off.
 *
 * - [Docs](https://base-ui.com/react/components/toggle)
 * - [API Reference](https://base-ui.com/react/components/toggle#api)
 */
function Toggle({ className, disabled, variant = 'highlighted', ref, ...props }: ToggleProps) {
  return (
    <BaseToggle
      ref={ref}
      className={addClassName(
        className,
        'size-6',
        'icon-figma',
        'inline-flex',
        'items-center',
        'justify-center',
        'shrink-0',
        'rounded-figma-md',
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
        'focus:not-focus-visible:outline-0 focus:not-focus-visible:outline-transparent',
        variant === 'secondary' && 'border border-solid border-figma-bordertranslucent',
        disabled
          ? [
              'cursor-not-allowed',
              'pointer-events-none',
              'text-figma-disabled',
              'fill-figma-icon-disabled',
              'icon-figma-disabled',
              'data-pressed:bg-figma-disabled data-pressed:icon-figma-disabled',
            ]
          : [
              'hover:bg-figma-bghovertransparent',
              'hover:text-figma-icon-hover hover:fill-figma-icon-hover',
              variant === 'default'
                ? 'active:bg-figma-bgtransparent-secondary-hover'
                : 'not-data-pressed:active:bg-figma-bgtransparent-secondary-hover',
              'focus-visible:outline-figma-border-selected',
              variant !== 'default' && [
                'data-pressed:bg-figma-selected',
                'data-pressed:hover:bg-figma-selected-secondary',
                'data-pressed:active:bg-figma-selected',
                variant === 'secondary' && 'data-pressed:border-transparent',
              ],
            ],
      )}
      {...props}
      disabled={disabled}
    />
  );
}

Toggle.displayName = 'Toggle';

export { Toggle };
export type { ToggleProps };
