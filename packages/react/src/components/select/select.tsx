import { Select as SelectPrimitive } from '@base-ui/react/select';

import { CheckmarkIcon, ChevronDownIcon, ChevronUpIcon } from '~/icons';
import { addClassName, cn } from '~/utils';

import {
  menuItemClassName,
  menuItemIndicatorClassName,
  menuLabelClassName,
  menuPopupClassName,
  menuScrollButtonClassName,
  menuSeparatorClassName,
} from '../menu/menu-classes';

type PositionerProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Positioner>;

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

function SelectArrow({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Arrow>) {
  return (
    <SelectPrimitive.Arrow
      className={addClassName(
        className,
        'z-10 fill-figma-bg-menu',
        'data-[side=bottom]:-top-1.25 data-[side=bottom]:rotate-180',
        'data-[side=top]:-bottom-1.25',
        'data-[side=left]:right-[-7.5px] data-[side=left]:-rotate-90',
        'data-[side=right]:left-[-7.5px] data-[side=right]:rotate-90',
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
}

SelectArrow.displayName = 'SelectArrow';

interface SelectTriggerProps extends React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger> {
  placeholder?: React.ComponentProps<typeof SelectPrimitive.Value>['placeholder'];
}

function SelectTrigger({
  className,
  children,
  disabled,
  placeholder,
  ref,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={addClassName(
        className,
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
        className="pointer-events-none ml-1 mr-2 shrink-0 icon-figma-tertiary data-[disabled=true]:icon-figma-disabled group-hover:icon-figma"
        render={<ChevronDownIcon size="3" />}
      />
    </SelectPrimitive.Trigger>
  );
}

SelectTrigger.displayName = 'SelectTrigger';

interface SelectContentProps extends React.ComponentPropsWithRef<typeof SelectPrimitive.Popup> {
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
function SelectContent({
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
}: SelectContentProps) {
  return (
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
          className={addClassName(
            className,
            menuPopupClassName,
            'relative',
            'w-full',
            'min-w-(--anchor-width)',
            'max-h-(--available-height)',
          )}
          {...props}
          ref={ref}
        >
          {withArrow && !alignItemWithTrigger && <SelectArrow />}
          <SelectPrimitive.ScrollUpArrow
            className={cn(menuScrollButtonClassName, 'rounded-t-figma-lg')}
          >
            <ChevronUpIcon size="3.5" />
          </SelectPrimitive.ScrollUpArrow>
          <SelectPrimitive.List className="p-2">{children}</SelectPrimitive.List>
          <SelectPrimitive.ScrollDownArrow
            className={cn(menuScrollButtonClassName, 'rounded-b-figma-lg')}
          >
            <ChevronDownIcon size="3.5" />
          </SelectPrimitive.ScrollDownArrow>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

SelectContent.displayName = 'SelectContent';

/**
 * Must be rendered inside `Group`.
 */
function SelectLabel({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.GroupLabel>) {
  return (
    <SelectPrimitive.GroupLabel
      className={addClassName(className, menuLabelClassName, 'font-medium')}
      {...props}
      ref={ref}
    />
  );
}

SelectLabel.displayName = 'SelectLabel';

type SelectItemProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Item>;

function SelectItem({ className, children, ref, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={addClassName(
        className,
        menuItemClassName,
        'w-full',
        'pl-6',
        'pr-2',
        'data-disabled:text-figma-menu-tertiary data-disabled:icon-figma-menu-tertiary data-disabled:pointer-events-none',
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator
        className={menuItemIndicatorClassName}
        render={<CheckmarkIcon size="4" />}
      />
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

SelectItem.displayName = 'SelectItem';

function SelectSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={addClassName(className, menuSeparatorClassName)}
      {...props}
      ref={ref}
    />
  );
}

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
