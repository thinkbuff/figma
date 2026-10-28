import { Toggle as BaseToggle } from '@base-ui/react/toggle';

import { addClassName } from '~/utils';

interface ToggleProps extends React.ComponentPropsWithRef<typeof BaseToggle> {
  /**
   * Persistent stroked border — the spec's "Dialog Toggle w/ Stroke".
   */
  stroke?: boolean;
}

/**
 * A two-state button that can be either on or off.
 *
 * - [Docs](https://base-ui.com/react/components/toggle)
 * - [API Reference](https://base-ui.com/react/components/toggle#api)
 */
function Toggle({ className, disabled, stroke = false, ref, ...props }: ToggleProps) {
  return (
    <BaseToggle
      ref={ref}
      className={addClassName(
        className,
        'size-6',
        'icon-figma',
        'text-figma-body-medium',
        'text-figma',
        'inline-flex',
        'items-center',
        'justify-center',
        'shrink-0',
        'rounded-figma-md',
        'font-figma-default',
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
        stroke && 'border border-solid border-figma data-pressed:border-figma-brand',
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
              'hover:bg-figma-hover hover:text-figma-icon-hover hover:fill-figma-icon-hover',
              'focus-visible:outline-figma-border-selected',
              'data-pressed:bg-figma-selected',
              'data-pressed:hover:bg-figma-selected',
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
