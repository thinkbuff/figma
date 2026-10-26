/**
 * Adapted from figma-kit. MIT License
 * Copyright (c) 2024 Tigran Petrossian
 * https://github.com/tigranpetrossian/figma-kit/blob/beta/LICENSE
 */

import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import {
  NumericSelect,
  type NumericSelectProps,
} from '~/components/value-field/value-field-numeric-select';

const LABEL = 'Size';
const OPTIONS = [10, 12, 14, 20];

type TestNumericSelectProps = Partial<
  Omit<NumericSelectProps, 'value' | 'onChange' | 'options'>
> & {
  initialValue: number;
  options?: readonly number[];
};

type TestPointerEventInit = {
  button?: number;
  clientX?: number;
  clientY?: number;
  movementX?: number;
  pointerType?: string;
};

function field() {
  return page.getByRole('textbox', { name: LABEL });
}

function trigger() {
  return page.getByRole('combobox', { name: 'Select value' });
}

function TestNumericSelect(props: TestNumericSelectProps) {
  const { initialValue, options = OPTIONS, ...numericSelectProps } = props;
  const [value, setValue] = useState(initialValue);

  return (
    <NumericSelect
      aria-label={LABEL}
      value={value}
      onChange={setValue}
      options={options}
      {...numericSelectProps}
    />
  );
}

describe('NumericSelect', () => {
  it('renders the numeric value', async () => {
    await render(<TestNumericSelect initialValue={12} />);
    await expect.element(field()).toHaveValue('12');
  });

  it('updates from typed input', async () => {
    await render(<TestNumericSelect initialValue={12} />);
    await userEvent.click(field());
    await userEvent.keyboard('14');
    await userEvent.keyboard('{Enter}');
    await expect.element(field()).toHaveValue('14');
  });

  it('updates from scrubber drag', async () => {
    const { container } = await render(<TestNumericSelect initialValue={12} />);
    const scrubberEl = container.querySelector('[role="presentation"]');

    if (!(scrubberEl instanceof HTMLElement)) {
      throw new Error('Scrubber element not found');
    }

    await startScrubbing(scrubberEl);
    await movePointer(4);
    await stopScrubbing();

    await expect.element(field()).toHaveValue('16');
  });

  it('updates from selected option', async () => {
    await render(<TestNumericSelect initialValue={12} />);
    await userEvent.click(trigger());
    await userEvent.click(page.getByRole('option', { name: '20' }));
    await expect.element(field()).toHaveValue('20');
  });

  it('shows the current value above options when it is not an option', async () => {
    await render(<TestNumericSelect initialValue={20} />);
    await userEvent.click(field());
    await userEvent.keyboard('21');
    await userEvent.keyboard('{Enter}');
    await userEvent.click(trigger());
    await expect
      .element(page.getByRole('option', { name: '21', selected: true }))
      .toBeInTheDocument();
    await expect
      .poll(() =>
        page
          .getByRole('option')
          .elements()
          .map((option) => option.textContent),
      )
      .toEqual(['21', '10', '12', '14', '20']);
  });

  it('reports the option highlighted with the keyboard', async () => {
    const onItemHighlighted = vi.fn();
    await render(
      <TestNumericSelect
        initialValue={12}
        onItemHighlighted={onItemHighlighted}
      />,
    );
    await userEvent.click(trigger());
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(12);
    await userEvent.keyboard('{ArrowDown}');
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(14);
  });

  it('reports the hovered option, then undefined when the pointer leaves', async () => {
    const onItemHighlighted = vi.fn();
    await render(
      <TestNumericSelect
        initialValue={12}
        onItemHighlighted={onItemHighlighted}
      />,
    );
    await userEvent.click(trigger());
    const option = page.getByRole('option', { name: '20' });
    await userEvent.hover(option);
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(20);
    await userEvent.unhover(option);
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(undefined);
  });

  it('reports undefined when the menu closes', async () => {
    const onItemHighlighted = vi.fn();
    await render(
      <TestNumericSelect
        initialValue={12}
        onItemHighlighted={onItemHighlighted}
      />,
    );
    await userEvent.click(trigger());
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(12);
    await userEvent.keyboard('{Escape}');
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(undefined);
  });

  it('reports each highlight change once', async () => {
    const onItemHighlighted = vi.fn();
    await render(
      <TestNumericSelect
        initialValue={12}
        onItemHighlighted={onItemHighlighted}
      />,
    );
    await userEvent.click(trigger());
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(12);
    const option = page.getByRole('option', { name: '20' });
    await userEvent.hover(option);
    await userEvent.unhover(option);
    await userEvent.keyboard('{Escape}');
    await expect.poll(() => onItemHighlighted.mock.calls).toEqual([[12], [20], [undefined]]);
  });

  it('reports undefined after an option is selected', async () => {
    const onItemHighlighted = vi.fn();
    await render(
      <TestNumericSelect
        initialValue={12}
        onItemHighlighted={onItemHighlighted}
      />,
    );
    await userEvent.click(trigger());
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(12);
    await userEvent.click(page.getByRole('option', { name: '20' }));
    await expect.element(field()).toHaveValue('20');
    await expect.poll(() => onItemHighlighted.mock.calls).toEqual([[12], [20], [undefined]]);
  });

  it('reports the current value when it is not an option', async () => {
    const onItemHighlighted = vi.fn();
    await render(
      <TestNumericSelect
        initialValue={21}
        onItemHighlighted={onItemHighlighted}
      />,
    );
    await userEvent.click(trigger());
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(21);
  });

  it('reports the option matched by typing', async () => {
    const onItemHighlighted = vi.fn();
    await render(
      <TestNumericSelect
        initialValue={12}
        onItemHighlighted={onItemHighlighted}
      />,
    );
    await userEvent.click(trigger());
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(12);
    await userEvent.keyboard('2');
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(20);
  });

  it('reports the highlighted option again when the menu reopens', async () => {
    const onItemHighlighted = vi.fn();
    await render(
      <TestNumericSelect
        initialValue={12}
        onItemHighlighted={onItemHighlighted}
      />,
    );
    await userEvent.click(trigger());
    await expect.poll(() => onItemHighlighted.mock.calls.at(-1)?.[0]).toBe(12);
    await userEvent.keyboard('{Escape}');
    await userEvent.click(trigger());
    await expect.poll(() => onItemHighlighted.mock.calls).toEqual([[12], [undefined], [12]]);
  });

  it('disables the field and trigger', async () => {
    await render(
      <TestNumericSelect
        initialValue={12}
        disabled
      />,
    );
    await expect.element(field()).toBeDisabled();
    await expect.element(trigger()).toBeDisabled();
  });
});

async function startScrubbing(element: HTMLElement) {
  element.dispatchEvent(
    createPointerEvent('pointerdown', {
      clientX: 10,
      clientY: 10,
      pointerType: 'mouse',
    }),
  );
}

async function movePointer(movementX: number) {
  window.dispatchEvent(
    createPointerEvent('pointermove', {
      movementX,
      pointerType: 'mouse',
    }),
  );
}

async function stopScrubbing() {
  window.dispatchEvent(createPointerEvent('pointerup', { pointerType: 'mouse' }));
}

function createPointerEvent(type: string, init: TestPointerEventInit = {}) {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    button: init.button ?? 0,
    clientX: init.clientX ?? 0,
    clientY: init.clientY ?? 0,
  });

  Object.defineProperties(event, {
    movementX: { value: init.movementX ?? 0 },
    pointerType: { value: init.pointerType ?? 'mouse' },
  });

  return event;
}
