import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import type { Formatter } from '~/components/value-field/types';
import { Base } from '~/components/value-field/value-field-base';

const LABEL = 'test-field';
const INITIAL_VALUE = 30;

const formatter: Formatter<number> = {
  parse: (input: string) => {
    if (input.length > 0 && !isNaN(Number(input))) {
      return { valid: true, value: Number(input) };
    }

    return { valid: false };
  },
  format: (value: number) => `${value}`,
};

function field() {
  return page.getByRole('textbox', { name: LABEL });
}

describe('given a basic field', () => {
  const VALID_VALUE = '40';
  const INVALID_VALUE = 'dogs';

  function TestControl({ onChange }: { onChange?: (value: number) => void }) {
    const [value, setValue] = useState(INITIAL_VALUE);

    function handleChange(value: number) {
      onChange?.(value);
      setValue(value);
    }

    return (
      <Base
        aria-label={LABEL}
        value={value}
        onChange={handleChange}
        formatter={formatter}
      />
    );
  }

  it('formats correctly', async () => {
    await render(<TestControl />);
    await expect.element(field()).toHaveValue(formatter.format(INITIAL_VALUE));
  });

  it('saves on blur', async () => {
    await render(<TestControl />);
    await userEvent.click(field());
    await userEvent.keyboard(VALID_VALUE);
    await userEvent.keyboard('{Tab}');
    await expect.element(field()).not.toHaveFocus();
    await expect.element(field()).toHaveValue(VALID_VALUE);
  });

  it('reverts invalid values', async () => {
    await render(<TestControl />);
    await userEvent.click(field());
    await userEvent.keyboard(INVALID_VALUE);
    await userEvent.keyboard('{Tab}');
    await expect.element(field()).not.toHaveFocus();
    await expect.element(field()).toHaveValue(formatter.format(INITIAL_VALUE));
  });

  it('saves on Enter', async () => {
    await render(<TestControl />);
    await userEvent.click(field());
    await userEvent.keyboard(VALID_VALUE);
    await userEvent.keyboard('{Enter}');
    await expect.element(field()).not.toHaveFocus();
    await expect.element(field()).toHaveValue(VALID_VALUE);
  });

  it('reverts on Escape', async () => {
    await render(<TestControl />);
    await userEvent.click(field());
    await userEvent.keyboard(VALID_VALUE);
    await expect.element(field()).toHaveValue(VALID_VALUE);
    await userEvent.keyboard('{Escape}');
    await expect.element(field()).not.toHaveFocus();
    await expect.element(field()).toHaveValue(formatter.format(INITIAL_VALUE));
  });

  it("doesn't fire onChange when submitted value is the same", async () => {
    const changeHandler = vi.fn();
    await render(<TestControl onChange={changeHandler} />);
    await userEvent.click(field());
    await userEvent.keyboard(`${INITIAL_VALUE}`);
    await userEvent.keyboard('{Enter}');
    expect(changeHandler).not.toBeCalled();
  });
});
