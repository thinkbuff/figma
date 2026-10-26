import { Switch as SwitchPrimitives } from '@base-ui/react/switch';

import { addClassName } from '~/utils';

interface SwitchProps extends React.ComponentPropsWithRef<typeof SwitchPrimitives.Root> {}

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * - [Docs](https://base-ui.com/react/components/switch)
 * - [API Reference](https://base-ui.com/react/components/switch#api)
 */
function Switch({ className, ref, ...props }: SwitchProps) {
  return (
    <SwitchPrimitives.Root
      className={addClassName(
        className,
        'peer',
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
        'focus-visible:outline-figma-border-selected-strong focus-visible:before:inset-0.5',
        'before:absolute before:inset-0 before:rounded-full before:border before:border-solid before:border-[#00000033] before:content-[""]',
        'dark:before:border-[#ffffff33]',
        'data-unchecked:before:bg-figma-secondary',
        'data-unchecked:active:before:bg-figma-tertiary',
        'data-checked:before:bg-figma-brand',
        'data-checked:active:before:bg-figma-brand-pressed',
        'data-disabled:data-unchecked:before:bg-figma-disabled',
        'data-disabled:data-checked:before:bg-figma-tertiary',
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className="pointer-events-none absolute top-1 left-1 h-2 w-3 rounded-full outline-solid outline-1 outline-[#00000033] bg-figma-icon-onbrand transition-all duration-[80ms] data-checked:left-[calc(100%-16px)] data-checked:outline-[#0000001a] data-disabled:bg-figma-icon-ondisabled" />
    </SwitchPrimitives.Root>
  );
}

Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
