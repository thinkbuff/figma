/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Numeric, type NumericProps } from '~/components/value-field/value-field-numeric';

const LABEL = 'label';

function field() {
  return page.getByRole('textbox', { name: LABEL });
}

describe('formatting', () => {
  const onChange = vi.fn();
  function renderInput(props: Partial<NumericProps> & { value: number }) {
    return render(
      <Numeric
        aria-label={LABEL}
        onChange={onChange}
        {...props}
      />,
    );
  }

  it('clamps value to max', async () => {
    await renderInput({ min: 0, max: 100, value: 110 });
    await expect.element(field()).toHaveValue('100');
  });

  it('clamps value to min', async () => {
    await renderInput({ min: 0, max: 100, value: -10 });
    await expect.element(field()).toHaveValue('0');
  });

  it('throws an error, when min or max is not specified', async () => {
    const consoleError = vi.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
    await expect(renderInput({ value: 1, min: 0, targetRange: [0, 100] })).rejects.toThrow(
      "'targetRange' requires specifying 'min' and 'max'.",
    );
    await expect(renderInput({ value: 1, max: 1, targetRange: [0, 100] })).rejects.toThrow(
      "'targetRange' requires specifying 'min' and 'max'.",
    );
    consoleError.mockRestore();
  });

  it('throws an error, when min equals to max', async () => {
    const consoleError = vi.spyOn(console, 'error');
    consoleError.mockImplementation(() => {});
    await expect(renderInput({ value: 1, min: 0, max: 0, targetRange: [0, 100] })).rejects.toThrow(
      "'min' and 'max' cannot be equal.",
    );
    consoleError.mockRestore();
  });

  it('normalizes formatted value to specified target range', async () => {
    await renderInput({ value: 0.5, min: 0, max: 1, targetRange: [0, 100] });
    await expect.element(field()).toHaveValue('50');
  });

  it('adds suffix', async () => {
    await renderInput({ value: 1, suffix: '%' });
    await expect.element(field()).toHaveValue('1%');
  });

  it('rounds to specified precision', async () => {
    await renderInput({ value: 3.14159265359, precision: 2 });
    await expect.element(field()).toHaveValue('3.14');
  });
});

// Expression evaluations are tested separately in ./value-field-numeric-evaluator.test.ts,
// as they add a significant overhead to test suite duration when done via browser tests.
describe('interactions', () => {
  function TestNumeric(props: Partial<Omit<NumericProps, 'value'>> & { initialValue: number }) {
    const { initialValue, onChange, ...numericProps } = props;
    const [value, setValue] = useState(initialValue);

    function handleChange(value: number) {
      onChange?.(value);
      setValue(value);
    }

    return (
      <Numeric
        aria-label={LABEL}
        value={value}
        onChange={handleChange}
        {...numericProps}
      />
    );
  }

  function renderInput(props: Partial<NumericProps> & { initialValue: number }) {
    return render(<TestNumeric {...props} />);
  }

  it('allows specified units in input', async () => {
    await renderInput({ initialValue: 10, allowedUnits: ['px'] });
    await userEvent.click(field());
    await userEvent.keyboard('11px');
    await userEvent.keyboard('{Enter}');
    await expect.element(field()).toHaveValue('11');
  });

  it('allows specified suffix in input', async () => {
    await renderInput({ initialValue: 10, suffix: 'px' });
    await userEvent.click(field());
    await userEvent.keyboard('11px');
    await userEvent.keyboard('{Enter}');
    await expect.element(field()).toHaveValue('11px');
  });

  it('rounds input to specified precision', async () => {
    await renderInput({ initialValue: 10, precision: 2 });
    await userEvent.click(field());
    await userEvent.keyboard('10.23456');
    await userEvent.keyboard('{Enter}');
    await expect.element(field()).toHaveValue('10.23');
  });

  it('clamps input to specified min', async () => {
    await renderInput({ initialValue: 10, min: 0, max: 100 });
    await userEvent.click(field());
    await userEvent.keyboard('-10');
    await userEvent.keyboard('{Enter}');
    await expect.element(field()).toHaveValue('0');
  });

  it('clamps input to specified max', async () => {
    await renderInput({ initialValue: 10, min: 0, max: 100 });
    await userEvent.click(field());
    await userEvent.keyboard('110');
    await userEvent.keyboard('{Enter}');
    await expect.element(field()).toHaveValue('100');
  });

  it('denormalizes into initial min-max range upon submission', async () => {
    const onChange = vi.fn();
    await renderInput({
      initialValue: 0,
      min: 0,
      max: 1,
      targetRange: [0, 100],
      onChange,
    });
    await userEvent.click(field());
    await userEvent.keyboard('50');
    await userEvent.keyboard('{Enter}');
    await expect.element(field()).not.toHaveFocus();
    await expect.element(field()).toHaveValue('50');
    expect(onChange).toHaveBeenCalledWith(0.5);
  });

  describe('when nudge amounts are not specified', () => {
    it('increments by default small nudge', async () => {
      await renderInput({ initialValue: 10 });
      await userEvent.click(field());
      await userEvent.keyboard('{ArrowUp}');
      await expect.element(field()).toHaveValue('11');
    });

    it('decrements by default small nudge', async () => {
      await renderInput({ initialValue: 10 });
      await userEvent.click(field());
      await userEvent.keyboard('{ArrowDown}');
      await expect.element(field()).toHaveValue('9');
    });

    it('increments by default big nudge with shift', async () => {
      await renderInput({ initialValue: 10 });
      await userEvent.click(field());
      await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');
      await expect.element(field()).toHaveValue('20');
    });

    it('decrements by default big nudge with shift', async () => {
      await renderInput({ initialValue: 10 });
      await userEvent.click(field());
      await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
      await expect.element(field()).toHaveValue('0');
    });
  });

  describe('when nudge amounts are specified', () => {
    it('increments by custom small nudge', async () => {
      await renderInput({ initialValue: 10, smallNudge: 2 });
      await userEvent.click(field());
      await userEvent.keyboard('{ArrowUp}');
      await expect.element(field()).toHaveValue('12');
    });

    it('decrements by custom small nudge', async () => {
      await renderInput({ initialValue: 10, smallNudge: 2 });
      await userEvent.click(field());
      await userEvent.keyboard('{ArrowDown}');
      await expect.element(field()).toHaveValue('8');
    });

    it('increments by custom big nudge with shift', async () => {
      await renderInput({ initialValue: 10, bigNudge: 20 });
      await userEvent.click(field());
      await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');
      await expect.element(field()).toHaveValue('30');
    });

    it('decrements by custom big nudge with shift', async () => {
      await renderInput({ initialValue: 10, bigNudge: 20 });
      await userEvent.click(field());
      await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
      await expect.element(field()).toHaveValue('-10');
    });
  });

  describe('when min and max are specified', () => {
    it('stays within range when incrementing', async () => {
      await renderInput({ initialValue: 100, min: 0, max: 100 });
      await userEvent.click(field());
      await userEvent.keyboard('{ArrowUp}');
      await expect.element(field()).toHaveValue('100');
    });

    it('stays within range when decrementing', async () => {
      await renderInput({ initialValue: 0, min: 0, max: 100 });
      await userEvent.click(field());
      await userEvent.keyboard('{ArrowDown}');
      await expect.element(field()).toHaveValue('0');
    });
  });
});
