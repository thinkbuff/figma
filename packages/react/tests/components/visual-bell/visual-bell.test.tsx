import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { VisualBell } from '~/components/visual-bell';

describe('VisualBell', () => {
  it('renders label, actions, and a dismiss button', async () => {
    const onDismiss = vi.fn();
    await render(
      <VisualBell.Root>
        <VisualBell.Label>Waiting for followers</VisualBell.Label>
        <VisualBell.Actions>
          <VisualBell.Action>Cancel</VisualBell.Action>
        </VisualBell.Actions>
        <VisualBell.Dismiss onClick={onDismiss} />
      </VisualBell.Root>,
    );

    await expect.element(page.getByText('Waiting for followers')).toBeVisible();
    await expect.element(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    const dismiss = page.getByRole('button', { name: 'Dismiss' });
    await expect.element(dismiss).toBeVisible();

    await userEvent.click(dismiss);
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('renders a leading icon in the label', async () => {
    const { container } = await render(
      <VisualBell.Root>
        <VisualBell.Label icon={<span data-testid="bell-icon" />}>
          Spotlight on Tim
        </VisualBell.Label>
      </VisualBell.Root>,
    );
    expect(container.querySelector('[data-testid="bell-icon"]')).not.toBeNull();
  });

  it('applies the danger color', async () => {
    const { container } = await render(
      <VisualBell.Root color="danger">
        <VisualBell.Label>Danger</VisualBell.Label>
      </VisualBell.Root>,
    );
    const bell = container.querySelector('[role="status"]') as HTMLElement;
    expect(bell.className).toContain('bg-figma-danger');
  });
});
