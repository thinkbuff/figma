import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it, vi } from 'vitest';

import { firstArg } from '~/test-utils';

import { Button } from '../button';

import { Dialog } from './index';

function Fixture({ open, onOpenChange }: { open?: boolean; onOpenChange?: (open: boolean) => void }) {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Trigger asChild>
        <Button variant="outline">Edit profile</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Close asChild>
            <Button variant="outline">Close</Button>
          </Dialog.Close>
        </Dialog.Header>
        <Dialog.Description>Make changes to your profile here.</Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
}

describe('Dialog', () => {
  it('opens a dialog with an accessible name and description', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Edit profile' }));

    const dialog = page.getByRole('dialog', { name: 'Edit profile' });
    await expect.element(dialog).toBeVisible();
    await expect.element(dialog).toContainElement(
      page.getByText('Make changes to your profile here.').element() as HTMLElement,
    );
  });

  it('moves focus inside the dialog on open', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Edit profile' }));
    await expect.element(page.getByRole('dialog')).toBeVisible();

    const dialog = page.getByRole('dialog').element() as HTMLElement;
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it('closes on Escape', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Edit profile' }));
    await expect.element(page.getByRole('dialog')).toBeVisible();

    await userEvent.keyboard('{Escape}');
    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes via the close button and returns focus to the trigger', async () => {
    await render(<Fixture />);

    const trigger = page.getByRole('button', { name: 'Edit profile' });
    await userEvent.click(trigger);
    await userEvent.click(page.getByRole('button', { name: 'Close' }));

    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it('supports controlled open with onOpenChange', async () => {
    const onOpenChange = vi.fn();
    const screen = await render(<Fixture onOpenChange={onOpenChange} open={false} />);

    await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();

    await screen.rerender(<Fixture onOpenChange={onOpenChange} open />);
    await expect.element(page.getByRole('dialog', { name: 'Edit profile' })).toBeVisible();

    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalled();
    expect(firstArg(onOpenChange)).toBe(false);
  });
});
