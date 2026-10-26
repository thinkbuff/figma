import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { Button } from '~/components/button/button';

describe('Button', () => {
  it('renders a button with an accessible name', async () => {
    await render(<Button>Click me</Button>);

    await expect.element(page.getByRole('button', { name: 'Click me' })).toBeVisible();
  });

  it('fires onClick when clicked', async () => {
    const onClick = vi.fn<() => void>();
    await render(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(page.getByRole('button', { name: 'Click me' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn<() => void>();
    await render(
      <Button
        disabled
        onClick={onClick}
      >
        Click me
      </Button>,
    );

    const button = page.getByRole('button', { name: 'Click me' });
    await expect.element(button).toBeDisabled();

    expect(onClick).not.toHaveBeenCalled();
  });
});
