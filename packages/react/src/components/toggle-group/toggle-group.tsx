import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';

import { addClassName } from '~/utils';

interface ToggleGroupProps extends React.ComponentPropsWithRef<typeof BaseToggleGroup> {
  /**
   * Stretches the control to fill the available width.
   */
  fullWidth?: boolean | undefined;
}

interface ToggleGroupItemProps extends React.ComponentPropsWithRef<typeof BaseToggle> {}

/**
 * A set of two-state buttons that can be toggled on or off.
 *
 * - [Docs](https://base-ui.com/react/components/toggle-group)
 * - [API Reference](https://base-ui.com/react/components/toggle-group#api)
 */
function ToggleGroup({
  className,
  children,
  disabled,
  fullWidth,
  ref,
  ...props
}: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      ref={ref}
      className={addClassName(
        className,
        'group',
        fullWidth ? 'flex' : 'inline-flex',
        'bg-figma-secondary',
        'rounded-figma-md',
      )}
      {...props}
      data-full-width={fullWidth || undefined}
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
      className={addClassName(
        className,
        'h-6',
        'min-w-6',
        'w-fit',
        'flex-[1_0_auto]',
        'group-data-[full-width]:min-w-0 group-data-[full-width]:flex-1',
        'text-figma-body-medium',
        'font-figma-default',
        'flex',
        'justify-center',
        'items-center',
        'whitespace-nowrap',
        'cursor-default',
        'appearance-none',
        'text-figma-secondary',
        'fill-figma-icon-secondary',
        'bg-transparent',
        'rounded-figma-md',
        'transition-colors',
        'focus-visible:outline-solid focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-figma-border-selected',
        'data-pressed:bg-figma data-pressed:text-figma data-pressed:fill-figma-icon data-pressed:shadow-[inset_0_0_0_1px_var(--figma-color-border)]',
        'disabled:text-figma-tertiary disabled:fill-figma-icon-disabled',
      )}
      {...props}
    >
      {children}
    </BaseToggle>
  );
}

ToggleGroupItem.displayName = 'ToggleGroupItem';

function ToggleGroupText({ className, ref, ...props }: React.ComponentPropsWithRef<'span'>) {
  return (
    <span
      ref={ref}
      className={addClassName(
        className,
        'flex',
        'items-center',
        'p-2',
        'gap-1.5',
        'min-w-0',
        'truncate',
        'group-data-disabled:text-figma-tertiary',
      )}
      {...props}
    />
  );
}

ToggleGroupText.displayName = 'ToggleGroupText';

export { ToggleGroup, ToggleGroupItem, ToggleGroupText };
export type { ToggleGroupProps, ToggleGroupItemProps };
