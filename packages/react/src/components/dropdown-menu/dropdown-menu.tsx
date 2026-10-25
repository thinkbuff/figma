import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import { MdiCheckBold, MdiCircleMedium, MdiTriangle } from '~/icons';
import { cn } from '~/utils';

type WithStringClassName<T> = Omit<T, 'className'> & { className?: string };

type PositionerProps = React.ComponentPropsWithRef<typeof MenuPrimitive.Positioner>;

type PortalContainer = React.ComponentProps<typeof MenuPrimitive.Portal>['container'];

const DropdownMenuRoot = MenuPrimitive.Root;

const DropdownMenuTrigger = MenuPrimitive.Trigger;

const DropdownMenuGroup = MenuPrimitive.Group;

const DropdownMenuSub = MenuPrimitive.SubmenuRoot;

const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;

const DropdownMenuArrow: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.Arrow>>
> = ({ className, ref, ...props }) => (
  <MenuPrimitive.Arrow
    ref={ref}
    className={cn(
      'fill-figma-bg-menu',
      'data-[side=bottom]:-top-[5px] data-[side=bottom]:rotate-180',
      'data-[side=top]:-bottom-[5px]',
      'data-[side=left]:-right-[7.5px] data-[side=left]:-rotate-90',
      'data-[side=right]:-left-[7.5px] data-[side=right]:rotate-90',
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
  />
);

DropdownMenuArrow.displayName = 'DropdownMenuArrow';

const DropdownMenuSubTrigger: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.SubmenuTrigger>>
> = ({ className, children, ref, ...props }) => (
  <MenuPrimitive.SubmenuTrigger
    ref={ref}
    className={cn(
      'relative',
      'flex',
      'items-center',
      'justify-between',
      'h-6',
      'pl-8',
      'pr-4',
      'text-figma-sm leading-figma-sm',
      'text-figma-menu',
      'cursor-default',
      'select-none',
      'outline-none',
      'hover:bg-figma-menu-selected',
      'focus:bg-figma-menu-selected',
      'data-[disabled]:pointer-events-none data-[disabled]:text-figma-menu-disabled',
      className,
    )}
    {...props}
  >
    {children}
    <MdiTriangle className="size-2 rotate-90" />
  </MenuPrimitive.SubmenuTrigger>
);

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

interface DropdownMenuContentProps extends WithStringClassName<
  React.ComponentPropsWithRef<typeof MenuPrimitive.Popup>
> {
  container?: PortalContainer;
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: PositionerProps['sideOffset'];
  alignOffset?: PositionerProps['alignOffset'];
  collisionPadding?: PositionerProps['collisionPadding'];
}

const popupClassName = [
  'text-figma-menu',
  'bg-figma-menu',
  'min-w-20',
  'rounded-figma-sm',
  'border-none',
  'py-2',
  'shadow-md',
  'outline-none',
  'origin-(--transform-origin) transition-[opacity,scale] duration-100 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 motion-reduce:transition-none',
];

const DropdownMenuPopup: React.FC<DropdownMenuContentProps> = ({
  className,
  container,
  side,
  align,
  sideOffset,
  alignOffset,
  collisionPadding,
  ref,
  ...props
}) => (
  <MenuPrimitive.Portal container={container}>
    <MenuPrimitive.Positioner
      className="z-50"
      side={side}
      align={align}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      collisionPadding={collisionPadding}
    >
      <MenuPrimitive.Popup
        ref={ref}
        className={cn(popupClassName, className)}
        {...props}
      />
    </MenuPrimitive.Positioner>
  </MenuPrimitive.Portal>
);

const DropdownMenuSubContent: React.FC<DropdownMenuContentProps> = (props) => (
  <DropdownMenuPopup {...props} />
);

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

/**
 * Displays a menu to the user — such as a set of actions or functions — triggered by a button.
 *
 * - [Docs](https://base-ui.com/react/components/menu)
 * - [API Reference](https://base-ui.com/react/components/menu#api-reference)
 */
const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  className,
  sideOffset = 4,
  ...props
}) => (
  <DropdownMenuPopup
    className={cn('group', className)}
    sideOffset={sideOffset}
    {...props}
  />
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

const itemClassName = [
  'relative',
  'flex',
  'items-center',
  'h-6',
  'pl-8',
  'pr-4',
  'text-figma-sm leading-figma-sm',
  'text-figma-menu',
  'cursor-default',
  'select-none',
  'outline-none',
  'hover:bg-figma-menu-selected',
  'focus:bg-figma-menu-selected',
];

const DropdownMenuItem: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.Item>>
> = ({ className, ref, ...props }) => (
  <MenuPrimitive.Item
    ref={ref}
    className={cn(
      itemClassName,
      'data-[disabled]:pointer-events-none data-[disabled]:text-figma-menu-disabled',
      className,
    )}
    {...props}
  />
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuCheckboxItem: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.CheckboxItem>>
> = ({ className, children, ref, ...props }) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      itemClassName,
      'data-[disabled]:pointer-events-none data-[disabled]:text-figma-disabled',
      className,
    )}
    {...props}
  >
    <MenuPrimitive.CheckboxItemIndicator
      className="absolute left-2 h-3 w-4"
      render={<MdiCheckBold />}
    />
    {children}
  </MenuPrimitive.CheckboxItem>
);

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

const DropdownMenuRadioItem: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.RadioItem>>
> = ({ className, children, ref, ...props }) => (
  <MenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      itemClassName,
      'data-[disabled]:pointer-events-none data-[disabled]:text-figma-disabled',
      className,
    )}
    {...props}
  >
    <MenuPrimitive.RadioItemIndicator className="absolute left-2 w-4 flex items-center justify-center">
      <MdiCircleMedium className="size-3" />
    </MenuPrimitive.RadioItemIndicator>
    {children}
  </MenuPrimitive.RadioItem>
);

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

/**
 * Must be rendered inside `Group` or `RadioGroup`.
 */
const DropdownMenuLabel: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.GroupLabel>>
> = ({ className, ref, ...props }) => (
  <MenuPrimitive.GroupLabel
    ref={ref}
    className={cn(
      'px-8',
      'py-1',
      'text-figma-sm leading-figma-sm',
      'text-figma-menu-secondary',
      'font-medium',
      className,
    )}
    {...props}
  />
);

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator: React.FC<
  WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.Separator>>
> = ({ className, ref, ...props }) => (
  <MenuPrimitive.Separator
    ref={ref}
    className={cn('border-figma-menu my-2 h-[1px] w-full border-t', className)}
    {...props}
  />
);

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

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
