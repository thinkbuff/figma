/**
 * Shared menu styling used by DropdownMenu, ContextMenu, Select, Combobox,
 * and ValueField.NumericSelect. Keep visual parity with Figma's menu styles.
 * Adapted from figma-kit's menu.base.css. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

const menuPopupClassName = [
  'text-figma-sm text-figma-menu',
  'bg-figma-menu',
  'rounded-figma-lg',
  'shadow-figma-menu',
  'outline-none',
  'origin-(--transform-origin) transition-[opacity,scale] duration-100 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 motion-reduce:transition-none',
];

const menuContentClassName = [menuPopupClassName, 'min-w-20', 'border-none', 'p-2'];

const menuItemClassName = [
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

const menuItemIndicatorClassName = 'absolute left-1 h-3 w-4';

const menuLabelClassName = [
  'flex',
  'items-center',
  'h-6',
  'px-2',
  'text-figma-sm leading-figma-sm',
  'text-figma-menu-tertiary',
];

const menuSeparatorClassName = 'my-2 h-px w-full bg-figma-border-menu';

const menuScrollButtonClassName =
  'h-6 w-full flex cursor-default items-center justify-center bg-figma-menu hover:bg-figma-menu-hover';

export {
  menuContentClassName,
  menuPopupClassName,
  menuItemClassName,
  menuItemIndicatorClassName,
  menuLabelClassName,
  menuSeparatorClassName,
  menuScrollButtonClassName,
};
