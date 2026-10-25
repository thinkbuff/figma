import { Select as SelectPrimitive } from '@base-ui/react/select';

import { MdiCheckBold, MdiChevronDown, TablerChevronDown, TablerChevronUp } from '~/icons';
import { cn } from '~/utils';

type WithStringClassName<T> = Omit<T, 'className'> & { className?: string };

type PositionerProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Positioner>;

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectArrow: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof SelectPrimitive.Arrow>>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.Arrow
    className={cn(
      'z-10 fill-figma-bg-menu',
      'data-[side=bottom]:-top-1.25 data-[side=bottom]:rotate-180',
      'data-[side=top]:-bottom-1.25',
      'data-[side=left]:right-[-7.5px] data-[side=left]:-rotate-90',
      'data-[side=right]:left-[-7.5px] data-[side=right]:rotate-90',
      className,
    )}
    render={
      <svg
        width={10}
        height={5}
        viewBox="0 0 30 10"
        preserveAspectRatio="none"
      >
        <polygon points="0,0 30,0 15,10" />
      </svg>
    }
    {...props}
    ref={ref}
  />
);

SelectArrow.displayName = 'SelectArrow';

interface SelectTriggerProps extends WithStringClassName<
  React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>
> {
  placeholder?: React.ComponentProps<typeof SelectPrimitive.Value>['placeholder'];
}

const SelectTrigger: React.FC<SelectTriggerProps> = ({
  className,
  children,
  disabled,
  placeholder,
  ref,
  ...props
}) => (
  <SelectPrimitive.Trigger
    className={cn(
      'relative',
      'w-full',
      'h-6',
      'flex',
      'pl-2',
      'items-center',
      'bg-figma',
      'bg-clip-border',
      'border',
      'border-solid',
      'border-figma-border',
      'outline-solid',
      'outline-1',
      '-outline-offset-2',
      'outline-transparent',
      'rounded-figma-md',
      'data-placeholder:text-figma-tertiary data-placeholder:fill-figma-icon-tertiary',
      disabled
        ? ['cursor-not-allowed', 'text-figma-disabled', 'fill-figma-icon-disabled']
        : [
            'group',
            'cursor-default',
            'text-figma',
            'fill-figma-icon',
            'focus-visible:border-figma-selected focus-visible:outline-figma-border-selected',
            'data-popup-open:outline-figma-border-selected',
          ],
      className,
    )}
    {...props}
    ref={ref}
    disabled={disabled}
  >
    <div className="pointer-events-none flex items-center group-hover:grow group-data-popup-open:grow">
      {children ?? <SelectValue placeholder={placeholder} />}
    </div>
    <SelectPrimitive.Icon
      data-disabled={disabled}
      className="pointer-events-none ml-1 mr-2 size-3 shrink-0 text-figma-icon-tertiary data-[disabled=true]:text-figma-icon-disabled group-hover:text-figma-icon"
      render={<MdiChevronDown />}
    />
  </SelectPrimitive.Trigger>
);

SelectTrigger.displayName = 'SelectTrigger';

interface SelectContentProps extends WithStringClassName<
  React.ComponentPropsWithRef<typeof SelectPrimitive.Popup>
> {
  container?: React.ComponentProps<typeof SelectPrimitive.Portal>['container'];
  /**
   * Render an arrow pointing at the trigger. Only visible when `alignItemWithTrigger` is false.
   */
  withArrow?: boolean;
  alignItemWithTrigger?: PositionerProps['alignItemWithTrigger'];
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: PositionerProps['sideOffset'];
  alignOffset?: PositionerProps['alignOffset'];
  collisionPadding?: PositionerProps['collisionPadding'];
}

/**
 * Displays a list of options for the user to pick from—triggered by a button.
 *
 * - [Docs](https://base-ui.com/react/components/select)
 * - [API Reference](https://base-ui.com/react/components/select#api-reference)
 */
const SelectContent: React.FC<SelectContentProps> = ({
  className,
  children,
  container,
  withArrow,
  alignItemWithTrigger = true,
  side,
  align,
  sideOffset = withArrow ? 9 : 4,
  alignOffset,
  collisionPadding,
  ref,
  ...props
}) => (
  <SelectPrimitive.Portal container={container}>
    <SelectPrimitive.Positioner
      className="z-50"
      alignItemWithTrigger={alignItemWithTrigger}
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      collisionPadding={collisionPadding}
    >
      <SelectPrimitive.Popup
        className={cn(
          'relative',
          'text-figma-menu',
          'w-full',
          'bg-figma-menu',
          'rounded-figma-lg',
          'shadow-figma-menu',
          'min-w-(--anchor-width)',
          'max-h-(--available-height)',
          'outline-none',
          className,
        )}
        {...props}
        ref={ref}
      >
        {withArrow && !alignItemWithTrigger && <SelectArrow />}
        <SelectPrimitive.ScrollUpArrow className="h-6 w-full flex cursor-default items-center justify-center bg-figma-menu hover:bg-figma-menu-hover rounded-t-figma-lg">
          <TablerChevronUp className="size-3.5" />
        </SelectPrimitive.ScrollUpArrow>
        <SelectPrimitive.List className="p-2">{children}</SelectPrimitive.List>
        <SelectPrimitive.ScrollDownArrow className="h-6 w-full flex cursor-default items-center justify-center bg-figma-menu hover:bg-figma-menu-hover rounded-b-figma-lg">
          <TablerChevronDown className="size-3.5" />
        </SelectPrimitive.ScrollDownArrow>
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
);

SelectContent.displayName = 'SelectContent';

/**
 * Must be rendered inside `Group`.
 */
const SelectLabel: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof SelectPrimitive.GroupLabel>>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.GroupLabel
    className={cn(
      'text-figma-sm leading-figma-sm',
      'text-figma-menu-tertiary',
      'h-6',
      'px-2',
      'font-medium',
      className,
    )}
    {...props}
    ref={ref}
  />
);

SelectLabel.displayName = 'SelectLabel';

type SelectItemProps = WithStringClassName<
  React.ComponentPropsWithRef<typeof SelectPrimitive.Item>
>;

const SelectItem: React.FC<SelectItemProps> = ({ className, children, ref, ...props }) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative',
      'w-full',
      'h-6',
      'flex',
      'items-center',
      'text-figma-sm leading-figma-sm',
      'pl-6',
      'pr-2',
      'cursor-default',
      'select-none',
      'outline-0',
      'rounded-figma-md',
      'data-highlighted:bg-figma-selected-strong',
      'data-disabled:text-figma-menu-tertiary data-disabled:pointer-events-none',
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemIndicator
      className="absolute left-1 h-3 w-4"
      render={<MdiCheckBold />}
    />
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

SelectItem.displayName = 'SelectItem';

const SelectSeparator: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>>
> = ({ className, ref, ...props }) => (
  <SelectPrimitive.Separator
    className={cn('w-full', 'border-t', 'border-figma-menu', 'my-2', 'h-px', className)}
    {...props}
    ref={ref}
  />
);

SelectSeparator.displayName = 'SelectSeparator';

export {
  SelectRoot as Root,
  SelectTrigger as Trigger,
  SelectValue as Value,
  SelectContent as Content,
  SelectGroup as Group,
  SelectLabel as Label,
  SelectItem as Item,
  SelectSeparator as Separator,
  SelectArrow as Arrow,
};
