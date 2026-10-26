import { Toggle as BaseToggle } from '@base-ui/react/toggle';

import { cn } from '~/utils';

interface ToggleProps extends Omit<React.ComponentPropsWithRef<typeof BaseToggle>, 'className'> {
  className?: string;
}

/**
 * A two-state button that can be either on or off.
 *
 * - [Docs](https://base-ui.com/react/components/toggle)
 * - [API Reference](https://base-ui.com/react/components/toggle#api)
 */
function Toggle({ className, disabled, ref, ...props }: ToggleProps) {
  return (
    <BaseToggle
      ref={ref}
      className={cn(
        'size-8',
        'text-figma-sm leading-figma-sm',
        'text-figma',
        'inline-flex',
        'items-center',
        'justify-center',
        'shrink-0',
        'rounded-figma-sm',
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
        disabled
          ? [
              'cursor-not-allowed',
              'pointer-events-none',
              'text-figma-disabled',
              'fill-figma-icon-disabled',
              'data-pressed:bg-figma-disabled',
            ]
          : [
              'hover:bg-figma-hover hover:text-figma-icon-hover hover:fill-figma-icon-hover',
              'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-figma-border-brand-strong',
              'data-pressed:bg-figma-brand data-pressed:text-figma-icon-onbrand data-pressed:fill-figma-icon-onbrand',
              'data-pressed:hover:bg-figma-brand data-pressed:hover:text-figma-icon-onbrand data-pressed:hover:fill-figma-icon-onbrand',
            ],
        className,
      )}
      {...props}
      disabled={disabled}
    />
  );
}

Toggle.displayName = 'Toggle';

export { Toggle };
export type { ToggleProps };
