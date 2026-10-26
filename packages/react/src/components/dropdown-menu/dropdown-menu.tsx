import { Menu as MenuPrimitive } from '@base-ui/react/menu';

import { CheckmarkIcon, ChevronRightIcon, CircleIcon } from '~/icons';
import { addClassName } from '~/utils';

import {
  menuContentClassName,
  menuItemClassName,
  menuItemIndicatorClassName,
  menuLabelClassName,
  menuSeparatorClassName,
} from '../menu/menu-classes';

type PositionerProps = React.ComponentPropsWithRef<typeof MenuPrimitive.Positioner>;

type PortalContainer = React.ComponentProps<typeof MenuPrimitive.Portal>['container'];

const DropdownMenuRoot = MenuPrimitive.Root;

const DropdownMenuTrigger = MenuPrimitive.Trigger;

function DropdownMenuGroup({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Group>) {
  return (
    <MenuPrimitive.Group
      ref={ref}
      className={addClassName(
        className,
        'py-2 first:pt-0 last:pb-0 not-first:border-t not-first:border-solid not-first:border-figma-border-menu',
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
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Arrow>) {
  return (
    <MenuPrimitive.Arrow
      ref={ref}
      className={addClassName(
        className,
        'fill-figma-bg-menu',
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
    />
  );
}

DropdownMenuArrow.displayName = 'DropdownMenuArrow';

function DropdownMenuSubTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.SubmenuTrigger>) {
  return (
    <MenuPrimitive.SubmenuTrigger
      ref={ref}
      className={addClassName(
        className,
        menuItemClassName,
        'justify-between',
        'data-disabled:pointer-events-none data-disabled:text-figma-menu-tertiary data-disabled:icon-figma-menu-tertiary',
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto -mr-2" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

interface DropdownMenuContentProps extends React.ComponentPropsWithRef<typeof MenuPrimitive.Popup> {
  container?: PortalContainer;
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: PositionerProps['sideOffset'];
  alignOffset?: PositionerProps['alignOffset'];
  collisionPadding?: PositionerProps['collisionPadding'];
}

const popupClassName = menuContentClassName;

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
          className={addClassName(className, popupClassName)}
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
      className={addClassName(className, 'group')}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

DropdownMenuContent.displayName = 'DropdownMenuContent';

function DropdownMenuItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Item>) {
  return (
    <MenuPrimitive.Item
      ref={ref}
      className={addClassName(
        className,
        menuItemClassName,
        'data-disabled:pointer-events-none data-disabled:text-figma-menu-disabled data-disabled:icon-figma-menu-disabled',
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
}: React.ComponentPropsWithRef<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      className={addClassName(
        className,
        menuItemClassName,
        'pl-6 data-disabled:pointer-events-none data-disabled:text-figma-menu-tertiary data-disabled:icon-figma-menu-tertiary',
      )}
      {...props}
    >
      <MenuPrimitive.CheckboxItemIndicator
        className={menuItemIndicatorClassName}
        render={<CheckmarkIcon size="4" />}
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
}: React.ComponentPropsWithRef<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      className={addClassName(
        className,
        menuItemClassName,
        'pl-6 data-disabled:pointer-events-none data-disabled:text-figma-menu-tertiary data-disabled:icon-figma-menu-tertiary',
      )}
      {...props}
    >
      <MenuPrimitive.RadioItemIndicator className="absolute left-1 w-4 flex items-center justify-center">
        <CircleIcon size="4" />
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
}: React.ComponentPropsWithRef<typeof MenuPrimitive.GroupLabel>) {
  return (
    <MenuPrimitive.GroupLabel
      ref={ref}
      className={addClassName(className, menuLabelClassName)}
      {...props}
    />
  );
}

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={addClassName(className, menuSeparatorClassName)}
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
