import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '~/utils';

const DropdownMenuRoot = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuArrow: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Arrow>> = ({
  className,
  ref,
  ...props
}) => <DropdownMenuPrimitive.Arrow ref={ref} className={cn('fill-figma-bg-menu', className)} {...props} />;

DropdownMenuArrow.displayName = DropdownMenuPrimitive.Arrow.displayName;

const DropdownMenuSubTrigger: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger>> = ({
  className,
  children,
  ref,
  ...props
}) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'relative',
      'flex',
      'items-center',
      'justify-between',
      'h-6',
      'pl-8',
      'pr-4',
      'font-size-11',
      'text-figma-menu',
      'cursor-default',
      'select-none',
      'outline-none',
      'hover:bg-figma-menu-selected',
      'focus:bg-figma-menu-selected',
      'data-[disabled]:(pointer-events-none text-figma-menu-disabled)',
      className,
    )}
    {...props}
  >
    {children}
    <span className="i-mdi-triangle size-2 rotate-90"></span>
  </DropdownMenuPrimitive.SubTrigger>
);

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

interface DropdownMenuSubContentProps extends React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent> {
  container?: DropdownMenuPrimitive.DropdownMenuPortalProps['container'];
}

const DropdownMenuSubContent: React.FC<DropdownMenuSubContentProps> = ({
  className,
  container,
  ref,
  ...props
}) => (
  <DropdownMenuPrimitive.Portal container={container}>
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'text-figma-menu',
        'bg-figma-menu',
        'data-[state=open]:(animate-in fade-in-0 zoom-in-95)',
        'data-[state=closed]:(animate-out fade-out-0 zoom-out-95)',
        'data-[side=top]:slide-in-from-bottom-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'min-w-20',
        'rounded-0.5',
        'border-none',
        'py-2',
        'shadow-md',
        'z-50',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

interface DropdownMenuContentProps extends React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content> {
  container?: DropdownMenuPrimitive.DropdownMenuPortalProps['container'];
}

/**
 * Displays a menu to the user — such as a set of actions or functions — triggered by a button.
 *
 * - [Docs](https://www.radix-ui.com/docs/primitives/components/dropdown-menu)
 * - [API Reference](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#api-reference)
 */
const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  className,
  container,
  sideOffset = 4,
  ref,
  ...props
}) => (
  <DropdownMenuPrimitive.Portal container={container}>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'group',
        'text-figma-menu',
        'bg-figma-menu',
        'data-[state=open]:(animate-in fade-in-0 zoom-in-95)',
        'data-[state=closed]:(animate-out fade-out-0 zoom-out-95)',
        'data-[side=top]:slide-in-from-bottom-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'min-w-20',
        'rounded-0.5',
        'border-none',
        'py-2',
        'shadow-md',
        'z-50',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item>> = ({
  className,
  ref,
  ...props
}) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative',
      'flex',
      'items-center',
      'h-6',
      'pl-8',
      'pr-4',
      'font-size-11',
      'text-figma-menu',
      'cursor-default',
      'select-none',
      'outline-none',
      'hover:bg-figma-menu-selected',
      'focus:bg-figma-menu-selected',
      'data-[disabled]:(pointer-events-none text-figma-menu-disabled)',
      className,
    )}
    {...props}
  />
);

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>> = ({
  className,
  children,
  ref,
  ...props
}) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative',
      'flex',
      'items-center',
      'h-6',
      'pl-8',
      'pr-4',
      'font-size-11',
      'text-figma-menu',
      'cursor-default',
      'select-none',
      'outline-none',
      'hover:bg-figma-menu-selected',
      'focus:bg-figma-menu-selected',
      'data-[disabled]:(pointer-events-none text-figma-disabled)',
      className,
    )}
    {...props}
  >
    <DropdownMenuPrimitive.ItemIndicator className="i-mdi-check-bold absolute left-2 h-3 w-4" />
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>> = ({
  className,
  children,
  ref,
  ...props
}) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative',
      'flex',
      'items-center',
      'h-6',
      'pl-8',
      'pr-4',
      'font-size-11',
      'text-figma-menu',
      'cursor-default',
      'select-none',
      'outline-none',
      'hover:bg-figma-menu-selected',
      'focus:bg-figma-menu-selected',
      'data-[disabled]:(pointer-events-none text-figma-disabled)',
      className,
    )}
    {...props}
  >
    <DropdownMenuPrimitive.ItemIndicator className="absolute left-2 w-4 flex items-center justify-center">
      <span className="i-mdi-circle-medium size-3"></span>
    </DropdownMenuPrimitive.ItemIndicator>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label>> = ({
  className,
  ref,
  ...props
}) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn('px-8', 'py-1', 'font-size-11', 'text-figma-menu-secondary', 'font-medium', className)}
    {...props}
  />
);

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator: React.FC<React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>> = ({
  className,
  ref,
  ...props
}) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('border-figma-menu my-2 h-[1px] w-full border-t', className)}
    {...props}
  />
);

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export {
  DropdownMenuRoot as Root,
  DropdownMenuTrigger as Trigger,
  DropdownMenuArrow as Arrow,
  DropdownMenuCheckboxItem as CheckboxItem,
  DropdownMenuContent as Content,
  DropdownMenuGroup as Group,
  DropdownMenuItem as Item,
  DropdownMenuLabel as Label,
  DropdownMenuRadioGroup as RadioGroup,
  DropdownMenuRadioItem as RadioItem,
  DropdownMenuSeparator as Separator,
  DropdownMenuSub as Sub,
  DropdownMenuSubTrigger as SubTrigger,
  DropdownMenuSubContent as SubContent,
};
