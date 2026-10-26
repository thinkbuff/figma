import { describe, expect, it } from 'vitest';
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
});
