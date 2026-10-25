import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Input, InputSlot } from './input';

describe('Input', () => {
  it('renders a textbox', async () => {
    await render(<Input aria-label="Name" />);

    await expect.element(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
  });

  it('updates value and calls onChange when typing', async () => {
    const onChange = vi.fn<() => void>();
    await render(
      <Input
        aria-label="Name"
        onChange={onChange}
      />,
    );

    const input = page.getByRole('textbox', { name: 'Name' });
    await userEvent.fill(input, 'hello');

    await expect.element(input).toHaveValue('hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('is disabled', async () => {
    await render(
      <Input
        aria-label="Name"
        disabled
      />,
    );

    await expect.element(page.getByRole('textbox', { name: 'Name' })).toBeDisabled();
  });

  it('is marked invalid', async () => {
    await render(
      <Input
        aria-label="Name"
        invalid
      />,
    );

    await expect
      .element(page.getByRole('textbox', { name: 'Name' }))
      .toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref to the input element', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(<Input ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('focuses the input when the wrapper is clicked', async () => {
    const ref = createRef<HTMLInputElement>();
    await render(
      <Input
        ref={ref}
        aria-label="Name"
      >
        <InputSlot>
          <span>icon</span>
        </InputSlot>
      </Input>,
    );

    await userEvent.click(page.getByText('icon'));

    await expect.element(page.getByRole('textbox', { name: 'Name' })).toHaveFocus();
  });
});
