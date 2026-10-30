import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { ValueField } from '~/components/value-field';
import type { RGBA } from '~/components/value-field/types';
import type { HexProps } from '~/components/value-field/value-field-hex';

const HEX_INPUT_LABEL = 'hex';
const ALPHA_INPUT_LABEL = 'alpha';

function hexField() {
  return page.getByRole('textbox', { name: HEX_INPUT_LABEL });
}

function alphaField() {
  return page.getByRole('textbox', { name: ALPHA_INPUT_LABEL });
}

describe('input parsing', () => {
  function TestHexInput(props: Partial<HexProps>) {
    const { onChange, ...hexProps } = props;
    const [value, setValue] = useState({ r: 0, g: 0, b: 0, a: 1 });

    function setAlpha(alpha: number) {
      setValue(({ r, g, b }) => ({ r, g, b, a: alpha }));
    }

    function handleChange(value: RGBA) {
      setValue(value);
      onChange?.(value);
    }

    return (
      <ValueField.Multi>
        <ValueField.Root>
          <ValueField.Hex
            aria-label={HEX_INPUT_LABEL}
            value={value}
            onChange={handleChange}
            {...hexProps}
          />
        </ValueField.Root>
        <ValueField.Root>
          <ValueField.Numeric
            aria-label={ALPHA_INPUT_LABEL}
            value={value.a}
            onChange={setAlpha}
            min={0}
            max={1}
            targetRange={[0, 100]}
            suffix="%"
            precision={2}
          />
        </ValueField.Root>
      </ValueField.Multi>
    );
  }

  describe('given an input with valid hexedecimal characters', () => {
    it.each([
      { input: 'f', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'ff', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'fc', expected: { hex: 'FCFCFC', alpha: '100%' } },
      { input: 'fc0', expected: { hex: 'FFCC00', alpha: '100%' } },
      { input: 'fc00', expected: { hex: 'FFCC00', alpha: '0%' } },
      { input: 'fc000', expected: { hex: 'FFCC00', alpha: '0%' } },
      { input: 'fc01', expected: { hex: 'FFCC00', alpha: '6.67%' } },
      { input: 'fc010', expected: { hex: 'FFCC00', alpha: '6.27%' } },
      { input: 'fc0ef', expected: { hex: 'FFCC00', alpha: '93.73%' } },
      { input: 'fcfcfc0', expected: { hex: 'FCFCFC', alpha: '0%' } },
      { input: 'fcfcfc00', expected: { hex: 'FCFCFC', alpha: '0%' } },
      { input: 'fcfcfc1', expected: { hex: 'FCFCFC', alpha: '6.67%' } },
      { input: 'fcfcfc10', expected: { hex: 'FCFCFC', alpha: '6.27%' } },
      { input: 'fcfcfcef', expected: { hex: 'FCFCFC', alpha: '93.73%' } },
    ])('Converts $input to $expected', async ({ input, expected }) => {
      await render(<TestHexInput />);
      await userEvent.click(hexField());
      await userEvent.keyboard(input);
      await userEvent.keyboard('{Enter}');
      await expect.element(hexField()).toHaveValue(expected.hex);
      await expect.element(alphaField()).toHaveValue(expected.alpha);
    });
  });

  describe('given an input containing non-hexedecimal characters', () => {
    it.each([
      { input: 'z', expected: { hex: '000000', alpha: '100%' } },
      { input: '#f', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'zf', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'fz', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: 'zfz', expected: { hex: 'FFFFFF', alpha: '100%' } },
      { input: '#fcd0', expected: { hex: 'FFCCDD', alpha: '0%' } },
      { input: '#fcd00', expected: { hex: 'FFCCDD', alpha: '0%' } },
      { input: '#fcd80', expected: { hex: 'FFCCDD', alpha: '50.2%' } },
      { input: '#fcdef', expected: { hex: 'FFCCDD', alpha: '93.73%' } },
      { input: '_fcd_ef', expected: { hex: 'FFCCDD', alpha: '100%' } },
      { input: '_fcd_e_', expected: { hex: 'FFCCDD', alpha: '100%' } },
      { input: '#ffccdd', expected: { hex: 'FFCCDD', alpha: '100%' } },
      { input: '#ffccdd_00', expected: { hex: 'FFCCDD', alpha: '100%' } },
      { input: '#ffccdd0', expected: { hex: 'FFCCDD', alpha: '0%' } },
      { input: '#ffccdd00', expected: { hex: 'FFCCDD', alpha: '0%' } },
    ])('Converts $input to $expected', async ({ input, expected }) => {
      await render(<TestHexInput />);
      await userEvent.click(hexField());
      await userEvent.keyboard(input);
      await userEvent.keyboard('{Enter}');
      await expect.element(hexField()).toHaveValue(expected.hex);
      await expect.element(alphaField()).toHaveValue(expected.alpha);
    });
  });

  describe('given a valid <named-color> input', () => {
    it.each([
      { input: 'red', expected: { hex: 'FF0000', alpha: '100%' } },
      { input: 'thistle', expected: { hex: 'D8BFD8', alpha: '100%' } },
      { input: 'darkseagreen', expected: { hex: '8FBC8F', alpha: '100%' } },
    ])('Converts $input to $expected', async ({ input, expected }) => {
      await render(<TestHexInput />);
      await userEvent.click(hexField());
      await userEvent.keyboard(input);
      await userEvent.keyboard('{Enter}');
      await expect.element(hexField()).toHaveValue(expected.hex);
      await expect.element(alphaField()).toHaveValue(expected.alpha);
    });
  });

  describe('given an input with `ignoreAlpha`', () => {
    it('ignores alpha triplet from user input', async () => {
      const onChange = vi.fn();
      await render(
        <TestHexInput
          onChange={onChange}
          ignoreAlpha
        />,
      );
      await userEvent.click(hexField());
      await userEvent.keyboard('#FFFFFF00');
      await userEvent.keyboard('{Enter}');
      expect(onChange).toHaveBeenCalledWith({ r: 1, g: 1, b: 1, a: 1 });
    });
  });
});

describe('incrementing', () => {
  function TestHexInput() {
    const [value, setValue] = useState({ r: 0.5, g: 0.5, b: 0.5, a: 1 });
    return (
      <ValueField.Hex
        aria-label={HEX_INPUT_LABEL}
        value={value}
        onChange={setValue}
      />
    );
  }

  async function renderAndPrepare(options: {
    selectionStart: number;
    selectionEnd: number;
    key: 'ArrowUp' | 'ArrowDown';
  }) {
    await render(<TestHexInput />);
    await userEvent.click(hexField());
    const hexInput = hexField().element() as HTMLInputElement;
    hexInput.setSelectionRange(options.selectionStart, options.selectionEnd);
    await userEvent.keyboard(`{${options.key}}`);
    return hexInput;
  }

  it('increments entire hex value when input value is fully selected', async () => {
    const hexInput = await renderAndPrepare({ selectionStart: 0, selectionEnd: 6, key: 'ArrowUp' });
    expect(hexInput.value).toBe('818181');
  });

  it('decrements entire hex value when input value is fully selected', async () => {
    const hexInput = await renderAndPrepare({
      selectionStart: 0,
      selectionEnd: 6,
      key: 'ArrowDown',
    });
    expect(hexInput.value).toBe('7F7F7F');
  });

  describe('given a caret or selection in or around the first hex triplet', () => {
    it.each([
      { start: 0, end: 0 },
      { start: 1, end: 1 },
      { start: 2, end: 2 },
      { start: 0, end: 1 },
      { start: 1, end: 2 },
      { start: 0, end: 2 },
    ])('increments red channel', async ({ start, end }) => {
      const hexInput = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowUp',
      });
      expect(hexInput.value).toBe('818080');
      await expect.poll(() => hexInput.selectionStart).toBe(0);
      await expect.poll(() => hexInput.selectionEnd).toBe(2);
    });

    it.each([
      { start: 0, end: 0 },
      { start: 1, end: 1 },
      { start: 2, end: 2 },
      { start: 0, end: 1 },
      { start: 1, end: 2 },
      { start: 0, end: 2 },
    ])('decrements red channel', async ({ start, end }) => {
      const hexInput = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowDown',
      });
      expect(hexInput.value).toBe('7F8080');
      await expect.poll(() => hexInput.selectionStart).toBe(0);
      await expect.poll(() => hexInput.selectionEnd).toBe(2);
    });
  });

  describe('given a caret or selection in or around the second hex triplet', () => {
    it.each([
      { start: 3, end: 3 },
      { start: 4, end: 4 },
      { start: 2, end: 3 },
      { start: 2, end: 4 },
      { start: 3, end: 4 },
    ])('increments red channel', async ({ start, end }) => {
      const hexInput = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowUp',
      });
      expect(hexInput.value).toBe('808180');
      await expect.poll(() => hexInput.selectionStart).toBe(2);
      await expect.poll(() => hexInput.selectionEnd).toBe(4);
    });

    it.each([
      { start: 3, end: 3 },
      { start: 4, end: 4 },
      { start: 2, end: 3 },
      { start: 2, end: 4 },
      { start: 3, end: 4 },
    ])('decrements red channel', async ({ start, end }) => {
      const hexInput = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowDown',
      });
      expect(hexInput.value).toBe('807F80');
      await expect.poll(() => hexInput.selectionStart).toBe(2);
      await expect.poll(() => hexInput.selectionEnd).toBe(4);
    });
  });

  describe('given a caret or selection in or around the third hex triplet', () => {
    it.each([
      { start: 5, end: 5 },
      { start: 4, end: 5 },
      { start: 4, end: 6 },
      { start: 5, end: 6 },
    ])('increments red channel', async ({ start, end }) => {
      const hexInput = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowUp',
      });
      expect(hexInput.value).toBe('808081');
      await expect.poll(() => hexInput.selectionStart).toBe(4);
      await expect.poll(() => hexInput.selectionEnd).toBe(6);
    });

    it.each([
      { start: 5, end: 5 },
      { start: 4, end: 5 },
      { start: 4, end: 6 },
      { start: 5, end: 6 },
    ])('decrements red channel', async ({ start, end }) => {
      const hexInput = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowDown',
      });
      expect(hexInput.value).toBe('80807F');
      await expect.poll(() => hexInput.selectionStart).toBe(4);
      await expect.poll(() => hexInput.selectionEnd).toBe(6);
    });
  });

  describe('given a selection including any of the characters of red and green triplets', () => {
    it.each([
      { start: 0, end: 3 },
      { start: 0, end: 4 },
      { start: 1, end: 3 },
      { start: 1, end: 4 },
    ])('increments red and green channels', async ({ start, end }) => {
      const hexInput = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowUp',
      });
      expect(hexInput.value).toBe('818180');
      await expect.poll(() => hexInput.selectionStart).toBe(0);
      await expect.poll(() => hexInput.selectionEnd).toBe(4);
    });

    it.each([
      { start: 0, end: 3 },
      { start: 0, end: 4 },
      { start: 1, end: 3 },
      { start: 1, end: 4 },
    ])('decrements red and green channels', async ({ start, end }) => {
      const hexInput = await renderAndPrepare({
        selectionStart: start,
        selectionEnd: end,
        key: 'ArrowDown',
      });
      expect(hexInput.value).toBe('7F7F80');
      await expect.poll(() => hexInput.selectionStart).toBe(0);
      await expect.poll(() => hexInput.selectionEnd).toBe(4);
    });
  });
});
