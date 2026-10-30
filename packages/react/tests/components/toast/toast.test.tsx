import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';

import { toast } from '~/components/toast/toast';
import { Toaster } from '~/components/toast/toaster';

describe('Toast', () => {
  it('renders a toast message in the Toaster', async () => {
    await render(<Toaster />);

    toast('Event has been created');

    await expect.element(page.getByText('Event has been created')).toBeVisible();
  });

  it('renders variant toasts', async () => {
    await render(<Toaster />);

    toast.success('Saved successfully');
    toast.warning('Something needs attention');
    toast.error('Something went wrong');

    await expect.element(page.getByText('Saved successfully')).toBeVisible();
    await expect.element(page.getByText('Something needs attention')).toBeVisible();
    await expect.element(page.getByText('Something went wrong')).toBeVisible();
  });

  it('dismisses a toast', async () => {
    await render(<Toaster />);

    const id = toast('Temporary message');
    await expect.element(page.getByText('Temporary message')).toBeVisible();

    toast.dismiss(id);
    await expect.element(page.getByText('Temporary message')).not.toBeInTheDocument();
  });

  it('renders the action/dismiss rail', async () => {
    await render(<Toaster />);

    const onAction = vi.fn();
    const onCancel = vi.fn();
    toast('Short descriptive message', {
      duration: 60_000,
      action: { label: 'Action', onClick: onAction },
      cancel: { label: 'Dismiss', onClick: onCancel },
    });

    const action = page.getByRole('button', { name: 'Action' });
    const dismiss = page.getByRole('button', { name: 'Dismiss' });
    await expect.element(action).toBeVisible();
    await expect.element(dismiss).toBeVisible();
    // rail cells: action in the top cell, dismiss in the bottom cell
    await expect.element(action).toHaveAttribute('data-action');
    await expect.element(dismiss).toHaveAttribute('data-cancel');

    await action.click();
    expect(onAction).toHaveBeenCalled();
    // action click dismisses the toast
    await expect.element(page.getByText('Short descriptive message')).not.toBeInTheDocument();
  });
});
