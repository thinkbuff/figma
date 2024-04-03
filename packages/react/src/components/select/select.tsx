import { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '../../utils';

const SelectRoot = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectArrow = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Arrow>,
  SelectPrimitive.SelectArrowProps
>((props, ref) => (
  <SelectPrimitive.Arrow
    className="z-10 fill-figma-bg-menu"
    {...props}
    ref={ref}
  />
));

SelectArrow.displayName = SelectPrimitive.Arrow.displayName;

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  placeholder?: SelectPrimitive.SelectValueProps['placeholder'];
}

const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, disabled, placeholder, ...props }, ref) => (
  <SelectPrimitive.Trigger
    className={cn([
      'relative',
      'w-full',
      'h-7',
      'flex',
      'pl-2',
      'items-center',
      'bg-figma',
      'bg-clip-border',
      'border',
      'border-solid',
      'border-transparent',
      'outline',
      'outline-1',
      '-outline-offset-2',
      'outline-transparent',
      'rounded-0.5',
      'data-[placeholder]:(text-figma-tertiary fill-figma-icon-tertiary)',
      disabled
        ? [
            'cursor-not-allowed',
            'text-figma-disabled',
            'fill-figma-icon-disabled',
          ]
        : [
            'group',
            'cursor-default',
            'text-figma',
            'fill-figma-icon',
            'hover:border-figma',
            'focus-visible:(border-figma-selected outline-figma-border-selected)',
            'data-[state=open]:outline-figma-border-selected',
          ],
      className,
    ])}
    {...props}
    ref={ref}
    disabled={disabled}
    asChild={false}
  >
    <div className="pointer-events-none flex items-center group-hover:flex-grow group-data-[state=open]:flex-grow">
      {children ?? <SelectValue placeholder={placeholder} />}
    </div>
    <SelectPrimitive.Icon
      data-disabled={disabled}
      className="i-mdi-chevron-down pointer-events-none ml-1 mr-2 size-3 flex-shrink-0 text-figma-icon-tertiary data-[disabled=true]:text-figma-icon-disabled group-hover:text-figma-icon"
    />
  </SelectPrimitive.Trigger>
));

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  container?: SelectPrimitive.SelectPortalProps['container'];
  withArrow?: boolean;
}

/**
 * Displays a list of options for the user to pick from—triggered by a button.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/select)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/select#api-reference)
 */
const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, container, withArrow, sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal container={container}>
    <SelectPrimitive.Content
      className={cn([
        'relative',
        'text-figma-menu',
        'w-full',
        'bg-figma-menu',
        'rounded-0.5',
        'z-50',
        'data-[side=top]:min-w-[var(--radix-select-trigger-width)]',
        'data-[side=bottom]:min-w-[var(--radix-select-trigger-width)]',
        'max-h-[var(--radix-select-content-available-height)]',
        className,
      ])}
      sideOffset={sideOffset}
      onCloseAutoFocus={e => e.preventDefault()}
      {...props}
      ref={ref}
    >
      { withArrow && <SelectArrow /> }
      <SelectPrimitive.ScrollUpButton className="h-6 flex cursor-default items-center justify-center">
        <span className="i-tabler-chevron-up size-3.5"></span>
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport className="py-2">
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="h-6 flex cursor-default items-center justify-center">
        <span className="i-tabler-chevron-down size-3.5"></span>
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    className={cn([
      'text-size-11',
      'text-figma-menu-secondary',
      'px-8',
      'py-1',
      'pt-1',
      'font-medium',
      className,
    ])}
    {...props}
    ref={ref}
  />
));

SelectLabel.displayName = SelectPrimitive.Label.displayName;

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, asChild = false, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn([
      'relative',
      'w-full',
      'h-6',
      'flex',
      'items-center',
      'text-size-11',
      'pl-8',
      'pr-4',
      'cursor-default',
      'select-none',
      'outline-0',
      'focus:bg-figma-menu-selected',
      'data-[disabled]:(text-figma-menu-disabled pointer-events-none)',
      className,
    ])}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className="i-mdi-check-bold absolute left-2 h-3 w-4 -mt-1px" />
    <SelectPrimitive.ItemText asChild={asChild}>
      {children}
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    className={cn(
      ['w-full', 'border-t', 'border-figma-menu', 'my-2', 'h-1px'],
      className,
    )}
    {...props}
    ref={ref}
  />
));

SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectArrow,
};
