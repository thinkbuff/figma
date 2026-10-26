/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';

import { CheckmarkIcon, ChevronRightIcon, CircleIcon } from '~/icons';
import { addClassName } from '~/utils';

import {
  menuContentClassName,
  menuItemClassName,
  menuItemIndicatorClassName,
  menuLabelClassName,
  menuSeparatorClassName,
} from '../menu/menu-classes';

type PositionerProps = React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Positioner>;

type PortalContainer = React.ComponentProps<typeof ContextMenuPrimitive.Portal>['container'];

const ContextMenuRoot = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

function ContextMenuGroup({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Group>) {
  return (
    <ContextMenuPrimitive.Group
      ref={ref}
      className={addClassName(
        className,
        'py-2 first:pt-0 last:pb-0 not-first:border-t not-first:border-solid not-first:border-figma-border-menu',
      )}
      {...props}
    />
  );
}

const ContextMenuSub = ContextMenuPrimitive.SubmenuRoot;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

function ContextMenuSubTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.SubmenuTrigger>) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
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
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

interface ContextMenuContentProps extends React.ComponentPropsWithRef<
  typeof ContextMenuPrimitive.Popup
> {
  container?: PortalContainer;
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: PositionerProps['sideOffset'];
  alignOffset?: PositionerProps['alignOffset'];
  collisionPadding?: PositionerProps['collisionPadding'];
}

function ContextMenuPopup({
  className,
  container,
  side,
  align,
  sideOffset,
  alignOffset,
  collisionPadding,
  ref,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal container={container}>
      <ContextMenuPrimitive.Positioner
        className="z-50"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
      >
        <ContextMenuPrimitive.Popup
          ref={ref}
          className={addClassName(className, menuContentClassName)}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuSubContent(props: ContextMenuContentProps) {
  return <ContextMenuPopup {...props} />;
}

ContextMenuSubContent.displayName = 'ContextMenuSubContent';

/**
 * Displays a menu at the pointer position, triggered by a right-click.
 *
 * - [Docs](https://base-ui.com/react/components/context-menu)
 * - [API Reference](https://base-ui.com/react/components/context-menu#api-reference)
 */
function ContextMenuContent({ className, sideOffset = 4, ...props }: ContextMenuContentProps) {
  return (
    <ContextMenuPopup
      className={addClassName(className, 'group')}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

ContextMenuContent.displayName = 'ContextMenuContent';

function ContextMenuItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Item>) {
  return (
    <ContextMenuPrimitive.Item
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

ContextMenuItem.displayName = 'ContextMenuItem';

function ContextMenuCheckboxItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={addClassName(
        className,
        menuItemClassName,
        'pl-6 data-disabled:pointer-events-none data-disabled:text-figma-menu-tertiary data-disabled:icon-figma-menu-tertiary',
      )}
      {...props}
    >
      <ContextMenuPrimitive.CheckboxItemIndicator
        className={menuItemIndicatorClassName}
        render={<CheckmarkIcon size="4" />}
      />
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

function ContextMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={addClassName(
        className,
        menuItemClassName,
        'pl-6 data-disabled:pointer-events-none data-disabled:text-figma-menu-tertiary data-disabled:icon-figma-menu-tertiary',
      )}
      {...props}
    >
      <ContextMenuPrimitive.RadioItemIndicator className="absolute left-1 w-4 flex items-center justify-center">
        <CircleIcon size="4" />
      </ContextMenuPrimitive.RadioItemIndicator>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

/**
 * Must be rendered inside `Group` or `RadioGroup`.
 */
function ContextMenuLabel({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.GroupLabel>) {
  return (
    <ContextMenuPrimitive.GroupLabel
      ref={ref}
      className={addClassName(className, menuLabelClassName)}
      {...props}
    />
  );
}

ContextMenuLabel.displayName = 'ContextMenuLabel';

function ContextMenuSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={addClassName(className, menuSeparatorClassName)}
      {...props}
    />
  );
}

ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export {
  ContextMenuRoot as Root,
  ContextMenuTrigger as Trigger,
  ContextMenuCheckboxItem as CheckboxItem,
  ContextMenuContent as Content,
  ContextMenuGroup as Group,
  ContextMenuItem as Item,
  ContextMenuLabel as Label,
  ContextMenuRadioGroup as RadioGroup,
  ContextMenuRadioItem as RadioItem,
  ContextMenuSeparator as Separator,
  ContextMenuSub as Sub,
  ContextMenuSubTrigger as SubTrigger,
  ContextMenuSubContent as SubContent,
};
