/**
 * Shared menu styling used by DropdownMenu, ContextMenu, Select, Combobox,
 * and ValueField.NumericSelect. Keep visual parity with Figma's menu styles.
 * Adapted from figma-kit's menu.base.css. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

const menuPopupClassName = [
  'text-figma-body-medium text-figma-menu',
  'bg-figma-menu',
  'rounded-figma-lg',
  'shadow-figma-menu',
  'outline-none',
  'origin-(--transform-origin) transition-[opacity,scale] duration-100 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
];

const menuContentClassName = [
  menuPopupClassName,
  'min-w-20',
  'border-none',
  'p-2',
  'max-h-(--available-height) overflow-y-auto',
];

const menuItemClassName = [
  'relative',
  'flex',
  'items-center',
  'h-6',
  'px-2',
  'text-figma-body-medium',
  'text-figma-menu',
  'icon-figma-menu',
  'cursor-default',
  'select-none',
  'outline-none',
  'rounded-figma-md',
  'data-highlighted:bg-figma-menu-selected',
];

const menuItemIndicatorClassName = 'absolute left-1';

const menuLabelClassName = [
  'flex',
  'items-center',
  'h-6',
  'px-2',
  'text-figma-body-medium',
  'text-figma-menu-tertiary',
];

const menuSeparatorClassName = 'my-[7.5px] -mx-2 h-px bg-figma-border-menu';

const menuScrollButtonClassName =
  'h-6 w-full flex cursor-default items-center justify-center bg-figma-menu hover:bg-figma-menu-hover icon-figma-menu';

const menuItemTrailClassName = 'ml-auto flex items-center pl-6 text-figma-menu-secondary';

const menuItemBadgeClassName =
  'flex h-5 items-center rounded-figma-md bg-figma-toolbar px-1.5 text-figma-onbrand';

const menuItemCheckClassName = 'flex size-4 items-center justify-center icon-figma-menu';

export {
  menuContentClassName,
  menuPopupClassName,
  menuItemClassName,
  menuItemIndicatorClassName,
  menuLabelClassName,
  menuSeparatorClassName,
  menuScrollButtonClassName,
  menuItemTrailClassName,
  menuItemBadgeClassName,
  menuItemCheckClassName,
};
