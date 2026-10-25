import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { ActionIcon } from './action-icon';

describe('ActionIcon', () => {
  it('renders a button with an accessible name', async () => {
    await render(<ActionIcon aria-label="Settings" />);

    await expect.element(page.getByRole('button', { name: 'Settings' })).toBeVisible();
  });

  it('fires onClick when clicked', async () => {
    const onClick = vi.fn<() => void>();
    await render(
      <ActionIcon
        aria-label="Settings"
        onClick={onClick}
      />,
    );

    await userEvent.click(page.getByRole('button', { name: 'Settings' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn<() => void>();
    await render(
      <ActionIcon
        aria-label="Settings"
        disabled
        onClick={onClick}
      />,
    );

    await expect.element(page.getByRole('button', { name: 'Settings' })).toBeDisabled();

    expect(onClick).not.toHaveBeenCalled();
  });
});
