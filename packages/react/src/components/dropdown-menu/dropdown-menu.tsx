import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import { MdiCheckBold, MdiCircleMedium, MdiTriangle } from '~/icons';
import { cn } from '~/utils';

type WithStringClassName<T> = Omit<T, 'className'> & { className?: string };

type PositionerProps = React.ComponentPropsWithRef<typeof MenuPrimitive.Positioner>;

type PortalContainer = React.ComponentProps<typeof MenuPrimitive.Portal>['container'];

const DropdownMenuRoot = MenuPrimitive.Root;

const DropdownMenuTrigger = MenuPrimitive.Trigger;

function DropdownMenuGroup({
  className,
  ref,
  ...props
}: WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.Group>>) {
  return (
    <MenuPrimitive.Group
      ref={ref}
      className={cn(
        'py-2 first:pt-0 last:pb-0 not-first:border-t not-first:border-solid not-first:border-figma-border-menu',
        className,
      )}
      {...props}
    />
  );
}

const DropdownMenuSub = MenuPrimitive.SubmenuRoot;

const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;

function DropdownMenuArrow({
  className,
  ref,
  ...props
}: WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.Arrow>>) {
  return (
    <MenuPrimitive.Arrow
      ref={ref}
      className={cn(
        'fill-figma-bg-menu',
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
    />
  );
}

DropdownMenuArrow.displayName = 'DropdownMenuArrow';

function DropdownMenuSubTrigger({
  className,
  children,
  ref,
  ...props
}: WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.SubmenuTrigger>>) {
  return (
    <MenuPrimitive.SubmenuTrigger
      ref={ref}
      className={cn(
        'relative',
        'flex',
        'items-center',
        'justify-between',
        'h-6',
        'px-2',
        'text-figma-sm leading-figma-sm',
        'text-figma-menu',
        'cursor-default',
        'select-none',
        'outline-none',
        'rounded-figma-md',
        'data-highlighted:bg-figma-selected-strong',
        'data-disabled:pointer-events-none data-disabled:text-figma-menu-tertiary',
        className,
      )}
      {...props}
    >
      {children}
      <MdiTriangle className="ml-auto size-2 rotate-90 pl-6 -mr-2" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

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
  'text-figma-sm text-figma-menu',
  'bg-figma-menu',
  'min-w-20',
  'rounded-figma-lg',
  'border-none',
  'p-2',
  'shadow-figma-menu',
  'outline-none',
  'origin-(--transform-origin) transition-[opacity,scale] duration-100 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
];

function DropdownMenuPopup({
  className,
  container,
  side,
  align,
  sideOffset,
  alignOffset,
  collisionPadding,
  ref,
  ...props
}: DropdownMenuContentProps) {
  return (
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
}

function DropdownMenuSubContent(props: DropdownMenuContentProps) {
  return <DropdownMenuPopup {...props} />;
}

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

/**
 * Displays a menu to the user — such as a set of actions or functions — triggered by a button.
 *
 * - [Docs](https://base-ui.com/react/components/menu)
 * - [API Reference](https://base-ui.com/react/components/menu#api-reference)
 */
function DropdownMenuContent({ className, sideOffset = 4, ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuPopup
      className={cn('group', className)}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

DropdownMenuContent.displayName = 'DropdownMenuContent';

const itemClassName = [
  'relative',
  'flex',
  'items-center',
  'h-6',
  'px-2',
  'text-figma-sm leading-figma-sm',
  'text-figma-menu',
  'cursor-default',
  'select-none',
  'outline-none',
  'rounded-figma-md',
  'data-highlighted:bg-figma-selected-strong',
];

function DropdownMenuItem({
  className,
  ref,
  ...props
}: WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.Item>>) {
  return (
    <MenuPrimitive.Item
      ref={ref}
      className={cn(
        itemClassName,
        'data-disabled:pointer-events-none data-disabled:text-figma-menu-disabled',
        className,
      )}
      {...props}
    />
  );
}

DropdownMenuItem.displayName = 'DropdownMenuItem';

function DropdownMenuCheckboxItem({
  className,
  children,
  ref,
  ...props
}: WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.CheckboxItem>>) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        itemClassName,
        'pl-6 data-disabled:pointer-events-none data-disabled:text-figma-menu-tertiary',
        className,
      )}
      {...props}
    >
      <MenuPrimitive.CheckboxItemIndicator
        className="absolute left-1 h-3 w-4"
        render={<MdiCheckBold />}
      />
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

function DropdownMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.RadioItem>>) {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        itemClassName,
        'pl-6 data-disabled:pointer-events-none data-disabled:text-figma-menu-tertiary',
        className,
      )}
      {...props}
    >
      <MenuPrimitive.RadioItemIndicator className="absolute left-1 w-4 flex items-center justify-center">
        <MdiCircleMedium className="size-3" />
      </MenuPrimitive.RadioItemIndicator>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

/**
 * Must be rendered inside `Group` or `RadioGroup`.
 */
function DropdownMenuLabel({
  className,
  ref,
  ...props
}: WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.GroupLabel>>) {
  return (
    <MenuPrimitive.GroupLabel
      ref={ref}
      className={cn(
        'flex',
        'items-center',
        'h-6',
        'px-2',
        'text-figma-sm leading-figma-sm',
        'text-figma-menu-tertiary',
        className,
      )}
      {...props}
    />
  );
}

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: WithStringClassName<React.ComponentPropsWithRef<typeof MenuPrimitive.Separator>>) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={cn('my-2 h-px w-full bg-figma-border-menu', className)}
      {...props}
    />
  );
}

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
