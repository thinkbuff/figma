import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';

import { cn } from '~/utils';

interface ToggleGroupProps extends Omit<
  React.ComponentPropsWithRef<typeof BaseToggleGroup>,
  'className'
> {
  className?: string;
}

interface ToggleGroupItemProps extends Omit<
  React.ComponentPropsWithRef<typeof BaseToggle>,
  'className'
> {
  className?: string;
}

/**
 * A set of two-state buttons that can be toggled on or off.
 *
 * - [Docs](https://base-ui.com/react/components/toggle-group)
 * - [API Reference](https://base-ui.com/react/components/toggle-group#api)
 */
function ToggleGroup({ className, children, disabled, ref, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      ref={ref}
      className={cn('group', 'inline-flex', 'bg-figma-secondary', 'rounded-figma-md', className)}
      {...props}
      disabled={disabled}
    >
      {children}
    </BaseToggleGroup>
  );
}

ToggleGroup.displayName = 'ToggleGroup';

function ToggleGroupItem({ className, children, ref, ...props }: ToggleGroupItemProps) {
  return (
    <BaseToggle
      ref={ref}
      className={cn(
        'h-6',
        'min-w-6',
        'w-fit',
        'flex-[1_0_auto]',
        'text-figma-sm leading-figma-sm',
        'font-figma-default',
        'flex',
        'justify-center',
        'items-center',
        'whitespace-nowrap',
        'cursor-default',
        'appearance-none',
        'text-figma',
        'fill-figma-icon-secondary',
        'bg-transparent',
        'rounded-figma-md',
        'transition-colors',
        'focus-visible:outline-solid focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-figma-border-selected',
        'data-pressed:bg-figma data-pressed:fill-figma-icon data-pressed:shadow-[inset_0_0_0_1px_var(--figma-color-border)]',
        'disabled:text-figma-disabled disabled:fill-figma-icon-disabled',
        className,
      )}
      {...props}
    >
      {children}
    </BaseToggle>
  );
}

ToggleGroupItem.displayName = 'ToggleGroupItem';

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupProps, ToggleGroupItemProps };
