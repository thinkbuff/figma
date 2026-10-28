/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import { mergeProps } from '@base-ui/react/merge-props';
import * as React from 'react';

import { cn, useComposedRefs, useSelectOnInputClick } from '~/utils';

import type { Formatter } from './types';
import { type ValueFieldScrubTarget, useValueFieldContext } from './value-field-elements';

const DEFAULT_SMALL_NUDGE = 1;
const DEFAULT_BIG_NUDGE = 10;

type BaseProps<V> = Omit<React.ComponentPropsWithRef<'input'>, 'value' | 'onChange'> & {
  value: V;
  onChange: (value: V) => void;
  smallNudge?: number;
  bigNudge?: number;
  formatter: Formatter<V>;
};

function Base<V>(props: BaseProps<V>) {
  const {
    className,
    ref: forwardedRef,
    value: valueProp,
    onChange,
    smallNudge = DEFAULT_SMALL_NUDGE,
    bigNudge = DEFAULT_BIG_NUDGE,
    formatter,
    disabled,
    ...fieldProps
  } = props;
  const ref = React.useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(forwardedRef, ref);
  const scrubValueRef = React.useRef(valueProp);
  const [editingValue, setEditingValue] = React.useState<string | null>(null);
  const inputValue = editingValue ?? formatter.format(valueProp);
  const context = useValueFieldContext('ValueField');
  const disabledValue = disabled || context?.disabled ? true : undefined;
  const registerScrubTarget = context?.registerScrubTarget;
  const selectOnClickProps = useSelectOnInputClick();

  React.useEffect(() => {
    if (!context?.scrubbing) {
      scrubValueRef.current = valueProp;
    }
  }, [context?.scrubbing, valueProp]);

  function submit(input: string) {
    const parserResult = formatter.parse(input, valueProp);

    if (input.length === 0 || !parserResult.valid || parserResult.value === valueProp) {
      return revert();
    }

    setEditingValue(null);
    onChange(parserResult.value);
  }

  function revert() {
    setEditingValue(null);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEditingValue(event.currentTarget.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const inputElement = event.currentTarget;

    if (event.key === 'Enter') {
      event.preventDefault();
      inputElement.blur();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      revert();
      // Delegate selection to the next tick to make sure it happens after value is set.
      requestAnimationFrame(() => {
        inputElement.blur();
      });
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!formatter.incrementBy) {
        return;
      }

      event.preventDefault();
      const parseResult = formatter.parse(inputElement.value, valueProp);
      const oldValue = parseResult.valid ? parseResult.value : valueProp;
      const nudge = event.shiftKey ? bigNudge : smallNudge;
      const amount = event.key === 'ArrowUp' ? nudge : -nudge;
      const incrementTargets = formatter.getIncrementTargets
        ? formatter.getIncrementTargets(inputElement)
        : null;
      const newValue = formatter.incrementBy(oldValue, amount, incrementTargets);
      submit(formatter.format(newValue));
      // Delegate selection to the next tick to make sure it happens after value is set.
      requestAnimationFrame(() => {
        if (incrementTargets && formatter.getIncrementSelection) {
          const [start, end] = formatter.getIncrementSelection(incrementTargets);
          inputElement.setSelectionRange(start, end);
        } else {
          inputElement.select();
        }
      });
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    submit(event.currentTarget.value);
  }

  const handleScrubStart = React.useCallback(() => {
    const inputElement = ref.current;
    setEditingValue(null);

    if (!inputElement) {
      scrubValueRef.current = valueProp;
      return;
    }

    const parseResult = formatter.parse(inputElement.value, valueProp);
    scrubValueRef.current = parseResult.valid ? parseResult.value : valueProp;
    inputElement.focus();
  }, [formatter, valueProp]);

  const handleScrub = React.useCallback(
    (movementX: number, event: PointerEvent) => {
      if (!formatter.incrementBy) {
        return;
      }

      const currentValue = scrubValueRef.current;
      const nudge = event.shiftKey ? bigNudge : smallNudge;
      const nextValue = formatter.incrementBy(currentValue, movementX * nudge, null);
      const parserResult = formatter.parse(formatter.format(nextValue), currentValue);

      if (!parserResult.valid || parserResult.value === currentValue) {
        return;
      }

      scrubValueRef.current = parserResult.value;
      setEditingValue(null);
      onChange(parserResult.value);
    },
    [bigNudge, formatter, onChange, smallNudge],
  );

  React.useEffect(() => {
    if (!registerScrubTarget || !formatter.incrementBy) {
      return undefined;
    }

    const scrubTarget: ValueFieldScrubTarget = {
      disabled: Boolean(disabledValue),
      inputRef: ref,
      startScrub: handleScrubStart,
      scrub: handleScrub,
    };

    return registerScrubTarget(scrubTarget);
  }, [disabledValue, formatter, handleScrub, handleScrubStart, registerScrubTarget]);

  return (
    <input
      ref={composedRef}
      dir="auto"
      autoComplete="off"
      spellCheck="false"
      className={cn(
        'h-full min-w-0 flex-1',
        'bg-transparent',
        'cursor-default outline-none',
        'font-figma text-figma-body-medium font-figma-default',
        'text-figma placeholder:text-figma-tertiary',
        context?.inMulti ? 'pl-1 pr-1' : 'pl-2 pr-2',
        'disabled:cursor-not-allowed disabled:text-figma-tertiary',
        className,
      )}
      value={inputValue}
      onChange={handleChange}
      disabled={disabledValue}
      {...mergeProps<'input'>(
        { onBlur: handleBlur, onKeyDown: handleKeyDown },
        selectOnClickProps,
        fieldProps,
      )}
    />
  );
}

export { Base };
export type { BaseProps };
