import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { describe, expect, it } from 'vitest';

import { clickOutside } from '~/test-utils';

import { Button } from '../button';

import { AlertDialog } from './index';

function Fixture() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="outline">Delete account</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        </AlertDialog.Header>
        <AlertDialog.Description>
          This action cannot be undone.
        </AlertDialog.Description>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button>Yes, delete account</Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

describe('AlertDialog', () => {
  it('opens an alertdialog with an accessible name', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Delete account' }));

    await expect.element(page.getByRole('alertdialog', { name: 'Are you absolutely sure?' }))
      .toBeVisible();
  });

  it('closes on Cancel', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Delete account' }));
    await userEvent.click(page.getByRole('button', { name: 'Cancel' }));

    await expect.element(page.getByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('closes on Action', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Delete account' }));
    await userEvent.click(page.getByRole('button', { name: 'Yes, delete account' }));

    await expect.element(page.getByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('does not close on an outside click', async () => {
    await render(<Fixture />);

    await userEvent.click(page.getByRole('button', { name: 'Delete account' }));
    await expect.element(page.getByRole('alertdialog')).toBeVisible();

    await clickOutside();

    await expect.element(page.getByRole('alertdialog')).toBeVisible();
  });
});
