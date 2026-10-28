import { Switch as SwitchPrimitives } from '@base-ui/react/switch';

import { CheckmarkIndeterminateIcon } from '~/icons';
import { addClassName } from '~/utils';

interface SwitchProps extends React.ComponentPropsWithRef<typeof SwitchPrimitives.Root> {
  /**
   * Marks the switch as indeterminate (UI3 "Mixed" state). Renders a bar
   * instead of the knob and sets `aria-checked="mixed"`.
   */
  indeterminate?: boolean;
}

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * - [Docs](https://base-ui.com/react/components/switch)
 * - [API Reference](https://base-ui.com/react/components/switch#api)
 */
function Switch({ className, indeterminate = false, ref, ...props }: SwitchProps) {
  return (
    <SwitchPrimitives.Root
      data-mixed={indeterminate || undefined}
      {...(indeterminate ? { 'aria-checked': 'mixed' as const } : {})}
      className={addClassName(
        className,
        'peer',
        'group',
        'relative',
        'block',
        'shrink-0',
        'w-8',
        'h-4',
        'rounded-full',
        'cursor-default',
        'appearance-none',
        'border-0',
        'bg-transparent',
        'outline-solid',
        'outline-1',
        '-outline-offset-1',
        'outline-transparent',
        'transition-[background-position] duration-[80ms]',
        'focus-visible:outline-figma-border-selected focus-visible:before:inset-[3px]',
        'data-checked:focus-visible:outline-figma-border-selected-strong',
        'data-mixed:focus-visible:outline-figma-border-selected-strong',
        'before:absolute before:inset-0 before:rounded-full before:content-[""]',
        'data-unchecked:before:bg-figma-tertiary',
        'data-checked:before:bg-figma-brand',
        'data-mixed:data-unchecked:before:bg-figma-brand',
        'data-checked:active:before:bg-figma-brand-pressed',
        'data-mixed:data-unchecked:active:before:bg-figma-brand-pressed',
        'data-disabled:data-unchecked:before:bg-figma-disabled',
        'data-disabled:data-checked:before:bg-figma-tertiary',
      )}
      {...props}
      ref={ref}
    >
      {indeterminate ? (
        <CheckmarkIndeterminateIcon
          size="4"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 icon-figma-onbrand group-data-disabled:icon-figma-disabled"
        />
      ) : (
        <SwitchPrimitives.Thumb className="pointer-events-none absolute top-px left-px size-3.5 rounded-full bg-figma-icon-onbrand transition-all duration-[80ms] data-checked:left-[calc(100%-15px)] data-disabled:bg-figma-icon-ondisabled" />
      )}
    </SwitchPrimitives.Root>
  );
}

Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
