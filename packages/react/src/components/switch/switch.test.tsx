import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';

import { firstArg } from '~/test-utils';

import { Switch } from './switch';

describe('Switch', () => {
  it('toggles aria-checked on click', async () => {
    await render(<Switch aria-label="Notifications" />);

    const toggle = page.getByRole('switch', { name: 'Notifications' });
    await expect.element(toggle).toHaveAttribute('aria-checked', 'false');

    await userEvent.click(toggle);
    await expect.element(toggle).toHaveAttribute('aria-checked', 'true');

    await userEvent.click(toggle);
    await expect.element(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles with Space key', async () => {
    await render(<Switch aria-label="Notifications" />);

    const toggle = page.getByRole('switch', { name: 'Notifications' });
    (toggle.element() as HTMLElement).focus();

    await userEvent.keyboard('{ }');
    await expect.element(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('does not toggle when disabled', async () => {
    const onCheckedChange = vi.fn();
    await render(<Switch aria-label="Notifications" disabled onCheckedChange={onCheckedChange} />);

    await expect.element(page.getByRole('switch', { name: 'Notifications' })).toBeDisabled();

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('calls onCheckedChange with the new state', async () => {
    const onCheckedChange = vi.fn();
    await render(<Switch aria-label="Notifications" onCheckedChange={onCheckedChange} />);

    await userEvent.click(page.getByRole('switch', { name: 'Notifications' }));

    expect(onCheckedChange).toHaveBeenCalledOnce();
    expect(firstArg(onCheckedChange)).toBe(true);
  });
});
