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
const ToggleGroup: React.FC<ToggleGroupProps> = ({
  className,
  children,
  disabled,
  ref,
  ...props
}) => (
  <BaseToggleGroup
    ref={ref}
    className={cn(
      'group',
      'flex',
      'items-center',
      'justify-center',
      'bg-figma',
      'border',
      'border-solid',
      'border-transparent',
      'rounded-figma-sm',
      disabled ? 'cursor-not-allowed' : 'hover:border-figma',
      className,
    )}
    {...props}
    disabled={disabled}
  >
    {children}
  </BaseToggleGroup>
);

ToggleGroup.displayName = 'ToggleGroup';

const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({
  className,
  children,
  ref,
  ...props
}) => (
  <BaseToggle
    ref={ref}
    className={cn(
      'size-6',
      'text-figma-sm leading-figma-sm',
      'flex',
      'justify-center',
      'items-center',
      'cursor-default',
      'appearance-none',
      'text-figma',
      'fill-figma-icon',
      'bg-transparent',
      'transition-colors',
      'data-pressed:bg-figma-tertiary',
      'disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-figma-disabled disabled:fill-figma-icon-disabled',
      'disabled:data-pressed:bg-figma-disabled disabled:data-pressed:text-figma-ondisabled disabled:data-pressed:fill-figma-icon-ondisabled',
      className,
    )}
    {...props}
  >
    {children}
  </BaseToggle>
);

ToggleGroupItem.displayName = 'ToggleGroupItem';

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupProps, ToggleGroupItemProps };
