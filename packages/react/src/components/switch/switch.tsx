import { Switch as SwitchPrimitives } from '@base-ui/react/switch';

import { cn } from '~/utils';

interface SwitchProps extends Omit<
  React.ComponentPropsWithRef<typeof SwitchPrimitives.Root>,
  'className'
> {
  className?: string;
}

/**
 * A control that allows the user to toggle between checked and not checked.
 *
 * - [Docs](https://base-ui.com/react/components/switch)
 * - [API Reference](https://base-ui.com/react/components/switch#api)
 */
const Switch: React.FC<SwitchProps> = ({ className, ref, ...props }) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer',
      'inline-flex',
      'shrink-0',
      'items-center',
      'w-6',
      'h-3',
      'rounded-full',
      'cursor-default',
      'border-1',
      'border-solid',
      'border-transparent',
      'transition-colors',
      'data-disabled:cursor-not-allowed data-disabled:bg-figma-disabled',
      'data-checked:bg-figma-brand',
      'data-unchecked:bg-figma-icon-tertiary',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className="pointer-events-none block size-2.5 rounded-full transition-transform bg-figma-icon-onbrand data-checked:translate-x-3 data-unchecked:translate-x-0" />
  </SwitchPrimitives.Root>
);

Switch.displayName = 'Switch';

export { Switch };
export type { SwitchProps };
