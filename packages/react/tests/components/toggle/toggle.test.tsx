import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Toggle } from '~/components/toggle/toggle';

import { firstArg } from '../../test-utils';

describe('Toggle', () => {
  it('toggles aria-pressed on click', async () => {
    await render(<Toggle aria-label="Bold" />);

    const toggle = page.getByRole('button', { name: 'Bold' });
    await expect.element(toggle).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(toggle);
    await expect.element(toggle).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(toggle);
    await expect.element(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onPressedChange with the new state', async () => {
    const onPressedChange = vi.fn<() => void>();
    await render(
      <Toggle
        aria-label="Bold"
        onPressedChange={onPressedChange}
      />,
    );

    await userEvent.click(page.getByRole('button', { name: 'Bold' }));

    expect(onPressedChange).toHaveBeenCalledOnce();
    expect(firstArg(onPressedChange)).toBe(true);
  });

  it('does not toggle when disabled', async () => {
    const onPressedChange = vi.fn<() => void>();
    await render(
      <Toggle
        aria-label="Bold"
        disabled
        onPressedChange={onPressedChange}
      />,
    );

    const toggle = page.getByRole('button', { name: 'Bold' });
    await expect.element(toggle).toBeDisabled();

    expect(onPressedChange).not.toHaveBeenCalled();
  });
});
