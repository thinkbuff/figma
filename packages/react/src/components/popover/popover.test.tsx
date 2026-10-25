import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page, userEvent } from 'vitest/browser';

import { clickOutside } from '~/test-utils';

import { Button } from '../button';
import * as Popover from './popover';

function Fixture() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Open popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <div>Popover content</div>
      </Popover.Content>
    </Popover.Root>
  );
}

describe('Popover', () => {
  it('opens content on trigger click', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('button', { name: 'Open popover' });
    await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);

    await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect.element(page.getByText('Popover content')).toBeVisible();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('button', { name: 'Open popover' });
    await userEvent.click(trigger);
    await expect.element(page.getByText('Popover content')).toBeVisible();

    await userEvent.keyboard('{Escape}');

    await expect.element(page.getByText('Popover content')).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it('closes on an outside click', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Open popover' }));
    await expect.element(page.getByText('Popover content')).toBeVisible();

    await clickOutside();

    await expect.element(page.getByText('Popover content')).not.toBeInTheDocument();
  });
});
