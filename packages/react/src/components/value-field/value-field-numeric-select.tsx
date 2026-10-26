/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import { Select as BaseSelect } from '@base-ui/react/select';
import * as React from 'react';

import { MdiCheckBold, MdiChevronDown, TablerChevronUp } from '~/icons';
import { cn } from '~/utils';

import {
  menuItemClassName,
  menuItemIndicatorClassName,
  menuPopupClassName,
  menuScrollButtonClassName,
  menuSeparatorClassName,
} from '../menu/menu-classes';
import { Multi, Root } from './value-field-elements';
import { Numeric, type NumericProps } from './value-field-numeric';
import { Scrubber } from './value-field-scrubber';

interface NumericSelectProps extends Omit<NumericProps, 'className' | 'style'> {
  options: readonly number[];
  onItemHighlighted?: (value: number | undefined) => void;
  className?: string;
  style?: React.CSSProperties;
  triggerLabel?: string;
}

function NumericSelect(props: NumericSelectProps) {
  const {
    className,
    style,
    value,
    onChange,
    options,
    onItemHighlighted,
    disabled,
    triggerLabel = 'Select value',
    ref,
    ...numericProps
  } = props;
  const valueOption = options.includes(value);
  const selectValue = toSelectValue(value);
  const selectOptions = getSelectOptions(value, options, valueOption);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const highlightedValueRef = React.useRef<number | undefined>(undefined);

  function changeSelectValue(nextValue: string | null) {
    if (nextValue !== null) {
      onChange(Number(nextValue));
    }
  }

  function highlightItem(nextValue: number | undefined) {
    if (highlightedValueRef.current === nextValue) {
      return;
    }

    highlightedValueRef.current = nextValue;
    onItemHighlighted?.(nextValue);
  }

  function changeOpen(open: boolean) {
    if (!open) {
      highlightItem(undefined);
    }
  }

  function clearHighlightOnPopupFocus(event: React.FocusEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      highlightItem(undefined);
    }
  }

  return (
    <BaseSelect.Root
      items={selectOptions}
      value={selectValue}
      onValueChange={changeSelectValue}
      onOpenChange={changeOpen}
      disabled={disabled}
    >
      <Multi
        ref={anchorRef}
        className={cn(
          'w-full',
          'not-data-disabled:hover:after:border-transparent',
          'not-data-disabled:has-[>label:hover]:after:border-figma-border',
          className,
        )}
        style={style}
        disabled={disabled}
      >
        <Root
          className="min-w-0"
          disabled={disabled}
        >
          <Scrubber />
          <Numeric
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            {...numericProps}
          />
        </Root>
        <BaseSelect.Trigger
          className={cn(
            'box-border appearance-none self-start',
            'flex h-6 w-6 shrink-0 items-center justify-center p-0',
            '-mt-px',
            'rounded-r-figma-md border-0 border-l border-figma-bg bg-transparent',
            'text-figma icon-figma',
            'not-disabled:hover:bg-figma-tertiary',
            'disabled:text-figma-disabled disabled:icon-figma-disabled',
          )}
          aria-label={triggerLabel}
        >
          <BaseSelect.Value className="pointer-events-none absolute top-0 left-2 h-6 w-0 overflow-hidden whitespace-nowrap opacity-0" />
          <BaseSelect.Icon className="flex items-center justify-center">
            <MdiChevronDown className="size-4" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </Multi>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          anchor={anchorRef}
          className={cn(
            'flex flex-col',
            'min-w-[calc(var(--anchor-width)+22px)]',
            'min-h-[calc(var(--available-height)+22px)]',
            valueOption && 'mt-2.25!',
          )}
          positionMethod="fixed"
          collisionPadding={0}
        >
          <BaseSelect.Popup
            className={cn(menuPopupClassName, 'min-w-20 p-2')}
            onFocus={clearHighlightOnPopupFocus}
          >
            <BaseSelect.ScrollUpArrow className={menuScrollButtonClassName}>
              <TablerChevronUp className="size-4" />
            </BaseSelect.ScrollUpArrow>
            <BaseSelect.List>
              {!valueOption && (
                <>
                  <BaseSelect.Item
                    value={selectValue}
                    label={selectValue}
                    className={cn(menuItemClassName, 'pl-6 bg-figma-menu-selected')}
                    onFocus={() => highlightItem(value)}
                  >
                    <BaseSelect.ItemIndicator className={menuItemIndicatorClassName}>
                      <MdiCheckBold className="size-4" />
                    </BaseSelect.ItemIndicator>
                    <BaseSelect.ItemText>{value}</BaseSelect.ItemText>
                  </BaseSelect.Item>
                  <BaseSelect.Separator className={menuSeparatorClassName} />
                </>
              )}
              {options.map((option) => (
                <BaseSelect.Item
                  key={toSelectValue(option)}
                  value={toSelectValue(option)}
                  label={toSelectValue(option)}
                  className={cn(menuItemClassName, 'pl-6')}
                  onFocus={() => highlightItem(option)}
                >
                  <BaseSelect.ItemIndicator className={menuItemIndicatorClassName}>
                    <MdiCheckBold className="size-4" />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText>{option}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
            <BaseSelect.ScrollDownArrow className={menuScrollButtonClassName}>
              <MdiChevronDown className="size-4" />
            </BaseSelect.ScrollDownArrow>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

function getSelectOptions(value: number, options: readonly number[], valueOption: boolean) {
  const optionItems = options.map((option) => {
    const optionValue = toSelectValue(option);
    return { value: optionValue, label: optionValue };
  });

  if (valueOption) {
    return optionItems;
  }

  return [{ value: toSelectValue(value), label: toSelectValue(value) }, ...optionItems];
}

function toSelectValue(value: number) {
  return `${value}`;
}

NumericSelect.displayName = 'ValueField.NumericSelect';

export { NumericSelect };
export type { NumericSelectProps };
