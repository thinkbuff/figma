import { useState, type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { ValueField } from '~/components/value-field';
import type { NumericProps } from '~/components/value-field/value-field-numeric';
import type { ScrubberProps } from '~/components/value-field/value-field-scrubber';

const FIELD_LABEL = 'value';
const SCRUBBER_TEST_ID = 'scrubber';

type TestPointerEventInit = {
  button?: number;
  clientX?: number;
  clientY?: number;
  movementX?: number;
  movementY?: number;
  pointerType?: string;
  shiftKey?: boolean;
};

type TestFieldProps = Partial<Omit<NumericProps, 'value' | 'onChange'>> & {
  initialValue: number;
  onChange?: (value: number) => void;
  rootDisabled?: boolean;
  scrubberChildren?: ReactNode;
  scrubberProps?: Partial<Pick<ScrubberProps, 'pixelSensitivity' | 'teleportDistance'>>;
};

function field() {
  return page.getByRole('textbox', { name: FIELD_LABEL });
}

function scrubber() {
  return page.getByTestId(SCRUBBER_TEST_ID);
}

function scrubberElement() {
  return scrubber().element() as HTMLElement;
}

describe('ValueField.Scrubber', () => {
  it('increments and decrements the numeric value while dragging a wrapped label', async () => {
    await render(<TestField initialValue={0} />);

    await startScrubbing(scrubberElement());
    await movePointer(4);
    await expect.element(field()).toHaveValue('4');

    await movePointer(-2);
    await expect.element(field()).toHaveValue('2');
  });

  it('uses the big nudge while dragging with shift pressed', async () => {
    await render(<TestField initialValue={0} />);

    await startScrubbing(scrubberElement());
    await movePointer(2, { shiftKey: true });

    await expect.element(field()).toHaveValue('20');
  });

  it('applies the accumulated movement when pixel sensitivity is reached', async () => {
    await render(
      <TestField
        initialValue={0}
        scrubberProps={{ pixelSensitivity: 5 }}
      />,
    );

    await startScrubbing(scrubberElement());
    await movePointer(-2);
    await expect.element(field()).toHaveValue('0');

    await movePointer(2);
    await expect.element(field()).toHaveValue('0');

    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await expect.element(field()).toHaveValue('0');

    await movePointer(1);
    await expect.element(field()).toHaveValue('5');

    await movePointer(5);
    await expect.element(field()).toHaveValue('10');

    await movePointer(-4);
    await expect.element(field()).toHaveValue('10');

    await movePointer(-1);
    await expect.element(field()).toHaveValue('5');
  });

  it('changes by the same amount for slow and fast drags over the same distance', async () => {
    const { rerender } = await render(
      <TestField
        key="fast"
        initialValue={0}
        scrubberProps={{ pixelSensitivity: 2 }}
      />,
    );

    await startScrubbing(scrubberElement());
    await movePointer(10);
    await stopScrubbing();
    await expect.element(field()).toHaveValue('10');

    await rerender(
      <TestField
        key="slow"
        initialValue={0}
        scrubberProps={{ pixelSensitivity: 2 }}
      />,
    );

    await startScrubbing(scrubberElement());
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await movePointer(1);
    await stopScrubbing();
    await expect.element(field()).toHaveValue('10');
  });

  it('keeps min, max, precision, suffix, and target range behavior', async () => {
    const onChange = vi.fn();
    await render(
      <TestField
        initialValue={0.95}
        onChange={onChange}
        min={0}
        max={1}
        targetRange={[0, 100]}
        precision={0}
        suffix="%"
      />,
    );

    await startScrubbing(scrubberElement());
    await movePointer(10);
    await expect.element(field()).toHaveValue('100%');
    expect(onChange).toHaveBeenLastCalledWith(1);

    await movePointer(-200);
    await expect.element(field()).toHaveValue('0%');
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it('works as an invisible left-edge hitbox', async () => {
    await render(
      <TestField
        initialValue={0}
        scrubberChildren={null}
      />,
    );

    await expect.element(scrubber()).toBeEmptyDOMElement();

    await startScrubbing(scrubberElement());
    await movePointer(3);

    await expect.element(field()).toHaveValue('3');
  });

  it('scrubs each field independently inside a multi value field', async () => {
    await render(<TestMultiField />);

    await startScrubbing(page.getByTestId('scrubber-r').element() as HTMLElement);
    await movePointer(4);
    await stopScrubbing();
    await expect.element(page.getByRole('textbox', { name: 'r' })).toHaveValue('4');
    await expect.element(page.getByRole('textbox', { name: 'g' })).toHaveValue('0');
    await expect.element(page.getByRole('textbox', { name: 'b' })).toHaveValue('0');
    await expect.element(page.getByRole('textbox', { name: 'a' })).toHaveValue('0%');

    await startScrubbing(page.getByTestId('scrubber-g').element() as HTMLElement);
    await movePointer(8);
    await stopScrubbing();
    await expect.element(page.getByRole('textbox', { name: 'r' })).toHaveValue('4');
    await expect.element(page.getByRole('textbox', { name: 'g' })).toHaveValue('8');
    await expect.element(page.getByRole('textbox', { name: 'b' })).toHaveValue('0');
    await expect.element(page.getByRole('textbox', { name: 'a' })).toHaveValue('0%');

    await startScrubbing(page.getByTestId('scrubber-b').element() as HTMLElement);
    await movePointer(12);
    await stopScrubbing();
    await expect.element(page.getByRole('textbox', { name: 'r' })).toHaveValue('4');
    await expect.element(page.getByRole('textbox', { name: 'g' })).toHaveValue('8');
    await expect.element(page.getByRole('textbox', { name: 'b' })).toHaveValue('12');
    await expect.element(page.getByRole('textbox', { name: 'a' })).toHaveValue('0%');

    await startScrubbing(page.getByTestId('scrubber-a').element() as HTMLElement);
    await movePointer(16);
    await stopScrubbing();
    await expect.element(page.getByRole('textbox', { name: 'r' })).toHaveValue('4');
    await expect.element(page.getByRole('textbox', { name: 'g' })).toHaveValue('8');
    await expect.element(page.getByRole('textbox', { name: 'b' })).toHaveValue('12');
    await expect.element(page.getByRole('textbox', { name: 'a' })).toHaveValue('16%');
  });

  it('does not scrub a disabled field', async () => {
    await render(
      <TestField
        initialValue={0}
        rootDisabled
      />,
    );

    await startScrubbing(scrubberElement());
    await movePointer(10);

    await expect.element(field()).toHaveValue('0');
  });

  it('does not scrub a disabled numeric input', async () => {
    await render(
      <TestField
        initialValue={0}
        disabled
      />,
    );

    await startScrubbing(scrubberElement());
    await movePointer(10);

    await expect.element(field()).toHaveValue('0');
  });

  it('keeps child clicks working when the pointer does not move', async () => {
    const onClick = vi.fn();
    await render(
      <TestField
        initialValue={0}
        scrubberChildren={<button onClick={onClick}>X</button>}
      />,
    );

    await startScrubbing(page.getByText('X').element() as HTMLElement);
    await stopScrubbing();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('sets scrubbing attributes only while dragging', async () => {
    await render(<TestField initialValue={0} />);
    const scrubberEl = scrubberElement();
    const root = scrubberEl.parentElement;

    if (!(root instanceof HTMLElement)) {
      throw new Error('Scrubber has no parent element');
    }

    expect(root).not.toHaveAttribute('data-scrubbing');
    expect(scrubberEl).not.toHaveAttribute('data-scrubbing');

    await startScrubbing(scrubberEl);
    await expect.poll(() => root.hasAttribute('data-scrubbing')).toBe(true);
    await expect.poll(() => scrubberEl.hasAttribute('data-scrubbing')).toBe(true);

    await stopScrubbing();
    await expect.poll(() => root.hasAttribute('data-scrubbing')).toBe(false);
    await expect.poll(() => scrubberEl.hasAttribute('data-scrubbing')).toBe(false);
  });

  it('stops scrubbing after pointerup', async () => {
    await render(<TestField initialValue={0} />);

    await startScrubbing(scrubberElement());
    await movePointer(4);
    await expect.element(field()).toHaveValue('4');

    await stopScrubbing();
    await movePointer(4);
    await expect.element(field()).toHaveValue('4');
  });

  it('wraps the internal cursor around the viewport edge', async () => {
    const restorePointerLock = mockPointerLock();
    await render(
      <TestField
        initialValue={0}
        scrubberProps={{ teleportDistance: 0 }}
        scrubberChildren={null}
      />,
    );
    const scrubberEl = scrubberElement();
    Object.defineProperty(scrubberEl, 'getBoundingClientRect', {
      configurable: true,
      value: () => new DOMRect(0, 0, 100, 24),
    });

    await startScrubbing(scrubberEl, { clientX: 95, clientY: 12 });
    const cursor = document.querySelector('[data-value-field-cursor]');

    if (!(cursor instanceof HTMLElement)) {
      throw new Error('Cursor element not found');
    }

    Object.defineProperty(cursor, 'offsetWidth', { configurable: true, value: 10 });
    Object.defineProperty(cursor, 'offsetHeight', { configurable: true, value: 10 });
    await movePointer(20);
    await expect.poll(() => cursor.style.transform).toBe('translate3d(-5px, 5px, 0px)');

    await stopScrubbing();
    restorePointerLock();
  });
});

function TestField(props: TestFieldProps) {
  const { initialValue, onChange, rootDisabled, scrubberChildren, scrubberProps, ...numericProps } =
    props;
  const [value, setValue] = useState(initialValue);

  function handleChange(nextValue: number) {
    onChange?.(nextValue);
    setValue(nextValue);
  }

  return (
    <ValueField.Root
      disabled={rootDisabled}
      style={{ width: 100 }}
    >
      <ValueField.Scrubber
        data-testid={SCRUBBER_TEST_ID}
        {...scrubberProps}
      >
        {scrubberChildren === undefined ? <ValueField.Label>X</ValueField.Label> : scrubberChildren}
      </ValueField.Scrubber>
      <ValueField.Numeric
        aria-label={FIELD_LABEL}
        value={value}
        onChange={handleChange}
        {...numericProps}
      />
    </ValueField.Root>
  );
}

function TestMultiField() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [alpha, setAlpha] = useState(0);

  return (
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Scrubber data-testid="scrubber-r" />
        <ValueField.Numeric
          aria-label="r"
          value={red}
          onChange={setRed}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Scrubber data-testid="scrubber-g" />
        <ValueField.Numeric
          aria-label="g"
          value={green}
          onChange={setGreen}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Scrubber data-testid="scrubber-b" />
        <ValueField.Numeric
          aria-label="b"
          value={blue}
          onChange={setBlue}
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Scrubber data-testid="scrubber-a" />
        <ValueField.Numeric
          aria-label="a"
          value={alpha}
          onChange={setAlpha}
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={0}
          suffix="%"
        />
      </ValueField.Root>
    </ValueField.Multi>
  );
}

async function startScrubbing(element: HTMLElement, init: TestPointerEventInit = {}) {
  element.dispatchEvent(
    createPointerEvent('pointerdown', {
      clientX: 10,
      clientY: 10,
      pointerType: 'mouse',
      ...init,
    }),
  );
}

async function movePointer(movementX: number, init: TestPointerEventInit = {}) {
  window.dispatchEvent(
    createPointerEvent('pointermove', {
      movementX,
      pointerType: 'mouse',
      ...init,
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
    shiftKey: init.shiftKey ?? false,
  });

  Object.defineProperties(event, {
    movementX: { value: init.movementX ?? 0 },
    movementY: { value: init.movementY ?? 0 },
    pointerType: { value: init.pointerType ?? 'mouse' },
  });

  return event;
}

function mockPointerLock() {
  const requestPointerLockDescriptor = Object.getOwnPropertyDescriptor(
    document.body,
    'requestPointerLock',
  );
  const exitPointerLockDescriptor = Object.getOwnPropertyDescriptor(document, 'exitPointerLock');

  Object.defineProperty(document.body, 'requestPointerLock', {
    configurable: true,
    value: () => Promise.resolve(),
  });
  Object.defineProperty(document, 'exitPointerLock', {
    configurable: true,
    value: () => undefined,
  });

  return () => {
    restoreProperty(document.body, 'requestPointerLock', requestPointerLockDescriptor);
    restoreProperty(document, 'exitPointerLock', exitPointerLockDescriptor);
  };
}

function restoreProperty(target: object, key: string, descriptor: PropertyDescriptor | undefined) {
  if (descriptor) {
    Object.defineProperty(target, key, descriptor);
    return;
  }

  Reflect.deleteProperty(target, key);
}
